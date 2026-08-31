(() => {
  const root = document.documentElement;
  const key = 'vogue-theme';
  const apply = value => {
    if (value === 'light' || value === 'dark') root.dataset.theme = value;
    else delete root.dataset.theme;
    document.querySelectorAll('[data-vogue-theme-toggle]').forEach(btn => {
      const current = root.dataset.theme || 'auto';
      btn.setAttribute('aria-label', `Theme: ${current}`);
      btn.textContent = current === 'auto' ? 'Auto' : current[0].toUpperCase() + current.slice(1);
    });
  };
  try { apply(localStorage.getItem(key) || 'auto'); } catch (_) { apply('auto'); }
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-vogue-theme-toggle]');
    if (!btn) return;
    const current = root.dataset.theme || 'auto';
    const next = current === 'auto' ? 'dark' : current === 'dark' ? 'light' : 'auto';
    try { next === 'auto' ? localStorage.removeItem(key) : localStorage.setItem(key, next); } catch (_) {}
    apply(next);
  });
  const media = matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener?.('change', () => { if (!localStorage.getItem(key)) apply('auto'); });

  const initMotion = () => {
    if (window.gsap && window.ScrollTrigger && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.vogue-hero > *', {y: 45, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out'});
      gsap.utils.toArray('.vogue-section,.vogue-feature,.vogue-duality,.vogue-quote,.vogue-final').forEach(el => {
        gsap.from(el, {y: 45, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger:{trigger:el,start:'top 82%',once:true}});
      });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion); else initMotion();
})();
