export function initLetter(envelope, letterText, message) {
  if (!envelope || !letterText) return;

  letterText.textContent = message;

  const toggleEnvelope = () => {
    envelope.classList.toggle('is-open');
  };

  envelope.addEventListener('click', toggleEnvelope);
  envelope.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEnvelope();
    }
  });
}
