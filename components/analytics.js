(() => {
  const counterId = 102297934;

  window.ym = window.ym || function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = Date.now();

  if (!document.querySelector('script[src^="https://mc.yandex.ru/metrika/tag.js"]')) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
    document.head.append(tag);
  }

  window.ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
})();
