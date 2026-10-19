const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');
const locale = document.documentElement.lang;
const labels = {
  en: { open: 'Open menu', close: 'Close menu', light: 'Switch to light mode', dark: 'Switch to dark mode', lightText: 'Light mode', darkText: 'Dark mode' },
  es: { open: 'Abrir menú', close: 'Cerrar menú', light: 'Cambiar al modo claro', dark: 'Cambiar al modo oscuro', lightText: 'Modo claro', darkText: 'Modo oscuro' },
  'pt-BR': { open: 'Abrir menu', close: 'Fechar menu', light: 'Mudar para o modo claro', dark: 'Mudar para o modo escuro', lightText: 'Modo claro', darkText: 'Modo escuro' },
};
const words = labels[locale] || labels.en;
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
