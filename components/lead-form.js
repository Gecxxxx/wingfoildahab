(() => {
  const API_BASE = 'https://wingfoildahab.eggetsevich.workers.dev';
  const isRussian = () => document.documentElement.lang === 'ru';

  const enhanceForm = form => {
    const name = form.elements.name;
    const email = form.elements.email;
    const contact = form.elements.contact;
    const success = form.querySelector('.remain-success');
    const button = form.querySelector('[type="submit"],button:not([type])');

    if (name) {
      name.required = true;
      name.autocomplete = 'name';
      const label = name.closest('label');
      if (label && !label.querySelector('.remain-required')) {
        label.insertAdjacentHTML('afterbegin', '<span class="remain-required" aria-hidden="true">* </span>');
      }
    }

    if (email) {
      email.required = false;
      email.autocomplete = 'email';
      const label = email.closest('label');
      if (label && !label.querySelector('.remain-optional')) {
        email.insertAdjacentHTML('beforebegin', ` <span class="remain-optional">${isRussian() ? '(необязательно)' : '(optional)'}</span>`);
      }
    }

    if (contact) {
      contact.required = true;
      contact.autocomplete = 'tel';
      if (!contact.closest('label')) {
        const label = document.createElement('label');
        label.className = 'remain-contact-label';
        label.innerHTML = `<span><span class="remain-required" aria-hidden="true">* </span>${isRussian() ? 'Телефон или имя пользователя' : 'Phone number or username'}</span>`;
        contact.before(label);
        label.append(contact);
      }
    }

    if (success) {
      success.setAttribute('role', 'status');
      success.setAttribute('aria-live', 'polite');
    }
    if (button) button.type = 'submit';
  };

  const init = () => document.querySelectorAll('.remain-form form').forEach(form => {
    if (form.dataset.leadReady) return;
    form.dataset.leadReady = 'true';
    enhanceForm(form);
    form.addEventListener('submit', async event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!form.reportValidity()) return;

      const button = form.querySelector('[type="submit"]');
      const success = form.querySelector('.remain-success');
      const original = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = isRussian() ? 'Отправляем…' : 'Sending…';
      }

      try {
        const data = Object.fromEntries(new FormData(form));
        const response = await fetch(`${API_BASE}/api/lead`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, page: location.href }),
        });
        if (!response.ok) throw new Error('lead_failed');
        success?.classList.add('active');
        form.reset();
      } catch {
        alert(isRussian()
          ? 'Не удалось отправить заявку. Напишите нам в Telegram или WhatsApp.'
          : 'Could not send your request. Please contact us via Telegram or WhatsApp.');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = original;
        }
      }
    }, true);
  });

  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
  init();
})();
