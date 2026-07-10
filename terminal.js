export function initTerminal(outputElement, formElement, inputElement) {
  if (!outputElement || !formElement || !inputElement) return;

  const commands = {
    help: 'Commands: help, love, wife, future, whoami, clear',
    love: 'Love is the quiet miracle that keeps choosing you every day.',
    wife: 'Ritu, my favorite person, my forever, my sweetest home.',
    future: 'The future is a hallway of beautiful mornings waiting for us.',
    whoami: 'You are the one who keeps asking the heart the most beautiful questions.'
  };

  const appendLine = (text) => {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    outputElement.appendChild(line);
    outputElement.scrollTop = outputElement.scrollHeight;
  };

  appendLine('C:\\LOVE> Welcome to your love terminal. Type help to begin.');

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = inputElement.value.trim().toLowerCase();
    appendLine(`C:\\LOVE> ${value || '...'}`);
    if (!value) {
      appendLine('C:\\LOVE> Please whisper something sweet.');
    } else if (value === 'clear') {
      outputElement.innerHTML = '';
      appendLine('C:\\LOVE> Console cleared.');
    } else if (commands[value]) {
      appendLine(commands[value]);
    } else {
      appendLine('C:\\LOVE> That command has not been written into this love story yet.');
    }
    inputElement.value = '';
  });
}
