(function(){
  const root=document.documentElement;
  const key='vogue-theme';
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  function getSaved(){try{return localStorage.getItem(key)}catch(e){return null}}
  function systemMode(){return media.matches?'dark':'light'}
  function currentMode(){const saved=getSaved();return saved==='light'||saved==='dark'?saved:systemMode()}
  function apply(mode){
    root.dataset.theme=mode;root.style.colorScheme=mode;
    const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=mode==='dark'?'#151114':'#fffdfb';
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){const i=button.querySelector('.theme-icon'),l=button.querySelector('.theme-label');if(i)i.textContent=mode==='dark'?'☾':'☀';if(l)l.textContent=mode==='dark'?'Dark':'Light';button.setAttribute('aria-label',mode==='dark'?'Switch to light theme':'Switch to dark theme')});
  }
  function toggle(){const next=currentMode()==='dark'?'light':'dark';try{localStorage.setItem(key,next)}catch(e){}apply(next)}
  apply(currentMode());

  function addVogueProfile(){
    if(document.querySelector('[data-vogue-profile]'))return;
    const main=document.querySelector('main');if(!main)return;
    const c=document.createElement('section');c.className='section container';c.dataset.vogueProfile='true';
    c.innerHTML='<div class="section-head"><div><div class="mono pink">05 / The Vogue House</div><h2>Beauty,<br><span class="serif">made local.</span></h2></div><div class="mono">Tarn Taran / Punjab</div></div>'+
      '<div class="trust vogue-facts"><article><div class="mono pink">01</div><strong>Hair</strong><p>Cutting, styling, colour, extensions and damage-repair treatments.</p></article><article><div class="mono pink">02</div><strong>Beauty</strong><p>Skin care, facials, makeup, hair removal, lashes and occasion beauty.</p></article><article><div class="mono pink">03</div><strong>Nails</strong><p>Manicure, pedicure, anti-tan pedicure and acrylic nail extensions.</p></article><article><div class="mono pink">04</div><strong>Grooming</strong><p>A beauty and grooming destination with an on-site salon team.</p></article></div>'+
      '<div class="vogue-profile-copy"><div><div class="mono pink">VOGUE / TARN TARAN</div><p>Vogue Salon &amp; Academy is based on Golden Avenue near Janta Palace on Amritsar Road, Tarn Taran. The salon brings hair, beauty, nails, grooming and professional beauty education together under one roof.</p></div><div><div class="mono pink">VISIT</div><p>Open daily. Typical listed hours are 9:00 AM–8:00 PM, with Saturday and Sunday closing earlier at some listings.</p><a class="book" href="https://www.instagram.com/voguesalon_tarntaran/" target="_blank" rel="noopener">Follow Vogue on Instagram ↗</a></div></div>';
    const cta=main.querySelector('.cta')?.closest('section');
    if(cta)main.insertBefore(c,cta);else main.appendChild(c);
  }

  function motion(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const revealTargets=document.querySelectorAll('.section,.quote,.cta,.card,.trust article,.review,.feature,.hero-image,.feature-image');
    revealTargets.forEach(function(el,i){if(!el.classList.contains('reveal'))el.classList.add('reveal');if(i%4)el.classList.add('reveal-delay-'+Math.min(i%4,3))});
    if('IntersectionObserver' in window){const io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('is-visible')});
    const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);
    const updateProgress=function(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+(max>0?window.scrollY/max:0)+')'};window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
    if(window.matchMedia('(pointer:fine)').matches){
      const orb=document.createElement('div');orb.className='cursor-orb';document.body.appendChild(orb);let mx=-500,my=-500,cx=mx,cy=my;window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;orb.classList.add('active')});document.addEventListener('mouseleave',function(){orb.classList.remove('active')});function cursor(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;orb.style.left=cx+'px';orb.style.top=cy+'px';requestAnimationFrame(cursor)}cursor();document.querySelectorAll('.book,.theme-toggle,.navlinks a').forEach(function(el){el.addEventListener('mouseenter',function(){orb.style.transform='translate(-50%,-50%) scale(1.35)'});el.addEventListener('mouseleave',function(){orb.style.transform='translate(-50%,-50%) scale(1)'})});
    }
    document.querySelectorAll('.hero-image,.feature-image').forEach(function(el){el.addEventListener('mousemove',function(e){const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(900px) rotateX('+(-y*2)+'deg) rotateY('+(x*2)+'deg)'});el.addEventListener('mouseleave',function(){el.style.transform=''})});
  }
  function init(){document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',toggle)});apply(currentMode());addVogueProfile();motion()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  const onSystemChange=function(){if(!getSaved())apply(systemMode())};if(media.addEventListener)media.addEventListener('change',onSystemChange);else media.addListener(onSystemChange);
})();
