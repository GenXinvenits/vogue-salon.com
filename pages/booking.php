<?php
$pageTitle = 'Book an Appointment';
$pageKicker = 'Make a little time for you';
$pageHeadline = 'Let’s plan your Vogue visit.';
$pageIntro = 'Send your appointment or academy enquiry through WhatsApp. The team can confirm availability, timings, service details and pricing.';
$pageContent = <<<'HTML'
<section class="section contact-grid">
  <div class="contact-panel motion-in"><span class="eyebrow">A few details</span><h2 class="display section-heading">Tell us what you have in mind.</h2><p class="section-lead">This form opens WhatsApp with your message ready to send. Your appointment is not confirmed until Vogue replies.</p><div class="contact-row"><span class="contact-icon">◷</span><div><strong>Need a specific time?</strong><p>Share your preferred date and time, and wait for confirmation before travelling.</p></div></div><div class="contact-row"><span class="contact-icon">✦</span><div><strong>Booking for a special event?</strong><p>Mention the event date and service so the team can advise on planning.</p></div></div></div>
  <div class="contact-panel motion-in"><form id="bookingForm"><div class="form-grid">
    <div class="field"><label for="fullName">Your name *</label><input id="fullName" name="name" autocomplete="name" required placeholder="Name"></div>
    <div class="field"><label for="phone">Your phone</label><input id="phone" name="phone" autocomplete="tel" inputmode="tel" placeholder="Phone number (optional)"></div>
    <div class="field"><label for="requestType">I'm enquiring about *</label><select id="requestType" name="type" required><option value="Salon appointment">Salon appointment</option><option value="Bridal or event booking">Bridal or event booking</option><option value="Academy courses">Academy courses</option><option value="General enquiry">General enquiry</option></select></div>
    <div class="field"><label for="preferredDate">Preferred date</label><input id="preferredDate" name="date" type="date"></div>
    <div class="field full"><label for="details">Tell us a little more *</label><textarea id="details" name="details" required placeholder="Service, preferred time, event date, or course questions"></textarea></div>
    <div class="field full"><button class="button button-primary" type="submit">Continue to WhatsApp ↗</button><p class="note">Submitting opens WhatsApp. Nothing is sent until you press send there.</p></div>
  </div></form><p id="bookingStatus" class="note" role="status" aria-live="polite"></p></div>
</section>
<script>
document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = new FormData(this);
  const fields = [['Name', 'name'], ['Phone', 'phone'], ['Enquiry', 'type'], ['Preferred date', 'date'], ['Details', 'details']];
  const message = 'Hi Vogue Salon & Academy, I would like to make an enquiry.\n\n' + fields.map(([label, key]) => label + ': ' + (String(form.get(key) || '').trim() || 'Not specified')).join('\n');
  const url = 'https://wa.me/917837344000?text=' + encodeURIComponent(message);
  window.open(url, '_blank', 'noopener,noreferrer');
  document.getElementById('bookingStatus').textContent = 'WhatsApp opened in a new tab. Please send your message there; your booking is pending confirmation.';
});
const params = new URLSearchParams(window.location.search);
if (params.get('type') === 'academy') document.getElementById('requestType').value = 'Academy courses';
</script>
HTML;
require __DIR__ . '/../includes/page-shell.php';
