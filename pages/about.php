<?php
$pageTitle = 'About Vogue';
$pageKicker = 'The Vogue point of view';
$pageHeadline = 'Beauty should feel like <span style="color:var(--primary)">you.</span>';
$pageIntro = 'A welcoming salon and academy for personal style, thoughtful beauty services and creative learning in Tarn Taran.';
$pageContent = <<<'HTML'
<section class="section split">
  <div class="motion-in"><span class="eyebrow">Our philosophy</span><h2 class="display section-heading">Good style starts with listening.</h2><p class="section-lead">We believe a great beauty experience begins with understanding the person in the chair: your preferences, your routine, your inspiration and the moments you are getting ready for.</p><p class="section-lead">Vogue brings salon services and beauty education together in one place. Whether you're here for a refresh, a celebration or a new skill, the aim is to help you feel comfortable, confident and more like yourself.</p></div>
  <img class="split-image motion-in" src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1100&q=85" alt="Bright contemporary salon interior" loading="lazy">
</section>
<section class="section">
  <span class="eyebrow">What matters here</span><h2 class="display section-heading">The details make the difference.</h2>
  <div class="card-grid">
    <article class="info-card motion-in"><span class="card-index">01</span><h3>Personal consultation</h3><p>We start with your goals and inspiration, then help you explore options that suit the look you have in mind.</p></article>
    <article class="info-card motion-in"><span class="card-index">02</span><h3>Care in the craft</h3><p>Beauty is a mix of technique, creativity and attention to the little finishing touches.</p></article>
    <article class="info-card motion-in"><span class="card-index">03</span><h3>Room to grow</h3><p>Our academy side is for people who want to explore beauty skills and ask about their next learning step.</p></article>
  </div>
</section>
<section class="section cta-panel motion-in"><div><h2>Meet us at Vogue.</h2><p>Tell us what you have in mind, ask about a service or find out more about learning opportunities.</p></div><a class="button" href="/pages/contact.php">Get in touch ↗</a></section>
HTML;
require __DIR__ . '/../includes/page-shell.php';
