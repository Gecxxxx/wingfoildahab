(() => {
  const mount = document.getElementById('vf-dahab-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/dahab/${name}`, root).href;

  mount.innerHTML = `
    <section class="dahab-section">
      <h2 class="dahab-title">Мы находимся в <span class="dahab-orange">Дахабе.</span></h2>
      <div class="dahab-wrapper">
        <div class="dahab-photo-monolith">
          <div class="dahab-photo-col dahab-photo-col--left">
            <div class="dahab-image-box dahab-image-box--large"><img class="dahab-image" src="${asset('photo-01.jpg')}" alt="Вингфойлинг в Дахабе"></div>
            <div class="dahab-image-box dahab-image-box--small"><img class="dahab-image" src="${asset('photo-02.jpg')}" alt="Станция Ветратория"></div>
          </div>
          <div class="dahab-photo-col">
            <div class="dahab-image-box dahab-image-box--small"><img class="dahab-image" src="${asset('photo-03.webp')}" alt="Катание на вингфойле"></div>
            <div class="dahab-image-box dahab-image-box--large"><img class="dahab-image" src="${asset('photo-04.jpg')}" alt="Вингфойлер в Дахабе"></div>
          </div>
        </div>
        <div class="dahab-info">
          <p>Дахаб — уникальное место ветров, столица водных видов спорта. Это небольшой и красивый курортный город, расположенный <b>в часе езды от аэропорта Шарм-эль-Шейх, Египет.</b></p>
          <p>Наша станция «Ветратория» — школа и спортивный клуб, где вы откроете для себя мир нового водного вида спорта, освоите новые умения и расширите свои навыки. Вы сможете насладиться идеальными условиями для катания: стабильным ветром независимо от сезона, гладкой водой <b>в закрытой Лагуне</b> и более <b>продуваемой Скоростной зоне</b>, а также размеренными <b>волнами в зоне открытого моря</b>, тёплым солнцем и дружелюбной атмосферой.</p>
          <p>У нас четыре спасательных катера, и мы предоставляем спасательный телефон для выходов на волны в зону открытого моря.</p>
          <p>В вашем распоряжении новейшее оборудование и широкий выбор досок, вингов и подводных крыльев от известнейшей итальянской компании <span class="dahab-orange"><b>Roberto Ricci Designs (RRD)</b></span></p>
          <div class="dahab-divider"></div>
          <p>Наша станция «Ветратория» — первая официально лицензированная станция вингфойлинга на Синае, в Египте.<br>Мы также являемся официальным тест-центром оборудования <b>RRD</b>.</p>
          <div class="dahab-divider"></div>
          <p>Откройте для себя мир нового водного спорта, ощутите непередаваемое <b>чувство полета и зарядитесь яркими эмоциями в лучшем ветровом споте – Дахаб, вместе с нашей станцией!</b></p>
          <div class="dahab-actions">
            <a href="#" class="dahab-btn dahab-btn--outline" data-scroll=".uc-aquatory">Наша акватория</a>
            <a href="#" class="dahab-btn dahab-btn--fill" data-contact-open>Контакты</a>
          </div>
        </div>
      </div>
    </section>
  `;

  mount.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(link.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  mount.querySelector('[data-contact-open]').addEventListener('click', (event) => {
    event.preventDefault();
    document.dispatchEvent(new Event('vf:open-contact'));
  });
})();
