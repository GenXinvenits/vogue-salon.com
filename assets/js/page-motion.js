window.addEventListener('load', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.motion-in').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  if (!window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll('.motion-in').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.page-hero h1', { y: 34, opacity: 0, duration: .85, ease: 'power3.out' });
  gsap.from('.page-intro', { y: 22, opacity: 0, duration: .7, delay: .12, ease: 'power3.out' });
  gsap.utils.toArray('.motion-in').forEach((el, i) => {
    gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .75, delay: (i % 3) * .06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
});