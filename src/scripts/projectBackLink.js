(function () {
  const STORAGE_KEY = 'projectFilterTag';

  function init() {
    const backLink = document.getElementById('project-back');
    if (!backLink) return;

    try {
      const tag = sessionStorage.getItem(STORAGE_KEY);
      if (tag && tag !== 'all') {
        backLink.href = `/?tag=${encodeURIComponent(tag)}#projectSection`;
      }
    } catch (_) {
      /* ignore */
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
