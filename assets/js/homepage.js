(() => {
  document.getElementById('yearNow').textContent = new Date().getFullYear();
  const heroSlides = Array.from(document.querySelectorAll('[data-hero-slideshow] .hero-slide'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const activateHeroSlide = (index) => {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      if (slide.tagName === 'VIDEO') {
        if (i === index && !reduceMotion) {
          slide.currentTime = 0;
          const playback = slide.play();
          if (playback && typeof playback.catch === 'function') playback.catch(() => {});
        } else {
          slide.pause();
          try { slide.currentTime = 0; } catch (_) {}
        }
      }
    });
  };
  if (heroSlides.length > 1 && !reduceMotion) {
    let activeSlide = 0;
    activateHeroSlide(activeSlide);
    window.setInterval(() => {
      activeSlide = (activeSlide + 1) % heroSlides.length;
      activateHeroSlide(activeSlide);
    }, 4800);
  }
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    document.body.classList.add('reduce-motion');
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: .85, stagger: .1, ease: 'power3.out', delay: .12 });
  gsap.from('.hero-visual', { y: 45, opacity: 0, rotateY: -7, duration: 1.1, ease: 'power3.out', delay: .2 });
  gsap.to('.hero-image', { yPercent: 7, rotateZ: -1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.hero-copy', { y: -55, opacity: .45, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.utils.toArray('.reveal:not(.service-card)').forEach((el, i) => {
    gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .9, delay: (i % 3) * .09, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });
  gsap.fromTo('.manifesto h2', { rotateX: 12, y: 65, opacity: 0, transformOrigin: '50% 100%' }, { rotateX: 0, y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto', start: 'top 70%', once: true } });
  gsap.to('.academy-photo', { rotateY: -4, yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.academy', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.utils.toArray('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      gsap.to(card, { rotateY: x * 5, rotateX: y * -4, transformPerspective: 900, duration: .35, ease: 'power2.out' });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .5, ease: 'power3.out' }));
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();