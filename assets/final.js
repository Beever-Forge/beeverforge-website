const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');
const locale = document.documentElement.lang;
const analyticsId = 'G-JH25XRDJHG';
const analyticsConsentKey = 'beeverforge-analytics-consent';
const labels = {
  en: { open: 'Open menu', close: 'Close menu', light: 'Switch to light mode', dark: 'Switch to dark mode', lightText: 'Light mode', darkText: 'Dark mode' },
  es: { open: 'Abrir menú', close: 'Cerrar menú', light: 'Cambiar al modo claro', dark: 'Cambiar al modo oscuro', lightText: 'Modo claro', darkText: 'Modo oscuro' },
  'pt-BR': { open: 'Abrir menu', close: 'Fechar menu', light: 'Mudar para o modo claro', dark: 'Mudar para o modo escuro', lightText: 'Modo claro', darkText: 'Modo escuro' },
};
const words = labels[locale] || labels.en;
const consentPanel = document.querySelector('[data-consent-panel]');
const consentOpen = document.querySelector('[data-consent-open]');
const consentAccept = document.querySelector('[data-consent-accept]');
const consentReject = document.querySelector('[data-consent-reject]');
const consentDetails = document.querySelector('[data-consent-details]');
const consentDetailsToggle = document.querySelector('[data-consent-details-toggle]');
const analyticsToggle = document.querySelector('[data-analytics-toggle]');
const consentSave = document.querySelector('[data-consent-save]');
const consentCancel = document.querySelector('[data-consent-cancel]');
let consentReturnFocus = null;
const readAnalyticsConsent = () => {
  try { return localStorage.getItem(analyticsConsentKey); } catch { return null; }
};
const saveAnalyticsConsent = (value) => {
  try { localStorage.setItem(analyticsConsentKey, value); } catch {}
};
const loadGoogleAnalytics = () => {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('config', analyticsId);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);
};
const showConsentPanel = (showDetails = false) => {
  if (!consentPanel) return;
  if (!consentPanel.contains(document.activeElement)) {
    consentReturnFocus = document.activeElement === document.body ? null : document.activeElement;
  }
  consentPanel.hidden = false;
  if (analyticsToggle) analyticsToggle.checked = readAnalyticsConsent() === 'accepted';
  if (consentDetails) consentDetails.hidden = !showDetails;
  consentDetailsToggle?.setAttribute('aria-expanded', String(showDetails));
  if (showDetails) analyticsToggle?.focus();
};
const hideConsentPanel = () => {
  const focusedInPanel = consentPanel?.contains(document.activeElement);
  if (consentPanel) consentPanel.hidden = true;
  if (consentReturnFocus?.isConnected) consentReturnFocus.focus({ preventScroll: true });
  else if (focusedInPanel) document.activeElement.blur();
  consentReturnFocus = null;
};
const applyAnalyticsConsent = (accepted) => {
  saveAnalyticsConsent(accepted ? 'accepted' : 'rejected');
  if (accepted) loadGoogleAnalytics();
  else {
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    clearAnalyticsCookies();
  }
  hideConsentPanel();
};
const clearAnalyticsCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (/^_ga(?:_|$)/.test(name)) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.beeverforge.com; SameSite=Lax`;
    }
  });
};
const savedAnalyticsConsent = readAnalyticsConsent();
if (savedAnalyticsConsent === 'accepted') loadGoogleAnalytics();
else if (!savedAnalyticsConsent) showConsentPanel();
consentAccept?.addEventListener('click', () => {
  applyAnalyticsConsent(true);
});
consentReject?.addEventListener('click', () => {
  applyAnalyticsConsent(false);
});
consentDetailsToggle?.addEventListener('click', () => {
  const showDetails = consentDetails?.hidden ?? true;
  if (consentDetails) consentDetails.hidden = !showDetails;
  consentDetailsToggle.setAttribute('aria-expanded', String(showDetails));
  if (showDetails) analyticsToggle?.focus();
});
consentSave?.addEventListener('click', () => applyAnalyticsConsent(Boolean(analyticsToggle?.checked)));
consentCancel?.addEventListener('click', () => showConsentPanel(false));
consentOpen?.addEventListener('click', () => showConsentPanel(true));
try {
  if (sessionStorage.getItem('beeverforge-lead-submitted') === '1') {
    sessionStorage.removeItem('beeverforge-lead-submitted');
    if (readAnalyticsConsent() === 'accepted') window.gtag?.('event', 'generate_lead', { form_name: 'Enterprise inquiry' });
  }
} catch {}
if (menuButton && menu) {
  const close = () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', words.open);
  };
  menuButton.setAttribute('aria-label', words.open);
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? words.close : words.open);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) { close(); menuButton.focus(); }
  });
}
const themeButton = document.querySelector('[data-theme-toggle]');
const updateTheme = () => {
  const light = document.documentElement.dataset.theme === 'light';
  themeButton?.setAttribute('aria-label', light ? words.dark : words.light);
  themeButton?.setAttribute('aria-pressed', String(light));
  const text = themeButton?.querySelector('[data-theme-label]');
  if (text) text.textContent = light ? words.darkText : words.lightText;
  document.querySelectorAll('img[src="/assets/logo-dark.svg"],img[src="/assets/logo-light.svg"]').forEach((img) => {
    img.src = light ? '/assets/logo-light.svg' : '/assets/logo-dark.svg';
  });
};
updateTheme();
themeButton?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('beeverforge-theme', theme); } catch {}
  updateTheme();
});
const languagePicker = document.querySelector('[data-language]');
languagePicker?.addEventListener('change', () => {
  window.location.assign(languagePicker.value + window.location.hash);
});
