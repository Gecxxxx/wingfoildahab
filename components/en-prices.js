(() => {
  const mount=document.getElementById('vf-en-prices-root');
  if(!mount)return;
  const root=new URL('../',document.currentScript.src);
  const asset=name=>new URL(`assets/prices/${name}`,root).href;
  const items=[
    ['price-01.jpg','Private Lesson','Lesson / 1 hour','70','$','Intensive one-to-one training. RRD equipment, a radio helmet for instant coaching and a wetsuit are included.'],
    ['price-02.png','Wave Riding','Advanced / 1 hour','70','$','Ride Dahab’s reef waves with an instructor who will show you the best lines and teach foil carving without relying on wing power.'],
    ['price-03.png','Group Lesson','2 People / 1 hour','55','$/pp','Price per person. A great option for couples or friends of a similar level who want to learn together.'],
    ['price-04.jpg','Daggerboard Set','Rental / 1 hour','25','$','A stable beginner set with a large daggerboard and wing, ideal for practicing wing control before moving to a foil.'],
    ['price-05.jpg','Boat-Foil Towing','Training / 30 min','60','$','The fastest way to feel foil flight. Thirty focused minutes behind the boat can save hours of trial and error.'],
    ['price-06.jpg','Full Foil Set','Rental / 1 hour','45','$','Premium RRD equipment including modern boards, lightweight wings and carbon foils. Rescue service and equipment insurance are included.'],
  ];
  mount.innerHTML=`<section class="wing-price-record uc-price" id="classes-packages"><div class="wing-price-list"><div class="price-wrap"><span class="price-kicker">Training & Rental</span><h2>Price List</h2><div class="price-grid">${items.map((item,index)=>`<article class="price-card"><div class="price-thumb"><img src="${asset(item[0])}" alt="${item[1]}" loading="lazy" decoding="async"></div><div class="price-body"><h3>${item[1]}</h3><span class="price-meta">${item[2]}</span><div class="price-box"><span class="price-num">${item[3]}</span><span class="price-cur">${item[4]}</span></div><div class="price-actions"><a href="#contacts" class="price-btn price-btn--primary">Book</a><button class="price-btn price-btn--ghost" type="button" data-price="${index}">Details</button></div></div></article>`).join('')}</div><div class="price-cta"><p class="price-footnote">Lesson price includes equipment, insurance, helmet and life jacket.</p><a class="price-equipment-link" href="../equipment/">View all equipment rental prices</a></div></div><div class="price-modal-overlay"><div class="price-modal-content"><button class="price-modal-close" type="button" aria-label="Close">×</button><div class="price-modal-image"></div><div class="price-modal-info"><h3></h3><span class="price-modal-meta"></span><p class="price-modal-text"></p><div class="price-actions"><a href="#contacts" class="price-btn price-btn--primary">Book</a><button class="price-btn price-btn--ghost" type="button" data-close>Close</button></div></div></div></div></div></section>`;
  const overlay=mount.querySelector('.price-modal-overlay');
  const close=()=>{overlay.classList.remove('active');document.body.style.overflow=''};
  const open=index=>{const item=items[index];mount.querySelector('.price-modal-image').style.backgroundImage=`url('${asset(item[0])}')`;mount.querySelector('.price-modal-info h3').textContent=item[1];mount.querySelector('.price-modal-meta').textContent=item[2];mount.querySelector('.price-modal-text').textContent=item[5];overlay.classList.add('active');document.body.style.overflow='hidden'};
  mount.querySelectorAll('[data-price]').forEach(button=>button.addEventListener('click',()=>open(Number(button.dataset.price))));
  mount.querySelectorAll('[data-close],.price-modal-close').forEach(button=>button.addEventListener('click',close));
  mount.querySelector('.price-modal-content a[href="#contacts"]').addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
})();
