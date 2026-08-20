(() => {
  const mount = document.getElementById('vf-blog-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const route = path => new URL(path, root).href;
  const image = path => new URL(`assets/articles/${path}`, root).href;
  const ru = document.documentElement.lang === 'ru';
  const posts = ru ? [
    ['wingfoil-training-dahab/', 'wingfoil-training-dahab/photo-01.webp', 'Обучение', 'Обучение вингфойлу в Дахабе с нуля', 'Этапы, реальные сроки и путь от первого занятия до самостоятельных полётов.'],
    ['why-dahab/', '529dfa664a7d9457.webp', 'Дахаб', 'Почему Дахаб идеален для вингфойла', 'Ветер, ровная вода и три зоны для безопасного и быстрого прогресса.'],
    ['wingfoil-for-beginners/', 'c46be0a8cb7640a5.webp', 'Новичкам', 'Вингфойл для новичков', 'Что нужно знать перед первым выходом на воду и как начать кататься уверенно.'],
  ] : [
    ['why-dahab-en/', '529dfa664a7d9457.webp', 'Dahab', 'Why Dahab is perfect for wingfoiling', 'Reliable wind, flat water and three riding zones for safe, fast progress.'],
    ['wingfoil-for-beginners-en/', 'c46be0a8cb7640a5.webp', 'Beginners', 'Wingfoil for beginners', 'What to know before your first session and how to start riding with confidence.'],
    ['history-of-wingfoil-en/', '99caf0ee7a716c35.webp', 'History', 'The history of wingfoil', 'How hydrofoils and handheld wings evolved into one of the newest water sports.'],
  ];
  const card = ([href, img, meta, title, copy]) => `<a class="vf-blog-card" href="${route(href)}"><div class="vf-blog-card__media"><img src="${image(img)}" alt="${title}" loading="lazy" width="800" height="500"></div><div class="vf-blog-card__body"><div class="vf-blog-card__meta">${meta}</div><h3>${title}</h3><p>${copy}</p><span class="vf-blog-card__more">${ru ? 'Читать' : 'Read'}</span></div></a>`;
  mount.innerHTML = `<section class="vf-blog" aria-labelledby="vf-blog-title"><div class="vf-blog__inner"><div class="vf-blog__head"><div><p class="vf-blog__eyebrow">${ru ? 'Vetratoria' : 'Vetratoria Journal'}</p><h2 id="vf-blog-title">${ru ? 'Блог' : 'Blog'}</h2></div><p class="vf-blog__intro">${ru ? 'Разбираем обучение, снаряжение, безопасность и жизнь на воде — честно и на опыте инструкторов.' : 'Guides to learning, equipment, safety and life on the water — written from real instructor experience.'}</p></div><div class="vf-blog__grid">${posts.map(card).join('')}</div><div class="vf-blog__actions"><a class="vf-blog__all" href="${route(ru ? 'blog-ru/' : 'blog/')}">${ru ? 'Все статьи' : 'All articles'} →</a></div></div></section>`;
})();
