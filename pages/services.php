<?php
$pageTitle = 'Salon Services';
$pageKicker = 'The service menu';
$pageHeadline = 'Your mood. Your moment.';
$pageIntro = 'Explore beauty and styling options at Vogue Salon & Academy. Contact the team to confirm current availability, service details and pricing before booking.';
$pageContent = <<<'HTML'
<section class="section"><div class="card-grid">
  <article class="info-card motion-in"><span class="card-index">01 / HAIR</span><h3>Hair studio</h3><p>Haircuts, blow-dry and styling, colour consultations, treatments and a refreshed everyday look. Bring a reference photo so we can discuss what suits your hair and routine.</p></article>
  <article class="info-card motion-in"><span class="card-index">02 / BRIDAL</span><h3>Bridal beauty</h3><p>Plan a wedding or occasion look with a consultation around your outfit, event, personal style and desired finish. Ask about dates and trial availability.</p></article>
  <article class="info-card motion-in"><span class="card-index">03 / MAKEUP</span><h3>Makeup & occasions</h3><p>Explore polished, soft-glam or statement makeup ideas for parties, celebrations and special events.</p></article>
  <article class="info-card motion-in"><span class="card-index">04 / SKIN</span><h3>Skin & beauty care</h3><p>Talk to the team about available facial and beauty-care options and what may be appropriate for your needs.</p></article>
  <article class="info-card motion-in"><span class="card-index">05 / NAILS</span><h3>Nail studio</h3><p>Ask about manicure options, nail styling, extensions and design ideas for everyday wear or a special occasion.</p></article>
  <article class="info-card motion-in"><span class="card-index">06 / CONSULT</span><h3>Personal consultation</h3><p>Not sure what to choose? Share your inspiration and timing, and ask the team to recommend a service or appointment type.</p></article>
</div><p class="note">Service descriptions are a guide, not a confirmed live price list. Please contact Vogue directly to verify which services are currently offered and request a quote.</p></section>
<section class="section split"><img class="split-image motion-in" src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=85" alt="Salon styling station" loading="lazy"><div class="motion-in"><span class="eyebrow">Before you visit</span><h2 class="display section-heading">Let's get the details right.</h2><p class="section-lead">For the best experience, share the service you are interested in, your preferred date, and any reference images. Bridal and event appointments may need extra planning.</p><ul class="pill-list"><li>Bring inspiration photos</li><li>Ask about pricing</li><li>Confirm your time</li><li>Discuss your preferences</li></ul><a class="button button-primary" href="/pages/booking.php">Request an appointment ↗</a></div></section>
HTML;
require __DIR__ . '/../includes/page-shell.php';
