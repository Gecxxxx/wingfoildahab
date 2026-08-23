(() => {
  const mount = document.getElementById('vf-steps-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/steps/${name}`, root).href;
  const steps = [
    { num: '1 этап', title: 'Швертовая доска + винг', preview: 'Учимся управлять крылом на стабильной доске без фойла.', img: 'step-01.webp', full: 'На этом уроке вы научитесь управлять парусом на швертовой доске без подводного крыла. Это база, необходимая для понимания тяги ветра.', skills: ['Удержание паруса и контроль угла', 'Управление скоростью и тягой', 'Повороты и движение на ветер', 'Возврат к станции'], note: 'Цель: Разобрать технику управления парусом. Обычно достаточно 1-2 занятий.' },
    { num: '2 этап', title: 'Фойл + Лодка', preview: 'Отработка баланса и взлета на гидрофойле за катером.', img: 'step-02.webp', full: 'Осваиваем управление доской с подводным крылом, держась за фал буксирующей лодки. Это исключает влияние ветра и позволяет сфокусироваться на балансе.', skills: ['Выход на подводное крыло', 'Контроль высоты полета', 'Чувство стабильности и управления доской'], note: 'Цель: Контроль высоты взлета. Обычно хватает 30-90 минут за лодкой.' },
    { num: '3 этап', title: 'Вингфойлинг (Полет)', preview: 'Соединяем крыло и фойл для полноценного полета.', img: 'step-03.webp', full: 'Объединяем все навыки: доска с подводным крылом под ногами и ветер в руках. Это момент вашего первого настоящего полета.', skills: ['Выход на крыло с помощью винга', 'Контроль высоты и стабильный полет', 'Разгон и управление скоростью', 'Возвращение в точку старта'], note: 'Для стабильного полета требуется 1–3 занятия с последующей практикой.' },
    { num: '4 этап', title: 'Повороты и Элементы', preview: 'Джайбы, оверштаки и основы катания на волнах.', img: 'step-04.webp', full: 'Если вы уже уверенно летаете, пора учиться делать это красиво и без остановок. Маневры и первые выходы на волны.', skills: ['Повороты фордевинд и оверштак', 'Движение без потери высоты', 'Техника старта и катания на волнах'], note: 'Цель: Повороты на крыле без потери скорости и выход в открытое море.' },
  ];

  mount.innerHTML = `
    <section class="steps-section uc-steps" id="training-path"><div class="steps-container"><h2>Ваш путь к <span class="steps-orange">первому полету</span></h2><div class="steps-grid">${steps.map((step, index) => `<article class="step-card" data-step="${index}" tabindex="0"><div class="step-img"><img src="${asset(step.img)}" alt="${step.title}" loading="lazy"></div><div class="step-info"><span class="step-hint">Подробнее →</span><span class="step-num">${step.num}</span><h3 class="step-title">${step.title}</h3><p class="step-preview">${step.preview}</p></div></article>`).join('')}</div><div class="steps-footer"><a href="#booking-form" class="steps-main-btn">Записаться на обучение</a></div></div>
      <div class="steps-modal-overlay"><div class="steps-modal-content"><button class="steps-modal-close" type="button" aria-label="Закрыть">×</button><div class="steps-modal-image"></div><div class="steps-modal-text"><h3></h3><h4></h4><div class="steps-modal-details"></div><div class="steps-modal-note"></div><ul class="steps-modal-list"></ul><a href="#booking-form" class="steps-modal-btn">Забронировать этот этап</a></div></div></div>
    </section>`;

  const overlay = mount.querySelector('.steps-modal-overlay');
  const close = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; };
  const open = (index) => { const step = steps[index]; mount.querySelector('.steps-modal-image').style.backgroundImage = `url('${asset(step.img)}')`; mount.querySelector('.steps-modal-text h3').textContent = step.num; mount.querySelector('.steps-modal-text h4').textContent = step.title; mount.querySelector('.steps-modal-details').textContent = step.full; mount.querySelector('.steps-modal-note').textContent = step.note; mount.querySelector('.steps-modal-list').innerHTML = step.skills.map(skill => `<li>${skill}</li>`).join(''); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
  mount.querySelectorAll('[data-step]').forEach(card => { card.addEventListener('click', () => open(Number(card.dataset.step))); card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(Number(card.dataset.step)); }); });
  mount.querySelector('.steps-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  mount.querySelector('.steps-modal-btn').addEventListener('click', close);
})();
