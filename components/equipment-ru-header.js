(() => {
  const mount=document.getElementById('vf-equipment-header-root');if(!mount)return;
  const root=new URL('../',document.currentScript.src);
  const asset=name=>new URL(`assets/header/${name}`,root).href;
  const route=path=>new URL(path,root).href;
  const designStyle=document.createElement('link');
  designStyle.rel='stylesheet';
  designStyle.href=route('components/design-system.css');
  document.head.append(designStyle);
  const menu=[[route('ru/#learning'),'Обучение'],[route('equipment-ru/'),'Снаряжение'],[route('ru/#forecast'),'Прогноз'],[route('ru/#team'),'Команда'],[route('blog-ru/'),'Блог'],[route('ru/#faq'),'ЧЗВ'],[route('organizers-ru/'),'Организаторам'],['https://vetratoria.ru/ru','Виндсерфинг','special']];
  const links=menu.map(([href,text,extra=''])=>`<a href="${href}" class="vf-nav-link ${extra}">${text}</a>`).join('');
  const socials=`<a class="vf-ico" href="https://t.me/wingfoil_center" target="_blank" rel="noopener"><img src="${asset('telegram.png')}" alt="Telegram"></a><a class="vf-ico" href="https://wa.me/201151015941" target="_blank" rel="noopener"><img src="${asset('whatsapp.png')}" alt="WhatsApp"></a><a class="vf-ico" href="https://www.instagram.com/vetratoriaofficiale/" target="_blank" rel="noopener"><img src="${asset('instagram.png')}" alt="Instagram"></a>`;
  mount.innerHTML=`<header id="vf-fixed-menu"><div class="vf-desk-wrap"><a class="vf-desk-logo" href="${route('ru/')}"><img src="${asset('logo-ru.png')}" alt="Ветратория"></a><nav class="vf-desk-nav"><div class="vf-desk-nav-inner">${links}</div></nav><div class="vf-desk-right"><div class="vf-social">${socials}</div><div class="vf-lang-switcher"><a href="${route('equipment/')}" class="vf-lang-btn">EN</a><a href="${route('equipment-ru/')}" class="vf-lang-btn active">РУС</a></div><button class="vf-burger" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button></div></div></header><div class="vf-panel" aria-hidden="true"><div class="vf-panel-inner"><div class="vf-panel-logo"><img src="${asset('logo-ru.png')}" alt="Ветратория"></div><nav class="vf-nav">${links}</nav><div class="vf-m-social">${socials}</div></div></div>`;
  const burger=mount.querySelector('.vf-burger'),panel=mount.querySelector('.vf-panel');
  const close=()=>{panel.classList.remove('vf-open');panel.setAttribute('aria-hidden','true');burger.classList.remove('vf-active');burger.setAttribute('aria-expanded','false');document.body.style.overflow=''};
  burger.addEventListener('click',()=>{const open=panel.classList.toggle('vf-open');panel.setAttribute('aria-hidden',String(!open));burger.classList.toggle('vf-active',open);burger.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
  panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
})();
