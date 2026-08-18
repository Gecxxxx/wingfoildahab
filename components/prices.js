(() => {
  const mount = document.getElementById('vf-prices-root');
  if (!mount) return;
  const root = new URL('../', document.currentScript.src);
  const asset = name => new URL(`assets/prices/${name}`, root).href;
  const items = [
    ['price-01.jpg','Индивидуальный урок','Занятие / 1 час','70','$','Интенсивная тренировка 1 на 1 с инструктором. Включено всё необходимое: оборудование RRD, шлем с радиосвязью для мгновенных советов и гидрокостюм. Идеально для быстрого прогресса.'],
    ['price-02.png','Выход в волны','Для продвинутых / 1 час','70','$','Выход на рифовую волну Дахаба. Инструктор покажет лучшие точки и научит технике карвинга и скольжения по волне без использования тяги винга.'],
    ['price-03.png','Групповой урок','2 человека / 1 час','55','$/чел','Цена указана за одного человека. Отличный вариант для пар или друзей одного уровня. Учитесь вместе и делитесь впечатлениями от первых полетов.'],
    ['price-04.jpg','Швертовая доска + винг','Прокат / 1 час','25','$','Специальный комплект для новичков. Большая доска со швертом и стабильный винг. Идеально для отработки управления крылом перед переходом на фойл.'],
    ['price-05.jpg','Урок за лодкой','Обучение / 30 мин','60','$','Самый быстрый способ почувствовать полет. Не нужен ветер — только тяга катера. 30 минут за лодкой экономят часы самостоятельных попыток с крылом.'],
    ['price-06.jpg','Прокат комплекта','Full Set / 1 час','45','$','Премиальное оборудование RRD: карбоновые фойлы, легкие винги и современные доски. Включает сервис спасения и страховку оборудования.'],
  ];
  mount.innerHTML=`<section class="wing-price-record uc-price"><div class="wing-price-list"><div class="price-wrap"><span class="price-kicker">Разовые занятия и прокат</span><h2>Цены</h2><div class="price-grid">${items.map((item,index)=>`<article class="price-card"><div class="price-thumb"><img src="${asset(item[0])}" alt="${item[1]}" loading="lazy"></div><div class="price-body"><h3>${item[1]}</h3><span class="price-meta">${item[2]}</span><div class="price-box"><span class="price-num">${item[3]}</span><span class="price-cur">${item[4]}</span></div><div class="price-actions"><a href="#booking-form" class="price-btn price-btn--primary">Записаться</a><button class="price-btn price-btn--ghost" type="button" data-price="${index}">Подробнее</button></div></div></article>`).join('')}</div><div class="price-cta"><p class="price-footnote">В стоимость урока включено: оборудование, страховка, шлем и жилет.</p><a class="price-equipment-link" href="../equipment-ru/" target="_blank" rel="noopener">Цены на прокат оборудования</a></div></div><div class="price-modal-overlay"><div class="price-modal-content"><button class="price-modal-close" type="button" aria-label="Закрыть">×</button><div class="price-modal-image"></div><div class="price-modal-info"><h3></h3><span class="price-modal-meta"></span><p class="price-modal-text"></p><div class="price-actions"><a href="#booking-form" class="price-btn price-btn--primary">Записаться</a><button class="price-btn price-btn--ghost" type="button" data-close>Закрыть</button></div></div></div></div></div></section>`;
  const overlay=mount.querySelector('.price-modal-overlay');
  const close=()=>{overlay.classList.remove('active');document.body.style.overflow=''};
  const open=index=>{const item=items[index];mount.querySelector('.price-modal-image').style.backgroundImage=`url('${asset(item[0])}')`;mount.querySelector('.price-modal-info h3').textContent=item[1];mount.querySelector('.price-modal-meta').textContent=item[2];mount.querySelector('.price-modal-text').textContent=item[5];overlay.classList.add('active');document.body.style.overflow='hidden'};
  mount.querySelectorAll('[data-price]').forEach(button=>button.addEventListener('click',()=>open(Number(button.dataset.price))));
  mount.querySelectorAll('[data-close],.price-modal-close').forEach(button=>button.addEventListener('click',close));
  overlay.addEventListener('click',event=>{if(event.target===overlay)close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  mount.querySelector('.price-modal-content a[href="#booking-form"]').addEventListener('click',close);
})();
