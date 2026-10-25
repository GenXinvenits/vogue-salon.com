(() => {
  /*
   * Vogue Instagram lookbook.
   * Displays every Instagram media file currently stored in this repository.
   * The gallery uses local files to avoid depending on Instagram embeds/cookies.
   */
  const profile = 'https://www.instagram.com/voguesalon_tarntaran/';
  const media = [
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0001.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/reel/DSsELI4kjQ-/', label: 'REEL', title: 'The Vogue beauty edit' },
    { type: 'image', src: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/p/DeznCZvkrGn/', label: 'FROM INSTAGRAM', title: 'A Vogue moment' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0002.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0002.jpg', href: 'https://www.instagram.com/reel/DQ1lxajko-j/', label: 'REEL', title: 'Behind the look' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0003.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0003.jpg', href: 'https://www.instagram.com/reel/Dd6eHGaoyIK/', label: 'REEL', title: 'Beauty in motion' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0004.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: 'https://www.instagram.com/reel/DdjMAiUoppC/', label: 'REEL', title: 'The finishing touch' },
    { type: 'image', src: '/assets/img/insta/voguesalon_tarntaran-20261025-0003.jpg', href: 'https://www.instagram.com/p/DbIXj_QGf5C/', label: 'FROM INSTAGRAM', title: 'Beauty details' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0005.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0002.jpg', href: profile, label: 'REEL', title: 'Vogue in motion 05' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0006.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0003.jpg', href: profile, label: 'REEL', title: 'Vogue in motion 06' },
    { type: 'video', src: '/assets/vid/insta/voguesalon_tarntaran-20261025-0007.mp4', poster: '/assets/img/insta/voguesalon_tarntaran-20261025-0001.jpg', href: profile, label: 'REEL', title: 'Vogue in motion 07' },
    { type: 'image', src: '/assets/img/insta/voguesalon_tarntaran-20261025-0002.jpg', href: profile, label: 'FROM INSTAGRAM', title: 'Beauty details 02' }
  ];

  document.querySelectorAll('[data-instagram-feed]').forEach(feed => {
    const isGallery = feed.classList.contains('instagram-feed-page');
    const items = isGallery ? media : media.slice(0, 6);
    feed.replaceChildren();
    feed.classList.add('instagram-feed-local');

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'instagram-tile' + (index === 0 ? ' instagram-tile-feature' : '');

      let visual;
      if (item.type === 'video') {
        visual = document.createElement('video');
        visual.src = item.src;
        if (item.poster) visual.poster = item.poster;
        visual.muted = true;
        visual.loop = true;
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
      const small = document.createElement('small');
      small.textContent = item.label;
      const strong = document.createElement('strong');
      strong.textContent = item.title;
      const linkText = document.createElement('b');
      linkText.textContent = item.href === profile ? 'Visit Instagram profile ↗' : 'View on Instagram ↗';
      overlay.append(small, strong, linkText);
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