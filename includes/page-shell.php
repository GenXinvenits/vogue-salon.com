<?php
declare(strict_types=1);
/**
 * Shared shell for Vogue Salon & Academy inner pages.
 * Each page sets $pageTitle, $pageKicker, $pageHeadline, $pageIntro and $pageContent.
 */
$pageTitle = $pageTitle ?? 'Vogue Salon & Academy';
$pageKicker = $pageKicker ?? 'Vogue Salon & Academy';
$pageHeadline = $pageHeadline ?? 'Beauty, with attitude.';
$pageIntro = $pageIntro ?? '';
$pageContent = $pageContent ?? '';
?><!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f5f8">
  <meta name="description" content="<?= htmlspecialchars($pageIntro, ENT_QUOTES, 'UTF-8') ?>">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?> | Vogue Salon &amp; Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/inner-pages.css">
</head>
<body>
  <header class="site-header">
    <div class="site-wrap nav">
      <a class="brand" href="/index.php" aria-label="Vogue Salon and Academy home"><img class="brand-logo" src="/assets/img/logo.jpg" alt="" width="52" height="52"><span class="brand-name">VOGUE<small>Salon &amp; Academy</small></span></a>
      <nav class="nav-links" id="navLinks" aria-label="Main navigation">
        <a href="/pages/about.php">About</a><div class="nav-service-menu"><a class="services-nav-link" href="/pages/services.php">Services</a><button class="mega-toggle" type="button" aria-label="Open services menu" aria-expanded="false">⌄</button><div class="services-mega-menu" aria-label="All salon services">
          <a class="mega-service-card" href="/pages/services.php#hair"><img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>01 <b>Hair Studio</b></span><i aria-hidden="true">↗</i></a>
          <a class="mega-service-card" href="/pages/services.php#bridal"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>02 <b>Bridal Studio</b></span><i aria-hidden="true">↗</i></a>
          <a class="mega-service-card" href="/pages/services.php#nails"><img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>03 <b>Nail Atelier</b></span><i aria-hidden="true">↗</i></a>
          <a class="mega-service-card" href="/pages/services.php#skin"><img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>04 <b>Skin &amp; Beauty</b></span><i aria-hidden="true">↗</i></a>
          <a class="mega-service-card" href="/pages/services.php#makeup"><img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>05 <b>Makeup &amp; Occasion</b></span><i aria-hidden="true">↗</i></a>
          <a class="mega-service-card" href="/pages/services.php#consult"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&amp;fit=crop&amp;w=420&amp;q=80" alt="" loading="lazy"><span>06 <b>Your Beauty Plan</b></span><i aria-hidden="true">↗</i></a></div></div><a href="/pages/academy.php">Academy</a><a href="/pages/gallery.php">Gallery</a><a href="/pages/contact.php">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="icon-btn" id="themeToggle" type="button" aria-label="Switch to dark theme" title="Toggle dark and light theme"><span id="themeIcon" aria-hidden="true">☾</span></button>
        <a class="button button-primary nav-book" href="/pages/booking.php">Book a visit ↗</a>
        <button class="icon-btn menu-toggle" id="menuToggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>
  <main>
    <section class="page-hero">
      <div class="site-wrap page-hero-inner">
        <a class="back-link" href="/index.php">← Back to home</a>
        <span class="eyebrow"><?= htmlspecialchars($pageKicker, ENT_QUOTES, 'UTF-8') ?></span>
        <h1 class="display"><?= $pageHeadline ?></h1>
        <p class="page-intro"><?= htmlspecialchars($pageIntro, ENT_QUOTES, 'UTF-8') ?></p>
      </div>
      <div class="hero-orb orb-one" aria-hidden="true"></div><div class="hero-orb orb-two" aria-hidden="true"></div>
    </section>
    <div class="site-wrap page-content"><?= $pageContent ?></div>
  </main>
  <footer class="site-footer"><div class="site-wrap footer-top">
    <div><a class="brand" href="/index.php"><img class="brand-logo" src="/assets/img/logo.jpg" alt="" width="52" height="52"><span class="brand-name">VOGUE<small>Salon &amp; Academy</small></span></a><p class="footer-description">Beauty with attitude. Find your look, discover your craft, and make the experience your own.</p></div>
    <div class="footer-links"><div><strong>Explore</strong><a href="/pages/about.php">About Vogue</a><a href="/pages/services.php">Services</a><a href="/pages/academy.php">Academy</a><a href="/pages/gallery.php">Gallery</a></div><div><strong>Get in touch</strong><a href="/pages/booking.php">Book an appointment</a><a href="/pages/contact.php">Contact &amp; directions</a><a href="https://www.instagram.com/voguesalon_tarntaran/?hl=en" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></div>
  </div><div class="site-wrap footer-bottom"><span>© <?= date('Y') ?> Vogue Salon &amp; Academy</span><a href="#top">Back to top ↑</a></div></footer>
  <script src="/assets/js/site.js" defer></script>
  <script src="/assets/js/instagram-feed.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
  <script src="/assets/js/page-motion.js" defer></script>
</body>
</html>