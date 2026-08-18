(() => {
  const mount=document.getElementById('vf-en-packages-root');if(!mount)return;
  const asset=name=>new URL(`../assets/packages/${name}`,document.baseURI).href;
  const data={
    lessons:[
      ['3 Days',270,30,'Start',['3 hours with instructor','45 min boat-foil towing','Training gear included'],'lessons-03.webp'],
      ['4 Days',360,40,'Basic+',['4 hours with instructor','60 min boat-foil towing','Training gear included'],'lessons-04.webp'],
      ['5 Days',420,50,'Popular',['5 hours with instructor','60 min boat-foil towing','Training gear included'],'lessons-05.webp'],
      ['6 Days',480,60,'Progress',['6 hours with instructor','60 min boat-foil towing','Training gear included'],'lessons-06.webp'],
      ['7 Days',540,70,'Maximum',['7 hours with instructor','60 min boat-foil towing','Training gear included'],'lessons-07.webp']
    ],
    intensive:[
      ['1 Day',95,0,'Trial',['1 hour with instructor','15 min boat-foil towing','SUP + Wing rental for the day'],'intensive-01.webp'],
      ['3 Days',350,205,'Intensive',['3 hours with instructor','45 min boat-foil towing','All-day rental','Insurance + Rescue'],'intensive-03.webp'],
      ['4 Days',460,235,'Optimal',['4 hours with instructor','60 min boat-foil towing','All-day rental','Insurance + Rescue'],'intensive-04.webp'],
      ['5 Days',570,235,'Confident',['5 hours with instructor','60 min boat-foil towing','All-day rental','Insurance + Rescue'],'intensive-05.webp'],
      ['6 Days',670,235,'Master',['6 hours with instructor','60 min boat-foil towing','All-day rental','Insurance + Rescue'],'intensive-06.webp'],
      ['7 Days',780,240,'Pro',['7 hours with instructor','60 min boat-foil towing','All-day rental','Insurance + Rescue'],'intensive-07.webp']
    ]
  };
  mount.innerHTML=`<section class="wing-packages"><div class="packages-wrap"><h2>Training <span class="packages-orange">Packages</span></h2><div class="packages-tabs"><button class="packages-tab active" data-tab="lessons">Lessons Only</button><button class="packages-tab" data-tab="intensive">Intensive (+ Rental)</button></div><div class="packages-grid"></div></div><div class="package-modal" role="dialog" aria-modal="true"><div class="package-modal-content"><button class="package-modal-close" type="button" aria-label="Close">×</button><div class="package-modal-info"><h3></h3><p>A professional training course at our Dahab station with modern RRD equipment and experienced instructors.</p><ul class="package-modal-list"></ul><button class="package-btn package-primary package-modal-book" type="button">Book</button></div><div class="package-modal-image"></div></div></div></section>`;
  const grid=mount.querySelector('.packages-grid'),modal=mount.querySelector('.package-modal');let current='lessons';
  const scrollForm=()=>document.querySelector('#vf-en-contact-root')?.scrollIntoView({behavior:'smooth',block:'start'});
  const close=()=>{modal.classList.remove('active');document.body.style.overflow=''};
  const open=i=>{const p=data[current][i];mount.querySelector('.package-modal-info h3').textContent=`Course: ${p[0]}`;mount.querySelector('.package-modal-image').style.backgroundImage=`url('${asset(p[5])}')`;mount.querySelector('.package-modal-list').innerHTML=p[4].map(x=>`<li>${x}</li>`).join('');modal.classList.add('active');document.body.style.overflow='hidden'};
  const render=()=>{grid.innerHTML=data[current].map((p,i)=>`<article class="package-card" style="animation-delay:${i*.05}s"><div class="package-thumb"><img src="${asset(p[5])}" alt="${p[0]}" loading="lazy" decoding="async"></div><div class="package-body"><span class="package-badge">${p[3]}</span><h3>${p[0]}</h3><ul class="package-inc">${p[4].map(x=>`<li>${x}</li>`).join('')}</ul><div class="package-price"><span class="package-num">${p[1]}</span><span class="package-cur">$</span></div><span class="package-save">${p[2]?`Savings: $${p[2]}`:'&nbsp;'}</span><div class="package-actions"><button class="package-btn package-primary" data-choose type="button">Book</button><button class="package-btn package-ghost" data-details="${i}" type="button">Details</button></div></div></article>`).join('');grid.querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',scrollForm));grid.querySelectorAll('[data-details]').forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.details))))};
  mount.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{mount.querySelector('.packages-tab.active').classList.remove('active');b.classList.add('active');current=b.dataset.tab;render()}));
  mount.querySelector('.package-modal-close').addEventListener('click',close);mount.querySelector('.package-modal-book').addEventListener('click',()=>{close();scrollForm()});modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close()});render();
})();
