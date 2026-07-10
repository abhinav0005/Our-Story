import { memories } from './memories.js';

export function initGallery(container, lightbox, imageElement, closeButton) {
  if (!container || !lightbox || !imageElement || !closeButton) return;

  const items = memories.map((memory, index) => ({
    src: memory.image,
    alt: memory.title,
    index
  }));

  container.innerHTML = items
    .map(
      (item) => `
        <figure class="gallery-item" data-index="${item.index}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        </figure>
      `
    )
    .join('');

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    imageElement.src = items[currentIndex].src;
    imageElement.alt = items[currentIndex].alt;
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

  container.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(Number(item.dataset.index)));
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.classList.contains('hidden')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (event) => {
    const deltaX = event.changedTouches[0].screenX - touchStartX;
    if (deltaX > 70) showPrev();
    if (deltaX < -70) showNext();
  });
}
