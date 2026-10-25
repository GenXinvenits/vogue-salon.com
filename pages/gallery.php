<?php
$pageTitle = 'Instagram & Gallery';
$pageKicker = 'Follow the moments';
$pageHeadline = 'A closer look at Vogue.';
$pageIntro = 'Discover beauty inspiration, salon moments and the looks that spark your next transformation. Follow Vogue Salon & Academy on Instagram for the latest updates.';
$pageContent = <<<'HTML'
<section class="section instagram-gallery-section">
  <div class="instagram-gallery-intro motion-in">
    <div><span class="eyebrow">The Vogue feed</span><h2 class="section-heading">Beauty, in the making.</h2><p class="section-lead">Browse every photo and Reel currently saved from Vogue Salon &amp; Academy’s Instagram feed. Play videos here or open the original Instagram post when available.</p></div>
    <a class="button button-primary" href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer"><span class="instagram-mark" aria-hidden="true">◎</span> Follow @voguesalon_tarntaran ↗</a>
  </div>
  <div class="instagram-feed instagram-feed-page instagram-feed-local" data-instagram-feed aria-label="Vogue Salon Instagram media"></div>
  <noscript><p class="note">Enable JavaScript to browse the locally saved Instagram photos and videos. You can also visit <a href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer">Vogue on Instagram ↗</a>.</p></noscript>
  <p class="note instagram-disclaimer">This gallery displays all Instagram media files currently stored with the website: photos and video Reels. New Instagram posts must be added to the site's media collection to appear here automatically.</p>
</section>
<section class="section cta-panel motion-in"><div><h2>Keep up with Vogue.</h2><p>New looks, salon updates and beauty inspiration are on Instagram.</p></div><a class="button" href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer">Open Instagram ↗</a></section>
HTML;
require __DIR__ . '/../includes/page-shell.php';
