export function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  if (document.getElementById('confetti-canvas')) {
    return;
  }
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20,
    size: Math.random() * 6 + 3,
    color: ['#ff4d6d', '#ffd3dc', '#7df1c2', '#ffffff'][Math.floor(Math.random() * 4)],
    speed: Math.random() * 3 + 1.5,
    drift: (Math.random() - 0.5) * 0.8,
    rotation: Math.random() * 360
  }));

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.rotation += 4;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      ctx.restore();
      if (piece.y > window.innerHeight + 20) {
        piece.y = -20;
        piece.x = Math.random() * window.innerWidth;
      }
    });
    requestAnimationFrame(render);
  };

  render();
}
