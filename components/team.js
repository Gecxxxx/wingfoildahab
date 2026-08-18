(() => {
  const mount = document.getElementById('vf-team-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/team/${name}`, root).href;
  const members = [
    ['anatoly.png', 'Анатолий', 'Менеджер станции и старший инструктор', 'Опыт в водных видах спорта более 25 лет. Подберет идеально подходящий комплект RRD под ваши навыки и условия, обеспечив легкость и прогресс на занятиях.', 'Русский, Немецкий, Английский', 'team-delay-2'],
    ['hasan.png', 'Хасан', 'Профессиональный инструктор', 'Самый узнаваемый райдер спота с 10-летним опытом. Его позитивный настрой и индивидуальный подход помогут вам быстро обрести уверенность на крыле и насладиться полетом.', 'Русский, Английский', 'team-delay-2'],
    ['egor.png', 'Егор', 'Детский спортивный инструктор', 'Тренирует детей от 8 лет. Превращает обучение в увлекательную игру, закладывая профессиональную базу знаний и прививая любовь к водному спорту.', 'Русский, Английский', 'team-delay-3'],
    ['roma.png', 'Рома', 'Инструктор', 'Мастер простых объяснений сложной физики ветра. Разберет ошибки, покажет правильную технику и научит вас самостоятельно определять направления для катания.', 'Русский', 'team-delay-3'],
    ['ira.jpg', 'Ира', 'Администратор', 'Душа станции. Отвечает за уют, безопасность на воде и ваше отличное настроение. Всегда готова сварить кофе и поддержать дружескую беседу.', 'Русский, Английский', 'team-delay-4'],
    ['anna.png', 'Анна', 'Инструктор', 'Простым языком заложит уверенный фундамент навыков для вашего прогресса. Создает вдохновляющую атмосферу, в которой обучение приносит одно удовольствие.', 'Русский, Английский', 'team-delay-4'],
  ];

  mount.innerHTML = `
    <section class="team-section uc-team" id="team">
      <div class="team-container">
        <div class="team-header team-fade-up team-delay-1"><h2>Наша <span class="team-orange">Команда</span></h2><p>В нашей школе работают опытные инструкторы, которые уже научили вингфойлингу более 1500 человек!</p></div>
        <div class="team-grid">
          ${members.map(([image, name, role, description, languages, delay]) => `
            <article class="team-card team-fade-up ${delay}">
              <div class="team-photo-wrap"><img src="${asset(image)}" alt="${name}"></div>
              <div class="team-name">${name}</div>
              <div class="team-role">${role}</div>
              <div class="team-line"></div>
              <div class="team-desc">${description}</div>
              <div class="team-langs"><span>Языки:</span> ${languages}</div>
            </article>
          `).join('')}
        </div>
        <div class="team-footer team-fade-up team-delay-4"><a href="#" class="team-btn" data-contact-open>Записаться на урок</a></div>
      </div>
    </section>
  `;

  mount.querySelector('[data-contact-open]').addEventListener('click', (event) => {
    event.preventDefault();
    document.dispatchEvent(new Event('vf:open-contact'));
  });
})();
