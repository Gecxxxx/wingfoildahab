(() => {
  const mount = document.getElementById('vf-en-aquatory-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/aquatory/${name}`, root).href;
  mount.innerHTML = `<section class="dahab-aquatory-final uc-aquatory" id="aquatory"><div class="da-container"><div class="da-left">
    <h2 class="da-title">The Spots of <span class="da-orange">Dahab</span></h2>
    <p class="da-intro">The unique shoreline landscape divides the sea into three distinct zones for all skill levels:</p>
    <div class="da-card"><h3>01. THE LAGOON</h3><p>Shallow water with a flat surface. Protected by a sandbar, it's the perfect training ground for your first “flights” on the foil.</p></div>
    <div class="da-card"><h3>02. SPEED ZONE</h3><p>Open space with smooth water and consistent wind. This is where riders perfect their speed and advanced jibes.</p></div>
    <div class="da-card"><h3>03. WAVE ZONE</h3><p>Venture beyond the reef to long, rolling swells. The ultimate territory for true wing-surfing in the open sea.</p></div>
    <div class="da-action-wrapper"><a href="#contacts" class="da-main-btn">Contact Us</a></div>
  </div><div class="da-right"><div class="da-interactive-zone"><div class="da-screen">
    <div class="da-img-item active"><img src="${asset('satellite.jpg')}" loading="lazy" decoding="async" alt="Satellite view"></div>
    <div class="da-img-item"><img data-src="${asset('map.jpg')}" loading="lazy" decoding="async" alt="Spot map"></div>
  </div><div class="da-controls"><button class="da-btn active" type="button" data-map="0">Satellite</button><button class="da-btn" type="button" data-map="1">Spot Map</button></div></div></div></div></section>`;
  const slides = [...mount.querySelectorAll('.da-img-item')];
  const buttons = [...mount.querySelectorAll('[data-map]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.map);
    const image = slides[index].querySelector('img[data-src]');
    if (image) { image.src = image.dataset.src; image.removeAttribute('data-src'); }
    slides.forEach((slide, current) => slide.classList.toggle('active', current === index));
    buttons.forEach((item, current) => item.classList.toggle('active', current === index));
  }));
})();
