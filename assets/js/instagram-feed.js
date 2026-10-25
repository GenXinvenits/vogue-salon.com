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

  const renderFeed = remoteMedia => {
  document.querySelectorAll('[data-instagram-feed]').forEach(feed => {
    const isGallery = feed.classList.contains('instagram-feed-page');
    const sourceMedia = Array.isArray(remoteMedia) && remoteMedia.length ? remoteMedia : media;
    const items = isGallery ? sourceMedia : sourceMedia.slice(0, 6);
    feed.replaceChildren();
    feed.classList.add('instagram-feed-local');

    const cards = [];
    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'instagram-tile gallery-media-tile' + (index === 0 ? ' instagram-tile-feature' : '');
      card.dataset.mediaType = item.type;

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
        // Keep playback exclusive across all locally rendered Instagram feeds.
        visual.addEventListener('play', () => {
          document.querySelectorAll('[data-instagram-feed] video').forEach(otherVideo => {
            if (otherVideo !== visual && !otherVideo.paused) otherVideo.pause();
          });
        });
      } else {
        visual = document.createElement('img');
        visual.src = item.src;
        visual.alt = item.title;
        visual.loading = 'lazy';
      }
      visual.classList.add('instagram-media-visual');
      card.append(visual);

      const caption = document.createElement('div');
      caption.className = 'gallery-media-caption';
      const small = document.createElement('span');
      small.className = 'gallery-media-label';
      small.textContent = item.type === 'video' ? '▶  REEL' : '◎  PHOTO';
      const title = document.createElement('strong');
      title.textContent = item.title;
      caption.append(small, title);
      card.append(caption);

      const link = document.createElement('a');
      link.className = 'gallery-open-post';
      link.href = item.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Open ' + item.title + ' on Instagram');
      link.innerHTML = '<span aria-hidden="true">↗</span>';
      card.append(link);

      feed.append(card);
      cards.push(card);
    });

    if (isGallery) {
      const counts = {
        all: items.length,
        image: items.filter(item => item.type === 'image').length,
        video: items.filter(item => item.type === 'video').length
      };
      feed.closest('.gallery-lookbook')?.querySelectorAll('[data-gallery-count]').forEach(node => {
        node.textContent = String(counts[node.dataset.galleryCount] ?? items.length);
      });
      feed.closest('.gallery-lookbook')?.querySelectorAll('[data-gallery-filter]').forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.dataset.galleryFilter;
          feed.classList.toggle('gallery-filtered', filter !== 'all');
          cards.forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.mediaType !== filter;
          });
          feed.closest('.gallery-lookbook').querySelectorAll('[data-gallery-filter]').forEach(other => {
            const active = other === button;
            other.classList.toggle('is-active', active);
            other.setAttribute('aria-pressed', String(active));
          });
        });
      });
    }
  });
  };

  // Prefer the server-side Meta API feed; retain the bundled gallery if not connected.
  fetch('/api/instagram-feed.php', { headers: { Accept: 'application/json' } })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Instagram feed unavailable')))
    .then(payload => renderFeed(payload.configured && Array.isArray(payload.items) && payload.items.length ? payload.items : media))
    .catch(() => renderFeed(media));
})();