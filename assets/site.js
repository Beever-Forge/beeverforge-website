document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = document.querySelector(button.dataset.menu);
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
