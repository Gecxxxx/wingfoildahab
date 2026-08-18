(() => {
  const mount=document.getElementById('vf-equipment-products-root');if(!mount)return;
  const root=new URL('../',document.currentScript.src);
  const products=[
    {image:'standard-evo-wing-y29.webp',name:'Evo Wing Y29',tags:'FREERIDE / FREESTYLE / SURF',description:'Универсальный винг из коллекции Y29 (2024). Обеспечивает максимально комфортное и стабильное катание в любых условиях.',label:'В НАЛИЧИИ (МЕТРЫ):',sizes:'2.5 / 3.0 / 3.5 / 4.0 / 4.5 / 5.0 / 5.5 / 6.0'},
    {image:'standard-air-wing-y29.webp',name:'Air Wing Y29',tags:'SCHOOL / BEGINNERS',description:'Идеальный выбор для обучения. Специальная форма профиля предотвращает зацепы воды краями крыла, упрощая первые шаги.',label:'В НАЛИЧИИ (МЕТРЫ):',sizes:'3.0 / 4.0 / 5.0 / 6.0'},
    {image:'standard-wind-wing-y27.webp',name:'Wind Wing Y27',tags:'WAVE / FREESTYLE / LIGHTWEIGHT',description:'Легкое крыло с мягкими ручками. Отлично подходит как для обучения за счет малого веса, так и для катания по волнам.',label:'В НАЛИЧИИ (МЕТРЫ):',sizes:'2.8 / 3.5 / 4.0 / 4.5 / 5.0 / 5.5 / 6.0'},
    {image:'standard-beluga-y30-lte.webp',name:'RRD Beluga Y30 LTE',tags:'RIGID BOARD / COLLECTION Y30',description:'Жесткая композитная доска последнего поколения. Идеальный баланс и контроль для уверенных райдеров.',label:'В НАЛИЧИИ (ЛИТРЫ):',sizes:'75 / 80 / 85 / 92 / 105 / 125 / 145 L'},
    {image:'standard-beluga-y26-lte.webp',name:'RRD Beluga Y26 LTE',tags:'RIGID BOARD / COLLECTION Y26',description:'Проверенная временем жесткая доска. Стабильная форма, подходящая для прогрессирующих вингфойлеров.',label:'В НАЛИЧИИ (ЛИТРЫ):',sizes:'75 / 90 / 105 L'},
    {image:'standard-air-beluga-pro-y27.webp',name:'Air Beluga Pro Y27',tags:'INFLATABLE / PERFORMANCE',description:'Надувная доска для продвинутого уровня. Отлично подходит для путешествий и фрирайда без прыжков.',label:'В НАЛИЧИИ (ЛИТРЫ):',sizes:'60 / 70 / 80 / 90 / 100 L'}
  ];
  const image=name=>new URL(`assets/equipment-products/${name}`,root).href;
  mount.innerHTML=`<section class="equipment-products"><div class="equipment-products__container"><h2>Стандартное оборудование</h2><div class="equipment-products__grid">${products.map((product,index)=>`<article class="equipment-card"><div class="equipment-card__image"><img src="${image(product.image)}" alt="${product.name}" loading="${index<3?'eager':'lazy'}" decoding="async"></div><div class="equipment-card__info"><h3>${product.name}</h3><p class="equipment-card__tags">${product.tags}</p><p class="equipment-card__description">${product.description}</p><div class="equipment-card__footer"><strong>${product.label}</strong><span>${product.sizes}</span></div></div></article>`).join('')}</div></div></section>`;
})();
