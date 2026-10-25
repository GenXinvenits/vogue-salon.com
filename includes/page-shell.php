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
  <?php require __DIR__ . '/navbar.php'; ?>
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
    <div><a class="brand" href="/index.php"><img class="brand-logo brand-logo-light" src="/assets/img/logo-black.png" alt="" width="52" height="52"><img class="brand-logo brand-logo-dark" src="/assets/img/logo-white.png" alt="" width="52" height="52"><span class="brand-name">VOGUE<small>Salon &amp; Academy</small></span></a><p class="footer-description">Beauty with attitude. Find your look, discover your craft, and make the experience your own.</p></div>
    <div class="footer-links"><div><strong>Explore</strong><a href="/pages/about.php">About Vogue</a><a href="/pages/services.php">Services</a><a href="/pages/academy.php">Academy</a><a href="/pages/gallery.php">Gallery</a></div><div><strong>Get in touch</strong><a href="/pages/booking.php">Book an appointment</a><a href="/pages/contact.php">Contact &amp; directions</a><a href="https://www.instagram.com/voguesalon_tarntaran/?hl=en" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></div>
  </div><div class="site-wrap footer-bottom"><span>© <?= date('Y') ?> Vogue Salon &amp; Academy</span><a href="#top">Back to top ↑</a></div></footer>
  <script src="/assets/js/site.js" defer></script>
  <script src="/assets/js/instagram-feed.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
  <script src="/assets/js/page-motion.js" defer></script>
</body>
</html>