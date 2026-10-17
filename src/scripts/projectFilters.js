(function () {
  const OVERFLOW_CLASS = 'tag--overflow';
  const STORAGE_KEY = 'projectFilterTag';

  function init() {
    const filterRoot = document.getElementById('project-filters');
    const projects = document.querySelectorAll('#projects-list .project');
    const emptyState = document.getElementById('projects-empty');
    const countEl = document.getElementById('project-count');
    const moreToggle = document.getElementById('filters-more-toggle');

    if (!filterRoot) return;

    const tagButtons = filterRoot.querySelectorAll('.tag[data-tag]');
    const overflowButtons = filterRoot.querySelectorAll(`.${OVERFLOW_CLASS}`);

    function setOverflowVisible(show) {
      overflowButtons.forEach((btn) => {
        btn.hidden = !show;
      });
      if (moreToggle) {
        moreToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
        const n = overflowButtons.length;
        moreToggle.textContent = show ? 'Less' : `More (${n})`;
      }
    }

    if (moreToggle) {
      moreToggle.addEventListener('click', () => {
        const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
        setOverflowVisible(!expanded);
      });
    }

    function applyFilter(tag) {
      let visible = 0;
      projects.forEach((project) => {
        const raw = project.getAttribute('data-tags') || '';
        const tags = raw ? raw.split(',') : [];
        const match = tag === 'all' || tags.includes(tag);
        project.classList.toggle('hidden', !match);
        if (match) visible += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle('visible', visible === 0);
      }

      if (countEl) {
        countEl.textContent =
          tag === 'all' ? '' : `${visible} / ${projects.length}`;
      }
    }

    function persistFilter(tag) {
      try {
        sessionStorage.setItem(STORAGE_KEY, tag);
      } catch (_) {
        /* ignore */
      }

      const url = new URL(window.location.href);
      if (tag === 'all') {
        url.searchParams.delete('tag');
      } else {
        url.searchParams.set('tag', tag);
      }
      if (!url.hash) {
        url.hash = 'projectSection';
      }
      history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }

    function getSavedFilter() {
      const fromUrl = new URLSearchParams(window.location.search).get('tag');
      if (fromUrl) return fromUrl;

      try {
        return sessionStorage.getItem(STORAGE_KEY) || 'all';
      } catch (_) {
        return 'all';
      }
    }

    function activateFilter(tag) {
      let activeBtn = null;
      tagButtons.forEach((btn) => {
        if (btn.dataset.tag === tag) activeBtn = btn;
      });

      if (!activeBtn) {
        tag = 'all';
        tagButtons.forEach((btn) => {
          if (btn.dataset.tag === 'all') activeBtn = btn;
        });
      }

      if (activeBtn?.classList.contains(OVERFLOW_CLASS) && activeBtn.hidden) {
        setOverflowVisible(true);
      }

      tagButtons.forEach((b) => b.classList.remove('active'));
      if (activeBtn) activeBtn.classList.add('active');
      applyFilter(tag);
      persistFilter(tag);
    }

    tagButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activateFilter(btn.dataset.tag || 'all');
      });
    });

    const section = document.getElementById('projectSection');
    const initializedTag = section?.getAttribute('data-filter-initialized');
    if (!initializedTag) {
      activateFilter(getSavedFilter());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
