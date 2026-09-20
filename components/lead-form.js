(() => {
  const API_BASE = 'https://wingfoildahab.eggetsevich.workers.dev';
  const isRussian = () => document.documentElement.lang === 'ru';
  const siteRoot = new URL('../', document.currentScript.src);
  const serviceLabels = {
    'wingfoil-lesson': { ru: 'Урок вингфойла', en: 'Wingfoil lesson' },
    'organizer-camp': { ru: 'Условия для организаторов', en: 'Camp for organizers' },
    'equipment-rental': { ru: 'Прокат снаряжения', en: 'Equipment rental' },
    'transfer': { ru: 'Трансфер из аэропорта', en: 'Airport transfer' },
  };

  const localizedService = value => {
    const item = serviceLabels[value];
    return item ? item[isRussian() ? 'ru' : 'en'] : value;
  };

  const serviceFromPage = () => {
    const query = new URLSearchParams(location.search).get('service');
    if (query) return localizedService(query);
    if (/^\/equipment(?:-ru)?\//.test(location.pathname)) return localizedService('equipment-rental');
    return sessionStorage.getItem('vfBookingService') || '';
  };

  const setService = value => {
    const service = localizedService(value || '');
    if (!service) return;
    sessionStorage.setItem('vfBookingService', service);
    document.querySelectorAll('.remain-form form').forEach(form => {
      let input = form.elements.service;
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'service';
        form.append(input);
      }
      input.value = service;
      const summary = form.querySelector('.remain-selection');
      if (summary) {
        summary.textContent = `${isRussian() ? 'Вы выбрали' : 'Selected'}: ${service}`;
        summary.hidden = false;
      }
    });
  };

  const enhanceForm = form => {
    const name = form.elements.name;
    const contact = form.elements.contact;
    const success = form.querySelector('.remain-success');
    const button = form.querySelector('[type="submit"],button:not([type])');

    if (!form.querySelector('.remain-selection')) {
      const summary = document.createElement('p');
      summary.className = 'remain-selection';
      summary.hidden = true;
      (success || form.firstElementChild)?.after(summary);
    }

    if (name) {
      name.required = true;
      name.autocomplete = 'name';
      const label = name.closest('label');
      if (label && !label.querySelector('.remain-required')) {
        label.insertAdjacentHTML('afterbegin', '<span class="remain-required" aria-hidden="true">* </span>');
      }
    }

    if (contact) {
      contact.required = true;
      contact.autocomplete = 'tel';
      contact.type = 'tel';
      contact.inputMode = 'tel';
      const contactLabel = contact.closest('label');
      if (contactLabel && !contactLabel.querySelector('.remain-required')) {
        contactLabel.insertAdjacentHTML('afterbegin', '<span class="remain-required" aria-hidden="true">* </span>');
      } else if (!contactLabel) {
        const label = document.createElement('label');
        label.className = 'remain-contact-label';
        label.innerHTML = `<span><span class="remain-required" aria-hidden="true">* </span>${isRussian() ? 'Номер WhatsApp или Telegram' : 'WhatsApp or Telegram number'}</span>`;
        contact.before(label);
        label.append(contact);
      }
    }

    if (!form.querySelector('[name="consent"]')) {
      const consent = document.createElement('label');
      consent.className = 'remain-consent';
      const policyUrl = new URL(isRussian() ? 'privacy-ru/' : 'privacy/', siteRoot).href;
      consent.innerHTML = `<input type="checkbox" name="consent" value="accepted" required><span>${isRussian()
        ? `Я согласен(а) на <a href="${policyUrl}" target="_blank" rel="noopener">обработку персональных данных</a>`
        : `I agree to the <a href="${policyUrl}" target="_blank" rel="noopener">processing of my personal data</a>`}</span>`;
      const honeypot = form.querySelector('.remain-honeypot');
      (honeypot || button)?.before(consent);
    }

    if (success) {
      success.dataset.successText = success.textContent;
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
      success?.classList.remove('active', 'error');
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
        if (success) {
          success.textContent = success.dataset.successText;
          success.setAttribute('role', 'status');
          success.classList.add('active');
        }
        window.ym?.(102297934, 'reachGoal', 'lead_sent');
        form.reset();
        setService(serviceFromPage());
      } catch {
        if (success) {
          success.textContent = isRussian()
            ? 'Не удалось отправить. Напишите нам напрямую в Telegram или WhatsApp.'
            : 'Could not send your request. Please contact us directly via Telegram or WhatsApp.';
          success.classList.add('active', 'error');
          success.setAttribute('role', 'alert');
        }
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = original;
        }
      }
    }, true);
  });

  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-booking-service]');
    if (trigger) setService(trigger.dataset.bookingService);
  }, true);
  init();
  setService(serviceFromPage());
})();
