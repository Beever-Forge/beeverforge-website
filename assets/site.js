document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = document.querySelector(button.dataset.menu);
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  const menu = document.querySelector(button.dataset.menu);
  const close = () => {
    menu.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
  };
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) { close(); button.focus(); }
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-inquiry-form]').forEach((form) => {
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');
  const endpoint = form.dataset.endpoint;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!endpoint || endpoint.includes('.PENDING.')) {
      status.textContent = form.dataset.unavailableMessage || 'The inquiry form is being prepared. Please email contact@beeverforge.com.';
      status.dataset.state = 'error';
      return;
    }

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.source = form.dataset.source;
    submit.disabled = true;
    status.textContent = form.dataset.pendingMessage || 'Sending your inquiry…';
    status.dataset.state = 'pending';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Inquiry request failed');
      try { sessionStorage.setItem('beeverforge-lead-submitted', '1'); } catch {}
      window.location.assign(form.dataset.successUrl || '/thank-you/');
    } catch {
      status.textContent = form.dataset.errorMessage || 'We could not send your inquiry. Please try again or email contact@beeverforge.com.';
      status.dataset.state = 'error';
      submit.disabled = false;
    }
  });
});
