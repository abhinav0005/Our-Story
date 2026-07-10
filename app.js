const CONFIG = {
  yourName: 'Abhinav',
  partnerName: 'Ritu',
  engagementDate: '2024-07-11',
  password: 'Ritu',
  music: 'assets/music/Tum Ho Toh.mp3',
  letterMessage:
    'My dearest Ritu, every ordinary day with you feels like a soft melody I never want to stop hearing. Thank you for being the calm in my chaos, the laughter in my silence, and the home in my heart. I love you now, always, and forever.',
  promises: [
    'I will keep making room for your dreams.',
    'I will love you in both the easy and the hard days.',
    'I will protect the peace we built together.',
    'I will love you like it is the first day and the last day at once.'
  ],
  reasons: [
    'Your laugh can make an ordinary room feel warm.',
    'Your heart is generous even when the world is hard.',
    'You make home feel like a feeling instead of a place.',
    'Your calm steadies my stormy thoughts.',
    'You are the gentleness I never knew I needed.',
    'Your love makes me brave in quiet ways.',
    'You turn tiny moments into treasured memories.',
    'You make my life softer, brighter, and kinder.',
    'You are my favorite person to grow with.',
    'I love the way you make forever feel close.'
  ],
  history: [
    'commit: First Chat',
    'commit: First Date',
    'commit: Engagement',
    'commit: Today'
  ]
};       

const memories = [
  {
    title: 'First Chat',
    date: '2024-05-14',
    image: 'assets/images/1stChat.jpg',
    caption: 'Hi and Hlw'
  },
  {
    title: 'First Date',
    date: '2024-05-25',
    image: 'assets/images/firstdate.jpeg',
    caption: 'The kind of evening that turns into a memory you carry forever.'
  },
  {
    title: 'Engagement - Moment 1',
    date: '2024-07-11',
    image:'assets/images/1.JPG',
    caption: 'Our special moment begins...'
  },
  {
    title: 'Engagement - Moment 2',
    date: '2024-07-11',
    image:'assets/images/2.JPG',
    caption: 'And continues with joy...Forever in our hearts.'
  },
  {
    title: 'Engagement - Moment 3',
    date: '2024-07-11',
    image:'assets/images/3.JPG',
    caption: 'Forever in our hearts...'
  },
  {
    title: 'Engagement - Moment 4',
    date: '2024-07-11',
    image:'assets/images/4.JPG',
    caption: 'A promise made under soft light and a sky that looked like it knew.'
  },
  {
    title: 'Everyday Magic With You ❤️',
    date: '',
    images: [
    'assets/images/5.JPG',
    'assets/images/6.JPG'
  ],
    caption: 'From Delhi’s hustle to Kashmir’s hush… with you, every view feels like home 💕.'
  },
  {
    title: 'Seeking Mahadev’s Blessings Together 🕉️',
    date: '',
    images: [
    'assets/images/8.jpg',
    'assets/images/9.jpg',
    'assets/images/10.jpg'
  ],
    caption: 'Taking blessings from Mahadev, promising to walk hand in hand through every season of life.'
  },
  {
    title: 'Thank You for Loving Me Through It All❤️',
    date: '2026-07-11',
    images: [
    'assets/images/11.jpg',
    'assets/images/12.JPG',
    'assets/images/13.JPG'
  ],
    caption: 'To the one who keeps accepting me, adjusting with me, and lovingly tolerating all my quirks — Thank You for being my forever. HAPPY ANNIVERSARY.🥂'
  }
];

const loadingScreen = document.getElementById('loading-screen');
const appShell = document.getElementById('app-shell');
const heroTitle = document.getElementById('hero-title');
const beginJourneyButton = document.getElementById('begin-journey');
const authSection = document.getElementById('auth-section');
const authForm = document.getElementById('auth-form');
const authInput = document.getElementById('auth-input');
const authMessage = document.getElementById('auth-message');
const storyContent = document.getElementById('story-content');
const timeline = document.getElementById('timeline');
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const envelope = document.getElementById('envelope');
const letterText = document.getElementById('letter-text');
const promiseWall = document.getElementById('promise-wall');
const reasonsGrid = document.getElementById('reasons-grid');
const terminalOutput = document.getElementById('terminal-output');
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const finalScreen = document.getElementById('final-screen');
const finalTrigger = document.getElementById('final-trigger');
const playToggle = document.getElementById('play-toggle');
const muteToggle = document.getElementById('mute-toggle');
const musicPlayer = document.getElementById('music-player');
const daysCount = document.getElementById('days-count');
const monthsCount = document.getElementById('months-count');
const yearsCount = document.getElementById('years-count');

function initCounter() {
  const startDate = new Date(CONFIG.engagementDate);
  const today = new Date();
  const diffMs = today - startDate;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const animateValue = (element, target) => {
    let current = 0;
    const step = () => {
      current += Math.max(1, Math.round(target / 20));
      if (current >= target) {
        element.textContent = target;
        return;
      }
      element.textContent = current;
      requestAnimationFrame(step);
    };
    step();
  };

  animateValue(daysCount, days);
  animateValue(monthsCount, months);
  animateValue(yearsCount, years);
}

function renderPromises() {
  promiseWall.innerHTML = CONFIG.promises
    .map((promise) => `<article class="promise-card"><h3>Promise</h3><p>${promise}</p></article>`)
    .join('');
}

function renderPhotoWall() {
  const photoWall = document.getElementById('photo-wall');
  photoWall.innerHTML = memories
    .map(
      (memory, index) => {
        const imageArray = Array.isArray(memory.images) ? memory.images : (memory.images ? [memory.images] : (memory.image ? [memory.image] : []));
        const imagesHtml = imageArray.map(img => `<img src="${img}" alt="${memory.title}" loading="lazy" />`).join('');
        return `
          <article class="photo-card" style="--rotation:${index % 2 === 0 ? '-3deg' : '3deg'};">
            ${imagesHtml}
            <h3>${memory.title}</h3>
            <p>${memory.caption}</p>
          </article>
        `;
      }
    )
    .join('');
}

function renderReasons() {
  reasonsGrid.innerHTML = CONFIG.reasons
    .map(
      (reason, index) => `
        <article class="reason-card">
          <div class="reason-face"><h3>${index + 1}</h3></div>
          <div class="reason-face reason-back"><p>${reason}</p></div>
        </article>
      `
    )
    .join('');
}

function renderHistory() {
  historyList.innerHTML = CONFIG.history
    .map((entry) => `<div class="history-item">${entry}</div>`)
    .join('');
}

function animateProgressBars() {
  document.querySelectorAll('.progress-bar span').forEach((bar) => {
    const width = bar.dataset.width || '100';
    requestAnimationFrame(() => {
      bar.style.width = `${width}%`;
    });
  });
}

function typeHeroTitle() {
  const text = `${CONFIG.yourName} ♥ ${CONFIG.partnerName}`;
  let index = 0;
  heroTitle.textContent = '';
  const interval = setInterval(() => {
    heroTitle.textContent += text[index];
    index += 1;
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 70);
}

function initGallery() {
  const items = memories.flatMap((memory, index) => {
    const imageArray = Array.isArray(memory.images) ? memory.images : (memory.images ? [memory.images] : (memory.image ? [memory.image] : []));
    return imageArray.map((src, imgIndex) => ({
      src,
      alt: memory.title,
      memoryIndex: index,
      imgIndex
    }));
  });

  gallery.innerHTML = items
    .map(
      (item) => `
        <figure class="gallery-item" data-index="${item.memoryIndex}-${item.imgIndex}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        </figure>
      `
    )
    .join('');

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImage.src = items[currentIndex].src;
    lightboxImage.alt = items[currentIndex].alt;
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    openLightbox(nextIndex);
  };

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(prevIndex);
  };

  gallery.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.classList.contains('hidden')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });
}

function initLetter() {
  letterText.textContent = CONFIG.letterMessage;
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('is-open');
  });
  envelope.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      envelope.classList.toggle('is-open');
    }
  });
}

function initMusic() {
  const audio = new Audio(CONFIG.music);
  audio.loop = true;
  audio.preload = 'auto';
  let isPlaying = false;
  let isMuted = false;

  const updateButtons = () => {
    playToggle.textContent = isPlaying ? '❚❚' : '▶';
    muteToggle.textContent = isMuted ? '🔈' : '🔊';
  };

  playToggle.addEventListener('click', async () => {
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

  muteToggle.addEventListener('click', () => {
    audio.muted = !audio.muted;
    isMuted = audio.muted;
    updateButtons();
  });

  updateButtons();
}

function initTerminal() {
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
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  appendLine('C:\\LOVE> Welcome to your love terminal. Type help to begin.');

  terminalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = terminalInput.value.trim().toLowerCase();
    appendLine(`C:\\LOVE> ${value || '...'}`);
    if (!value) {
      appendLine('C:\\LOVE> Please whisper something sweet.');
    } else if (value === 'clear') {
      terminalOutput.innerHTML = '';
      appendLine('C:\\LOVE> Console cleared.');
    } else if (commands[value]) {
      appendLine(commands[value]);
    } else {
      appendLine('C:\\LOVE> That command has not been written into this love story yet.');
    }
    terminalInput.value = '';
  });
}

function launchConfetti() {
  if (document.getElementById('confetti-canvas')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
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

function fadeIntoStory() {
  authSection.classList.add('hidden');
  storyContent.classList.remove('hidden');
  storyContent.classList.add('fade-in');
}

beginJourneyButton.addEventListener('click', () => {
  authSection.classList.remove('hidden');
  appShell.classList.remove('hidden');
  authInput.focus();
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = authInput.value.trim();
  if (answer.toLowerCase() === CONFIG.password.toLowerCase()) {
    authMessage.textContent = 'Correct. Welcome back to the love story.';
    setTimeout(fadeIntoStory, 700);
  } else {
    authMessage.textContent = 'Oops ❤️ Try again.';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    beginJourneyButton.focus();
  }, 3000);

  typeHeroTitle();
  renderTimeline();
  initGallery();
  initLetter();
  renderPromises();
  renderPhotoWall();
  renderReasons();
  initCounter();
  animateProgressBars();
  initTerminal();
  initMusic();
  launchConfetti();
});

finalTrigger.addEventListener('click', () => {
  finalScreen.classList.remove('hidden');
  launchConfetti();
});

function renderTimeline() {
  timeline.innerHTML = memories
    .map(
      (memory, index) => {
        const imageArray = Array.isArray(memory.images) ? memory.images : (memory.images ? [memory.images] : (memory.image ? [memory.image] : []));
        const imagesHtml = imageArray.map(img => `<img src="${img}" alt="${memory.title}" loading="lazy" />`).join('');
        return `
          <article class="timeline-card">
            <p class="eyebrow">${memory.date}</p>
            <h3>${memory.title}</h3>
            ${imagesHtml}
            <p>${memory.caption}</p>
          </article>
        `;
      }
    )
    .join('');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timeline.querySelectorAll('.timeline-card').forEach((card) => observer.observe(card));
}
