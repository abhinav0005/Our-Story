# Our Story

A romantic, interactive anniversary experience built for Abhinav and Ritu.

## Installation

1. Open the project folder in a browser, or run a local server from the project root.
2. If you use Python, run:
   - `python -m http.server 8000`
3. Open http://localhost:8000 in your browser.

## Folder structure

- index.html
- css/ — global styles, animations, and responsive behavior
- js/ — app shell, config, memories, timeline, gallery, music, letter, terminal, and confetti
- assets/images — placeholder memory visuals
- assets/music — audio for the floating player

## How to replace photos

Update the image paths in [js/memories.js](js/memories.js) to point to your own files.

## How to change names

Edit the values in [js/config.js](js/config.js) to change the names, engagement date, password, letter message, and other content.

## How to change music

Replace the audio file in [assets/music/love-story.wav](assets/music/love-story.wav) or update the audio path in [js/config.js](js/config.js).

## Deploy on GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository settings.
3. Enable Pages and choose the root folder.
4. Your site will be published at the GitHub Pages URL.

## Deploy on Vercel

1. Import the repository into Vercel.
2. Use the project root as the root directory.
3. Deploy and Vercel will publish the app automatically.