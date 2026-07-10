param(
    [int]$Port = 8000,
    [string]$Directory = $PSScriptRoot
)

function Get-FreePort {
    param([int]$StartPort)

    for ($candidate = $StartPort; $candidate -lt ($StartPort + 50); $candidate++) {
        $tcpListener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $candidate)
        try {
            $tcpListener.Start()
            $tcpListener.Stop()
            return $candidate
        }
        catch {
            continue
        }
        finally {
            if ($tcpListener) {
                $tcpListener.Stop()
            }
        }
    }

    throw "No free port found in the requested range."
}

$resolvedDirectory = (Resolve-Path $Directory).Path
$selectedPort = Get-FreePort -StartPort $Port
$listener = [System.Net.HttpListener]::new()
$prefix = "http://127.0.0.1:$selectedPort/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $resolvedDirectory at $prefix"
Write-Host "Open this URL in your browser."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestedPath = $context.Request.Url.AbsolutePath
        if ($requestedPath -eq '/') {
            $requestedPath = '/index.html'
        }

        $relativePath = if ($requestedPath -eq '/Our-Story' -or $requestedPath -eq '/Our-Story/') {
            'index.html'
        }
        elseif ($requestedPath.StartsWith('/Our-Story/')) {
            $requestedPath.Substring('/Our-Story/'.Length)
        }
        else {
            $requestedPath.TrimStart('/')
        }
        $fullPath = [System.IO.Path]::GetFullPath((Join-Path $resolvedDirectory $relativePath))
        $rootPath = [System.IO.Path]::GetFullPath($resolvedDirectory)

        if ($fullPath -eq $rootPath) {
            $fullPath = [System.IO.Path]::GetFullPath((Join-Path $resolvedDirectory 'index.html'))
        }
        elseif ((Test-Path $fullPath -PathType Container) -and (Test-Path (Join-Path $fullPath 'index.html') -PathType Leaf)) {
            $fullPath = [System.IO.Path]::GetFullPath((Join-Path $fullPath 'index.html'))
        }

        if (-not $fullPath.StartsWith($rootPath, [System.StringComparison]::OrdinalIgnoreCase)) {
            $context.Response.StatusCode = 403
            $context.Response.Close()
            continue
        }

        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $extension = [System.IO.Path]::GetExtension($fullPath)
            $mimeType = switch ($extension) {
                '.html' { 'text/html; charset=utf-8' }
                '.css' { 'text/css; charset=utf-8' }
                '.js' { 'application/javascript; charset=utf-8' }
                '.json' { 'application/json; charset=utf-8' }
                '.svg' { 'image/svg+xml' }
                '.png' { 'image/png' }
                '.jpg' { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.gif' { 'image/gif' }
                '.wav' { 'audio/wav' }
                default { 'application/octet-stream' }
            }
            $context.Response.ContentType = $mimeType
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $context.Response.OutputStream.Close()
        }
        else {
            $context.Response.StatusCode = 404
            $context.Response.Close()
        }
    }
}
finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
