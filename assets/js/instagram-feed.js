(() => {
  /*
   * Vogue Instagram lookbook.
   * Add public Instagram post/Reel permalinks to data-posts on each [data-instagram-feed],
   * e.g. data-posts='["https://www.instagram.com/p/POSTCODE/","https://www.instagram.com/reel/REELCODE/"]'.
   * Official Instagram embeds require individual public post/Reel URLs; a profile URL alone
   * cannot be used as a live feed. Empty configuration deliberately preserves the labelled
   * editorial placeholders instead of pretending they are real Instagram posts.
   */
  const feedNodes = document.querySelectorAll('[data-instagram-feed]');
  if (!feedNodes.length) return;
  const validUrl = value => {
    try {
      const url = new URL(value);
      return url.hostname === 'www.instagram.com' && /^\/(p|reel|tv)\/[\w-]+\/?$/.test(url.pathname);
    } catch (_) { return false; }
  };
  let embedScriptRequested = false;
  feedNodes.forEach(feed => {
    let posts = [];
    try { posts = JSON.parse(feed.dataset.posts || '[]'); } catch (_) { posts = []; }
    posts = [...new Set(posts.filter(validUrl))].slice(0, 6);
    if (!posts.length) return;
    feed.replaceChildren();
    feed.classList.add('instagram-feed-live');
    posts.forEach((url, index) => {
      const card = document.createElement('article');
      card.className = 'instagram-embed-card';
      card.style.setProperty('--embed-index', index);
      const quote = document.createElement('blockquote');
      quote.className = 'instagram-media';
      quote.dataset.instgrmPermalink = url;
      quote.dataset.instgrmVersion = '14';
      quote.style.cssText = 'background:var(--surface);border:0;border-radius:20px;box-shadow:var(--shadow);margin:0 auto;max-width:100%;min-width:0;padding:0;width:100%;';
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View this post on Instagram';
      quote.append(link);
      card.append(quote);
      feed.append(card);
    });
    if (!embedScriptRequested) {
      embedScriptRequested = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      };
      document.body.append(script);
    } else if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  });
})();