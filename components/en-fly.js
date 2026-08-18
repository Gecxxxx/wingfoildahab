(() => {
  const mount = document.getElementById('vf-en-fly-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/fly/${name}`, root).href;
  const features = [
    ['boat.webp', 'Boat', 'Instructor with a boat', 'Use the boat during the lessons. We will start in the most suitable windward part of the water.'],
    ['radios.webp', 'Radios', "BB-Talkin' Radios", "We use professional BB-Talkin' radios in training for easy real-time communication with the instructor."],
    ['safety.webp', 'Safety', 'Water Practice', 'Under close supervision, you can easily master wingfoiling. You will be looked after by 4 rescue boats.'],
    ['gift.webp', 'Gift', '1 Hour Rental Gift', 'After your first Sup+Wing lesson, you will receive 1 hour of equipment rental as a gift.'],
  ];
  mount.innerHTML = `<section class="fly-section" id="fly-teaching"><div class="fly-container">
    <h2 class="fly-title">We will teach you <br><span class="fly-orange">to fly!</span></h2>
    <div class="fly-grid">${features.map(([image,alt,title,text]) => `<article class="fly-item"><img src="${asset(image)}" loading="lazy" decoding="async" alt="${alt}" class="fly-icon"><div class="fly-item-title">${title}</div><p class="fly-item-text">${text}</p></article>`).join('')}</div>
    <div class="fly-actions"><a href="#booking-form-en" class="fly-btn fly-btn--main">Write to us</a><a href="#learning-stages" class="fly-btn fly-btn--sub">Stages of training</a></div>
  </div></section>`;
})();
