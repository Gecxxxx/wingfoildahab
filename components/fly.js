(() => {
  const mount = document.getElementById('vf-fly-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/fly/${name}`, root).href;
  const features = [
    ['boat.png', 'Boat', 'Инструктор с лодкой', 'Используем лодку во время уроков. Начнем занятие в наиболее подходящей ветровой части акватории для вашего комфорта.'],
    ['radios.png', 'Radios', 'Рации с микрофоном', "Мы используем BB-Talkin' для легкой связи с инструктором в режиме реального времени. Вы слышите советы прямо во время движения."],
    ['safety.png', 'Safety', 'Практика на воде', 'Под чутким наблюдением вы сможете легко освоить вингфойлинг. За вашей безопасностью присматривают 4 спасательных катера.'],
    ['gift.png', 'Gift', 'Час проката в подарок', 'После первого урока вы получите комплект «Доска с швертом + надувное крыло» на 1 час проката совершенно бесплатно.'],
  ];

  mount.innerHTML = `
    <section class="fly-section" id="fly-teaching">
      <div class="fly-container">
        <h2 class="fly-title">Мы научим вас <br><span class="fly-orange">летать!</span></h2>
        <div class="fly-grid">
          ${features.map(([image, alt, title, text]) => `
            <article class="fly-item"><img src="${asset(image)}" alt="${alt}" class="fly-icon"><div class="fly-item-title">${title}</div><p class="fly-item-text">${text}</p></article>
          `).join('')}
        </div>
        <div class="fly-actions">
          <a href="#" class="fly-btn fly-btn--main" data-contact-open>Написать нам</a>
          <a href="#" class="fly-btn fly-btn--sub" data-scroll=".uc-steps">Этапы обучения</a>
        </div>
      </div>
    </section>
  `;

  mount.querySelectorAll('[data-scroll]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
  }));
  mount.querySelector('[data-contact-open]').addEventListener('click', (event) => {
    event.preventDefault();
    document.dispatchEvent(new Event('vf:open-contact'));
  });
})();
