(() => {
  const mount = document.getElementById('vf-en-team-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/team/${name}`, root).href;
  const members = [
    ['anatoly.png', 'Anatoly', 'Manager & Senior Instructor', 'Over 25 years of experience in water sports. He will perfectly select your RRD gear to ensure your first steps on the water bring maximum excitement.', 'RU, EN, DE', 'team-delay-2'],
    ['hasan.png', 'Hassan', 'Pro Instructor', 'More than 10 years of coaching experience. The most recognizable rider on the spot, teaching you balance and confidence on the foil in any conditions.', 'RU, EN', 'team-delay-2'],
    ['egor.png', 'Egor', 'Kids Instructor', 'Specializes in teaching children from 8 years old. He turns complex technical moments into an engaging game, making the sport accessible to everyone.', 'RU, EN', 'team-delay-3'],
    ['roma.png', 'Roma', 'Instructor', 'A master of making complex wind physics simple. His 10 years of experience and calm approach will help you master the wing even in strong winds.', 'RU', 'team-delay-3'],
    ['ira.jpg', 'Ira', 'Administrator', 'The soul of the station. Responsible for comfort, safety on the water, and your great mood before and after every session.', 'RU, EN', 'team-delay-4'],
    ['anna.png', 'Anya', 'Instructor', 'A pro at correcting technical errors. She will lay a solid foundation of knowledge so you can progress as quickly as possible.', 'RU, EN', 'team-delay-4'],
  ];
  mount.innerHTML = `<section class="team-section uc-team" id="team"><div class="team-container">
    <div class="team-header team-fade-up team-delay-1"><h2>Our <span class="team-orange">Team</span></h2><p>Our school is powered by experienced instructors who are in love with the sea and have already taught wingfoiling to more than 1,500 people!</p></div>
    <div class="team-grid">${members.map(([image,name,role,description,languages,delay]) => `<article class="team-card team-fade-up ${delay}"><div class="team-photo-wrap"><img src="${asset(image)}" loading="lazy" decoding="async" alt="${name}"></div><div class="team-name">${name}</div><div class="team-role">${role}</div><div class="team-line"></div><div class="team-desc">${description}</div><div class="team-langs"><span>Languages:</span> ${languages}</div></article>`).join('')}</div>
    <div class="team-footer team-fade-up team-delay-4"><a href="#booking-form-en" class="team-btn">Book a Lesson</a></div>
  </div></section>`;
})();
