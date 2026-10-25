<?php
$pageTitle = 'Instagram & Gallery';
$pageKicker = 'Follow the moments';
$pageHeadline = 'A closer look at Vogue.';
$pageIntro = 'Discover beauty inspiration, salon moments and the looks that spark your next transformation. Follow Vogue Salon & Academy on Instagram for the latest updates.';
$pageContent = <<<'HTML'
<section class="section gallery-lookbook">
  <div class="gallery-topline">
    <div class="gallery-heading-copy"><span class="eyebrow">The Vogue lookbook</span><h2 class="section-heading">Looks worth <em>saving.</em></h2><p class="section-lead">A collection of salon moments, beauty details and Reels from our Instagram feed.</p></div>
    <a class="gallery-profile-link" href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer"><span class="instagram-mark" aria-hidden="true">◎</span><span><small>FOLLOW ALONG</small><strong>@voguesalon_tarntaran</strong></span><span class="gallery-profile-arrow" aria-hidden="true">↗</span></a>
  </div>
  <div class="gallery-toolbar">
    <div class="gallery-filters" role="group" aria-label="Filter gallery media">
      <button class="gallery-filter is-active" type="button" data-gallery-filter="all" aria-pressed="true">All media <span data-gallery-count="all">10</span></button>
      <button class="gallery-filter" type="button" data-gallery-filter="image" aria-pressed="false">Photos <span data-gallery-count="image">3</span></button>
      <button class="gallery-filter" type="button" data-gallery-filter="video" aria-pressed="false">Reels <span data-gallery-count="video">7</span></button>
    </div>
    <span class="gallery-sort-note"><span aria-hidden="true">✦</span> The Vogue edit</span>
  </div>
  <div class="instagram-feed instagram-feed-page instagram-feed-local gallery-media-grid" data-instagram-feed aria-label="Vogue Salon Instagram media"></div>
  <noscript><p class="note">Enable JavaScript to browse the gallery, or visit <a href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer">Vogue on Instagram ↗</a>.</p></noscript>
  <div class="gallery-endnote"><span class="gallery-endnote-line"></span><p>Like what you see? Find more inspiration on Instagram.</p><a href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer">Explore Instagram ↗</a></div>
</section>
<section class="section cta-panel motion-in"><div><h2>Keep up with Vogue.</h2><p>New looks, salon updates and beauty inspiration are on Instagram.</p></div><a class="button" href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener noreferrer">Open Instagram ↗</a></section>
HTML;
require __DIR__ . '/../includes/page-shell.php';
