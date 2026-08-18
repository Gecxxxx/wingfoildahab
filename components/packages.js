(() => {
  const mount=document.getElementById('vf-packages-root'); if(!mount)return;
  const asset=name=>new URL(`../assets/packages/${name}`,document.baseURI).href;
  const data={
    lessons:[
      ['3 дня',270,30,'Старт',['3 часа с инструктором','45 мин катер + фойл','Оборудование включено'],'lessons-03.webp'],
      ['4 дня',360,40,'Базовый+',['4 часа с инструктором','60 мин катер + фойл','Оборудование включено'],'lessons-04.webp'],
      ['5 дней',420,50,'Популярный',['5 часов с инструктором','60 мин катер + фойл','Оборудование включено'],'lessons-05.webp'],
      ['6 дней',480,60,'Прогресс',['6 часов с инструктором','60 мин катер + фойл','Оборудование включено'],'lessons-06.webp'],
      ['7 дней',540,70,'Максимум',['7 часов с инструктором','60 мин катер + фойл','Оборудование включено'],'lessons-07.webp']
    ],
    intensive:[
      ['1 день',95,0,'Пробный',['1 час с инструктором','15 мин катер + фойл','Прокат SUP + Wing на день'],'intensive-01.webp'],
      ['3 дня',350,205,'Интенсив',['3 часа с инструктором','45 мин катер + фойл','Прокат весь день','Страховка + Спасение'],'intensive-03.webp'],
      ['4 дня',460,235,'Оптимальный',['4 часа с инструктором','60 мин катер + фойл','Прокат весь день','Страховка + Спасение'],'intensive-04.webp'],
      ['5 дней',570,235,'Уверенный',['5 часов с инструктором','60 мин катер + фойл','Прокат весь день','Страховка + Спасение'],'intensive-05.webp'],
      ['6 дней',670,235,'Мастер',['6 часов с инструктором','60 мин катер + фойл','Прокат весь день','Страховка + Спасение'],'intensive-06.webp'],
      ['7 дней',780,240,'Профи',['7 часов с инструктором','60 мин катер + фойл','Прокат весь день','Страховка + Спасение'],'intensive-07.webp']
    ]
  };
  mount.innerHTML=`<section class="wing-packages"><div class="packages-wrap"><h2>Пакеты <span class="packages-orange">обучения</span></h2><div class="packages-tabs"><button class="packages-tab active" data-tab="lessons">Только уроки</button><button class="packages-tab" data-tab="intensive">Интенсив (+ Прокат)</button></div><div class="packages-grid"></div></div><div class="package-modal" role="dialog" aria-modal="true"><div class="package-modal-content"><button class="package-modal-close" type="button" aria-label="Закрыть">×</button><div class="package-modal-info"><h3></h3><p>Профессиональный курс обучения на нашей станции в Дахабе. Мы предоставляем современное оборудование RRD и услуги сертифицированных инструкторов.</p><ul class="package-modal-list"></ul><button class="package-btn package-primary package-modal-book" type="button">Забронировать</button></div><div class="package-modal-image"></div></div></div></section>`;
  const grid=mount.querySelector('.packages-grid'), modal=mount.querySelector('.package-modal'); let current='lessons';
  const scrollForm=()=>document.querySelector('#vf-contact-root')?.scrollIntoView({behavior:'smooth',block:'start'});
  const close=()=>{modal.classList.remove('active');document.body.style.overflow=''};
  const open=i=>{const p=data[current][i];mount.querySelector('.package-modal-info h3').textContent=`Курс: ${p[0]}`;mount.querySelector('.package-modal-image').style.backgroundImage=`url('${asset(p[5])}')`;mount.querySelector('.package-modal-list').innerHTML=p[4].map(x=>`<li>${x}</li>`).join('');modal.classList.add('active');document.body.style.overflow='hidden'};
  const render=()=>{grid.innerHTML=data[current].map((p,i)=>`<article class="package-card" style="animation-delay:${i*.05}s"><div class="package-thumb"><img src="${asset(p[5])}" alt="${p[0]}" loading="lazy"></div><div class="package-body"><span class="package-badge">${p[3]}</span><h3>${p[0]}</h3><ul class="package-inc">${p[4].map(x=>`<li>${x}</li>`).join('')}</ul><div class="package-price"><span class="package-num">${p[1]}</span><span class="package-cur">$</span></div><span class="package-save">${p[2]?`Экономия: $${p[2]}`:'&nbsp;'}</span><div class="package-actions"><button class="package-btn package-primary" data-choose type="button">Выбрать</button><button class="package-btn package-ghost" data-details="${i}" type="button">Детали</button></div></div></article>`).join('');grid.querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',scrollForm));grid.querySelectorAll('[data-details]').forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.details))))};
  mount.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{mount.querySelector('.packages-tab.active').classList.remove('active');b.classList.add('active');current=b.dataset.tab;render()}));
  mount.querySelector('.package-modal-close').addEventListener('click',close);mount.querySelector('.package-modal-book').addEventListener('click',()=>{close();scrollForm()});modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close()});render();
})();
