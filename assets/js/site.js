(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const menu = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const favicon = document.getElementById('siteFavicon');
    if (favicon) favicon.href = theme === 'dark' ? '/assets/img/logo-white.png' : '/assets/img/logo-black.png';
    if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#171319' : '#f8f5f8';
  };

  // Follow the device appearance by default and whenever its preference changes.
  applyTheme(systemTheme.matches ? 'dark' : 'light');
  if (typeof systemTheme.addEventListener === 'function') {
    systemTheme.addEventListener('change', event => applyTheme(event.matches ? 'dark' : 'light'));
  } else if (typeof systemTheme.addListener === 'function') {
    systemTheme.addListener(event => applyTheme(event.matches ? 'dark' : 'light'));
  }

  // Keep the existing toggle available for a temporary manual switch.
  if (toggle) toggle.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

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