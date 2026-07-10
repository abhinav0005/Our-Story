export function initMusic(playerElement, playButton, muteButton, audioSrc) {
  if (!playerElement || !playButton || !muteButton) return null;

  const audio = new Audio(audioSrc);
  audio.loop = true;
  audio.preload = 'auto';

  let isPlaying = false;
  let isMuted = false;

  const updateButtons = () => {
    playButton.textContent = isPlaying ? '❚❚' : '▶';
    muteButton.textContent = isMuted ? '🔈' : '🔊';
  };

  playButton.addEventListener('click', async () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      try {
        await audio.play();
        isPlaying = true;
      } catch (error) {
        isPlaying = false;
      }
    }
    updateButtons();
  });

  muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    isMuted = audio.muted;
    updateButtons();
  });

  updateButtons();
  return { audio, playerElement };
}
