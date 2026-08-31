(() => {
  const mount = document.getElementById('vf-header-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = name => new URL(`assets/en-header/${name}`, root).href;
  const route = path => new URL(path, root).href;
  const currentPath = location.pathname.replace(/^\/+|\/+$/g, '');
  const russianRoutes = {
    '': 'ru/', 'en': 'ru/', 'equipment': 'equipment-ru/',
    'organizers': 'organizers-ru/', 'blog': 'blog-ru/',
    'why-bb-talkin-en': 'why-bb-talkin/',
    'history-of-wingfoil-en': 'history-of-wingfoil/',
    'wingfoil-racing-freestyle-en': 'wingfoil-racing-freestyle/',
    'wingfoil-for-beginners-en': 'wingfoil-for-beginners/',
    'kite-wingfoil-or-windsurf-en': 'kite-wingfoil-or-windsurf/',
    'why-dahab-en': 'why-dahab/',
    'wingfoil-training-dahab-en': 'wingfoil-training-dahab/'
  };
  const russianRoute = russianRoutes[currentPath] || 'ru/';
  const onHome = Boolean(document.getElementById('vf-en-hero-root'));
  const section = id => onHome ? id : route(id);
  const menu = [
    [section('#learning'), 'Learning'],
    [route('equipment/'), 'Equipment'],
    [section('#forecast'), 'Forecast'],
    [section('#team'), 'Team'],
    [route('blog/'), 'Blog'],
    [section('#faq'), 'FAQ'],
    [route('organizers/'), 'Organizers'],
    ['https://vetratoria.ru/', 'Windsurf', 'special'],
  ];
  const links = menu.map(([href, text, extra = '']) =>
    `<a href="${href}" class="vf-nav-link ${extra}"${href.startsWith('#') ? ` data-anchor="${href}"` : ''}>${text}</a>`
  ).join('');
  const socials = `
    <a class="vf-ico" href="https://t.me/wingfoil_center" target="_blank" rel="noopener"><img src="${asset('telegram.png')}" alt="TG"></a>
    <a class="vf-ico" href="https://wa.me/201151015941" target="_blank" rel="noopener"><img src="${asset('whatsapp.png')}" alt="WA"></a>
    <a class="vf-ico" href="https://www.instagram.com/vetratoriaofficiale/" target="_blank" rel="noopener"><img src="${asset('instagram.png')}" alt="IG"></a>`;

  mount.innerHTML = `
    <header id="vf-fixed-menu" class="vf-desk-menu">
      <div class="vf-desk-wrap">
        <a class="vf-desk-logo" href="${route('')}" aria-label="Vetratoria"><img src="${asset('logo.png')}" alt="Vetratoria"></a>
        <nav class="vf-desk-nav" aria-label="Main navigation"><div class="vf-desk-nav-inner">${links}</div></nav>
        <div class="vf-desk-right">
          <div class="vf-social">${socials}</div>
          <div class="vf-lang-switcher"><a href="${route(currentPath === 'en' ? 'en/' : currentPath ? currentPath + '/' : '')}" class="vf-lang-btn active">EN</a><a href="${route(russianRoute)}" class="vf-lang-btn">РУС</a></div>
          <button class="vf-burger" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="vf-panel" aria-hidden="true">
      <div class="vf-panel-inner">
        <div class="vf-panel-logo"><img src="${asset('logo.png')}" alt="Vetratoria"></div>
        <nav class="vf-nav" aria-label="Mobile navigation">${links}</nav>
        <div class="vf-m-social">${socials}</div>
      </div>
    </div>`;

  const burger = mount.querySelector('.vf-burger');
  const panel = mount.querySelector('.vf-panel');
  const close = () => {
    panel.classList.remove('vf-open');
    panel.setAttribute('aria-hidden', 'true');
    burger.classList.remove('vf-active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    const open = panel.classList.toggle('vf-open');
    panel.setAttribute('aria-hidden', String(!open));
    burger.classList.toggle('vf-active', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mount.querySelectorAll('[data-anchor]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.dataset.anchor);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: 'smooth'});
    close();
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
})();
