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

  if (!document.querySelector('script[data-contact-widget]')) {
    const widget = document.createElement('script');
    widget.src = new URL('contact-widget.js?v=20260831-1', document.currentScript.src).href;
    widget.defer = true;
    widget.dataset.contactWidget = 'true';
    document.head.append(widget);
  }
})();
