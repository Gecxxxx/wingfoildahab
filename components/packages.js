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
  let current='lessons';
  const tabs=(modifier='')=>`<div class="packages-tabs ${modifier}" aria-label="Тип пакета"><button class="packages-tab${current==='lessons'?' active':''}" data-tab="lessons" type="button" aria-pressed="${current==='lessons'}">Только уроки</button><button class="packages-tab${current==='intensive'?' active':''}" data-tab="intensive" type="button" aria-pressed="${current==='intensive'}">Интенсив (+ Прокат)</button></div>`;
  mount.innerHTML=`<section class="wing-packages uc-wing-packages" id="training-packages"><div class="packages-wrap"><h2>Пакеты <span class="packages-orange">обучения</span></h2>${tabs('packages-tabs--primary')}<div class="packages-grid"></div></div><div class="package-modal" role="dialog" aria-modal="true" aria-labelledby="package-modal-title"><div class="package-modal-content"><button class="package-modal-close" type="button" aria-label="Закрыть">×</button><div class="package-modal-info"><h3 id="package-modal-title"></h3><p>Профессиональный курс обучения на нашей станции в Дахабе. Мы предоставляем современное оборудование RRD и услуги сертифицированных инструкторов.</p><ul class="package-modal-list"></ul><button class="package-btn package-primary package-modal-book" type="button">Забронировать</button></div><div class="package-modal-image"></div></div></div></section>`;
  const grid=mount.querySelector('.packages-grid'), modal=mount.querySelector('.package-modal');
  const scrollForm=()=>document.querySelector('#booking-form')?.scrollIntoView({behavior:'smooth',block:'start'});
  let previousFocus=null;
  const service=p=>`${current==='lessons'?'Только уроки':'Интенсив + прокат'} — ${p[0]}, $${p[1]}`;
  const close=()=>{const wasOpen=modal.classList.contains('active');modal.classList.remove('active');document.body.style.overflow='';if(wasOpen)previousFocus?.focus()};
  const open=i=>{const p=data[current][i];previousFocus=document.activeElement;mount.querySelector('.package-modal-info h3').textContent=`Курс: ${p[0]}`;mount.querySelector('.package-modal-image').style.backgroundImage=`url('${asset(p[5])}')`;mount.querySelector('.package-modal-list').innerHTML=p[4].map(x=>`<li>${x}</li>`).join('');mount.querySelector('.package-modal-book').dataset.bookingService=service(p);modal.classList.add('active');document.body.style.overflow='hidden';mount.querySelector('.package-modal-close').focus()};
  const render=()=>{grid.innerHTML=data[current].map((p,i)=>`<div class="package-entry" data-package-index="${i}"><article class="package-card" style="animation-delay:${i*.05}s"><div class="package-thumb"><img src="${asset(p[5])}" alt="${p[0]}" loading="lazy"></div><div class="package-body"><span class="package-badge">${p[3]}</span><h3>${p[0]}</h3><ul class="package-inc">${p[4].map(x=>`<li>${x}</li>`).join('')}</ul><div class="package-price"><span class="package-num">${p[1]}</span><span class="package-cur">$</span></div><span class="package-save">${p[2]?`Экономия: $${p[2]}`:'&nbsp;'}</span><div class="package-actions"><button class="package-btn package-primary" data-choose data-booking-service="${service(p)}" type="button">Выбрать</button><button class="package-btn package-ghost" data-details="${i}" type="button">Детали</button></div></div></article>${tabs('packages-tabs--mobile')}</div>`).join('');grid.querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',scrollForm));grid.querySelectorAll('[data-details]').forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.details))))};
  const changeTab=button=>{if(button.dataset.tab===current)return;const localTabs=button.closest('.packages-tabs--mobile');const anchorTop=localTabs?.getBoundingClientRect().top;const index=Number(button.closest('.package-entry')?.dataset.packageIndex||0);current=button.dataset.tab;render();mount.querySelectorAll('.packages-tabs--primary .packages-tab').forEach(tab=>{const active=tab.dataset.tab===current;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active))});if(localTabs&&anchorTop!==undefined)requestAnimationFrame(()=>{const target=grid.querySelector(`[data-package-index="${Math.min(index,data[current].length-1)}"] .packages-tabs--mobile`);if(target)window.scrollBy(0,target.getBoundingClientRect().top-anchorTop)})};
  mount.addEventListener('click',event=>{const button=event.target.closest('[data-tab]');if(button&&mount.contains(button))changeTab(button)});
  mount.querySelector('.package-modal-close').addEventListener('click',close);mount.querySelector('.package-modal-book').addEventListener('click',()=>{close();scrollForm()});modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close();if(e.key==='Tab'&&modal.classList.contains('active')){const f=[...modal.querySelectorAll('a,button:not([disabled])')];const first=f[0],last=f.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});render();
})();
