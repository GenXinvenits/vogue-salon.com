(() => {
  /*
   * Vogue Instagram lookbook.
   * Uses the actual media files stored in this repository so the gallery
   * does not depend on Instagram's embed script or cookies.
   */
  const media = [
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0001.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/reel/DSsELI4kjQ-/', label: 'REEL', title: 'The Vogue beauty edit' },
    { type: 'image', src: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/p/DeznCZvkrGn/', label: 'FROM INSTAGRAM', title: 'A Vogue moment' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0002.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0002.jpg', href: 'https://www.instagram.com/reel/DQ1lxajko-j/', label: 'REEL', title: 'Behind the look' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0003.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0003.jpg', href: 'https://www.instagram.com/reel/Dd6eHGaoyIK/', label: 'REEL', title: 'Beauty in motion' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0004.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/reel/DdjMAiUoppC/', label: 'REEL', title: 'The finishing touch' },
    { type: 'image', src: '/assets/img/insta/voguesalon_tarntaran-20261025-0003.jpg', href: 'https://www.instagram.com/p/DbIXj_QGf5C/', label: 'FROM INSTAGRAM', title: 'Beauty details' }
  ];

  document.querySelectorAll('[data-instagram-feed]').forEach(feed => {
    feed.replaceChildren();
    feed.classList.add('instagram-feed-local');
    media.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'instagram-tile' + (index === 0 ? ' instagram-tile-feature' : '');

      let visual;
      if (item.type === 'video') {
        visual = document.createElement('video');
        visual.src = item.src;
        if (item.poster) visual.poster = item.poster;
        visual.muted = true;
        visual.loop = true;
        visual.autoplay = true;
        visual.playsInline = true;
        visual.preload = index < 3 ? 'metadata' : 'none';
        visual.controls = true;
        visual.setAttribute('aria-label', item.title);
      } else {
        visual = document.createElement('img');
        visual.src = item.src;
        visual.alt = item.title;
        visual.loading = 'lazy';
      }
      visual.classList.add('instagram-media-visual');
      card.append(visual);

      const overlay = document.createElement('a');
      overlay.className = 'instagram-tile-overlay';
      overlay.href = item.href;
      overlay.target = '_blank';
      overlay.rel = 'noopener noreferrer';
      overlay.innerHTML = '<small>' + item.label + '</small><strong>' + item.title + '</strong><b>View on Instagram ↗</b>';
      card.append(overlay);

      const type = document.createElement('span');
      type.className = 'instagram-type';
      type.setAttribute('aria-hidden', 'true');
      type.textContent = item.type === 'video' ? '▶' : '◎';
      card.append(type);
      feed.append(card);
    });
  });
})();