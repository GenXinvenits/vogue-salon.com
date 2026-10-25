(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const menu = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#171319' : '#f8f5f8';
    try { localStorage.setItem('vogue-theme', theme); } catch (_) {}
  };
  try {
    const saved = localStorage.getItem('vogue-theme');
    if (saved === 'dark' || saved === 'light') applyTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
  } catch (_) {}
  if (toggle) toggle.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const serviceMenu = document.querySelector('.nav-service-menu');
  if (serviceMenu) {
    let closeTimer;
    const cancelClose = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = undefined;
      }
    };
    const openMenu = () => {
      cancelClose();
      serviceMenu.classList.add('is-open');
    };
    const scheduleClose = () => {
      cancelClose();
      closeTimer = window.setTimeout(() => {
        serviceMenu.classList.remove('is-open');
        closeTimer = undefined;
      }, 800);
    };

    serviceMenu.addEventListener('pointerenter', openMenu);
    serviceMenu.addEventListener('pointerleave', scheduleClose);
    serviceMenu.addEventListener('focusin', openMenu);
    serviceMenu.addEventListener('focusout', event => {
      if (!serviceMenu.contains(event.relatedTarget)) scheduleClose();
    });

    document.addEventListener('click', event => {
      if (!serviceMenu.contains(event.target)) {
        cancelClose();
        serviceMenu.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        cancelClose();
        serviceMenu.classList.remove('is-open');
      }
    });
  }

  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.textContent = open ? '×' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = '☰';
    }));
  }
})();