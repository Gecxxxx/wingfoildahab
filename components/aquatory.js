(() => {
  const mount = document.getElementById('vf-aquatory-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/aquatory/${name}`, root).href;

  mount.innerHTML = `
    <section class="dahab-aquatory-final uc-aquatory">
      <div class="da-container">
        <div class="da-left">
          <h2 class="da-title">Наша <span class="da-orange">акватория</span></h2>
          <p class="da-intro">Дахаб — идеальное место для всех, от новичков до опытных райдеров. Чистота и отсутствие мусора делают катание на фойле максимально комфортным!</p>
          <div class="da-card"><h3>01. ЛАГУНА</h3><p>Идеально для начинающих. Песчаная коса обеспечивает полную безопасность, а ровная вода и обширные отмели — лучший старт для первых «полетов».</p></div>
          <div class="da-card"><h3>02. СКОРОСТНАЯ ЗОНА</h3><p>Зона с самым стабильным ветром для скоростного катания. Ровная вода переходит в чоп, а безопасность обеспечивает постоянное наблюдение и «спасательный остров».</p></div>
          <div class="da-card"><h3>03. ВОЛНОВАЯ ЗОНА</h3><p>Открытое море за рифом с пологими волнами до 3 м. Идеально для вейв-фойлинга и прыжков. Для полной безопасности выдаем спасательные телефоны.</p></div>
          <div class="da-action-wrapper"><a href="#booking-form" class="da-main-btn">Связаться с нами</a></div>
        </div>
        <div class="da-right">
          <div class="da-interactive-zone">
            <div class="da-screen">
              <div class="da-img-item active"><img src="${asset('satellite.webp')}" alt="Вид со спутника" loading="lazy" decoding="async"></div>
              <div class="da-img-item"><img src="${asset('map.webp')}" alt="Карта спота" loading="lazy" decoding="async"></div>
            </div>
            <div class="da-controls">
              <button class="da-btn active" type="button" data-map="0">Спутник</button>
              <button class="da-btn" type="button" data-map="1">Карта акватории</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const slides = [...mount.querySelectorAll('.da-img-item')];
  const buttons = [...mount.querySelectorAll('[data-map]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.map);
    slides.forEach((slide, current) => slide.classList.toggle('active', current === index));
    buttons.forEach((item, current) => item.classList.toggle('active', current === index));
  }));

})();
