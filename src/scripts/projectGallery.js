(function () {
  const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?|#|$)/i;
  const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i;

  function isVideo(item) {
    if (!item?.url) return false;
    if (IMAGE_EXT.test(item.url)) return false;
    if (VIDEO_EXT.test(item.url)) return true;
    return item.type === 'video';
  }

  function readItems(root) {
    const dataEl = document.getElementById('project-gallery-data');
    if (dataEl?.textContent) {
      try {
        return JSON.parse(dataEl.textContent);
      } catch (_) {
        /* fall through */
      }
    }
    const legacy = root.getAttribute('data-items') || root.getAttribute('data-images');
    if (legacy) {
      return JSON.parse(legacy);
    }
    return [];
  }

  function init() {
    const root = document.getElementById('project-gallery');
    const lightbox = document.getElementById('project-lightbox');
    if (!root || !lightbox) return;

    let items = [];
    try {
      items = readItems(root);
    } catch (_) {
      return;
    }
    if (items.length === 0) return;

    const featureBtn = root.querySelector('[data-gallery-feature]');
    const featureImg = document.getElementById('project-gallery-feature-img');
    const featureVideo = document.getElementById('project-gallery-feature-video');
    const lightboxImg = document.getElementById('project-lightbox-img');
    const lightboxVideo = document.getElementById('project-lightbox-video');
    const captionEl = document.getElementById('project-lightbox-caption');
    const counterEl = document.getElementById('project-lightbox-counter');
    const thumbs = root.querySelectorAll('.project-gallery-thumb');
    let currentIndex = 0;

    function pauseVideos() {
      featureVideo?.pause();
      lightboxVideo?.pause();
    }

    function clearVideo(el) {
      if (!el) return;
      el.pause();
      el.removeAttribute('src');
      el.removeAttribute('poster');
      el.hidden = true;
      el.load();
    }

    function showVideo(el, item) {
      if (!el) return;
      el.hidden = false;
      el.src = item.url;
      if (item.poster) el.poster = item.poster;
      else el.removeAttribute('poster');
    }

    function setFeatured(index) {
      currentIndex = index;
      const item = items[index];
      if (!item) return;

      pauseVideos();

      if (isVideo(item)) {
        if (featureImg) featureImg.hidden = true;
        showVideo(featureVideo, item);
        featureBtn?.classList.remove('project-gallery-feature--zoom');
      } else {
        clearVideo(featureVideo);
        if (featureImg) {
          featureImg.hidden = false;
          featureImg.src = item.url;
          featureImg.alt = item.alt || '';
        }
        featureBtn?.classList.add('project-gallery-feature--zoom');
      }

      thumbs.forEach((thumb, i) => {
        const active = i === index;
        thumb.classList.toggle('is-active', active);
        thumb.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    function updateLightbox() {
      const item = items[currentIndex];
      if (!item) return;

      pauseVideos();

      if (isVideo(item)) {
        if (lightboxImg) lightboxImg.hidden = true;
        showVideo(lightboxVideo, item);
      } else {
        clearVideo(lightboxVideo);
        if (lightboxImg) {
          lightboxImg.hidden = false;
          lightboxImg.src = item.url;
          lightboxImg.alt = item.alt || '';
        }
      }

      if (captionEl) captionEl.textContent = item.alt || '';
      if (counterEl) {
        counterEl.textContent = items.length > 1 ? `${currentIndex + 1} / ${items.length}` : '';
      }
    }

    function openLightbox(index) {
      setFeatured(index);
      updateLightbox();
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.project-lightbox-close')?.focus();
    }

    function closeLightbox() {
      pauseVideos();
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function step(delta) {
      if (items.length <= 1) return;
      const next = (currentIndex + delta + items.length) % items.length;
      setFeatured(next);
      updateLightbox();
    }

    featureBtn?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLVideoElement) return;
      const item = items[currentIndex];
      if (item && isVideo(item)) {
        openLightbox(currentIndex);
        lightboxVideo?.play().catch(() => {});
        return;
      }
      openLightbox(currentIndex);
    });

    root.querySelectorAll('[data-gallery-index]').forEach((el) => {
      el.addEventListener('click', () => {
        const index = Number(el.getAttribute('data-gallery-index') || '0');
        setFeatured(index);
      });
    });

    lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });

    lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
    lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => step(1));

    document.addEventListener('keydown', (event) => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    });

    setFeatured(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
