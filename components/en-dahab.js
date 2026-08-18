(() => {
  const mount = document.getElementById('vf-en-dahab-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/dahab/${name}`, root).href;

  mount.innerHTML = `
    <section class="dahab-section">
      <h2 class="dahab-title">We're in <span class="dahab-orange">Dahab.</span></h2>
      <div class="dahab-wrapper">
        <div class="dahab-photo-monolith">
          <div class="dahab-photo-col dahab-photo-col--left">
            <div class="dahab-image-box dahab-image-box--large"><img class="dahab-image" src="${asset('photo-01.jpg')}" alt="Wingfoiling in Dahab"></div>
            <div class="dahab-image-box dahab-image-box--small"><img class="dahab-image" src="${asset('photo-02.jpg')}" alt="Vetratoria station"></div>
          </div>
          <div class="dahab-photo-col">
            <div class="dahab-image-box dahab-image-box--small"><img class="dahab-image" src="${asset('photo-03.webp')}" alt="Wingfoil riding"></div>
            <div class="dahab-image-box dahab-image-box--large"><img class="dahab-image" src="${asset('photo-04.jpg')}" alt="Wingfoiler in Dahab"></div>
          </div>
        </div>
        <div class="dahab-info">
          <p>Dahab is a unique place of winds, the capital of wingfoil and other water sports. It is a small and beautiful resort town located <b>one hour drive from Sharm El Sheikh airport, Egypt.</b></p>
          <p>Our wingfoil center “Vetratoria” is a school and sports club where you will discover the world of a new water sport, learn new skills and expand your abilities. You can enjoy ideal conditions for riding: stable wind regardless of the season, smooth water <b>in the closed Lagoon</b> and the windier <b>Speed Zone</b>, as well as measured <b>waves in the open sea zone</b>, warm sun and a friendly atmosphere.</p>
          <p>We have three lifeboats and provide a rescue phone for going out on the waves in the open sea zone.</p>
          <p>You will have at your disposal the latest equipment and a wide selection of boards, wings and hydrofoils from the renowned Italian brand <span class="dahab-orange"><b>Roberto Ricci Designs (RRD)</b></span></p>
          <div class="dahab-divider"></div>
          <p>Our wingfoil center “Vetratoria” is the first officially licensed wingfoil center in Egypt, Sinai.<br>We are also the official test center for <b>RRD</b> wingfoil equipment.</p>
          <div class="dahab-divider"></div>
          <p>Discover the world of new water sports, feel the inexpressible <b>feeling of flying on wingfoil and get charged with vivid emotions in the best wind spot — Dahab, together with our wingfoil center!</b></p>
          <div class="dahab-actions">
            <a href="#aquatory" class="dahab-btn dahab-btn--outline">About the Spot</a>
            <a href="#contacts" class="dahab-btn dahab-btn--fill">Contact Us</a>
          </div>
        </div>
      </div>
    </section>`;
})();
