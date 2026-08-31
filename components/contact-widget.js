(() => {
  if (document.querySelector('.vf-booking-widget')) return;

  const scriptRoot = new URL('../', document.currentScript.src);
  const isRussian = document.documentElement.lang === 'ru';
  const label = isRussian ? 'Записаться' : 'Book now';
  const localTarget = isRussian ? '#booking-form' : '#booking-form-en';
  const homeTarget = new URL(isRussian ? `ru/${localTarget}` : localTarget, scriptRoot).href;

  const style = document.createElement('style');
  style.textContent = `
    .vf-booking-widget{position:fixed;right:22px;bottom:22px;z-index:1200;display:flex;align-items:center;flex-direction:row-reverse;filter:drop-shadow(0 7px 16px rgba(0,0,0,.28));font-family:"Raleway",Arial,sans-serif}
    .vf-booking-widget__button{width:62px;height:62px;flex:0 0 62px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;transition:transform .2s ease,filter .2s ease}
    .vf-booking-widget__button:hover{transform:translateY(-2px);filter:brightness(1.05)}
    .vf-booking-widget__button:active{transform:translateY(0) scale(.97)}
    .vf-booking-widget__button:focus-visible{outline:3px solid #fff;outline-offset:3px}
    .vf-booking-widget__button img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover}
    .vf-booking-widget__label{position:relative;display:flex;min-height:38px;align-items:center;margin-right:10px;padding:0 17px;background:rgba(25,25,25,.94);color:#fff;font-size:14px;font-weight:600;line-height:1;white-space:nowrap;box-shadow:0 5px 14px rgba(0,0,0,.22)}
    .vf-booking-widget__label::after{content:"";position:absolute;right:-7px;top:50%;width:0;height:0;transform:translateY(-50%);border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(25,25,25,.94)}
    @media(max-width:640px){.vf-booking-widget{right:12px;bottom:max(12px,env(safe-area-inset-bottom));filter:drop-shadow(0 5px 12px rgba(0,0,0,.28))}.vf-booking-widget.is-above-mobile-cta{bottom:78px}.vf-booking-widget__button{width:54px;height:54px;flex-basis:54px}.vf-booking-widget__label{min-height:34px;margin-right:8px;padding:0 13px;font-size:12px}}
    @media(prefers-reduced-motion:reduce){.vf-booking-widget__button{transition:none}}
  `;

  const widget = document.createElement('div');
  widget.className = 'vf-booking-widget';
  if (document.querySelector('.seo-mobile-cta')) widget.classList.add('is-above-mobile-cta');
  widget.innerHTML = `<button class="vf-booking-widget__button" type="button" aria-label="${label}"><img src="${new URL('assets/contact-widget-icon.png', scriptRoot).href}" alt="" width="108" height="112"></button><span class="vf-booking-widget__label" aria-hidden="true">${label}</span>`;

  widget.querySelector('button').addEventListener('click', () => {
    const target = document.querySelector(localTarget);
    if (target) {
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', localTarget);
      target.querySelector('input')?.focus({ preventScroll: true });
      return;
    }
    location.href = homeTarget;
  });

  document.head.append(style);
  document.body.append(widget);
})();
