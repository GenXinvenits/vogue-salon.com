(function(){
  if(!document.querySelector('.site-nav')||!document.querySelector('.page-hero')) return;
  document.body.classList.add('subpage');
  const root=document.documentElement,key='vogue-theme',media=window.matchMedia('(prefers-color-scheme: dark)');
  const saved=()=>{try{return localStorage.getItem(key)}catch(e){return null}};
  const system=()=>media.matches?'dark':'light';
  const mode=()=>{const s=saved();return s==='light'||s==='dark'?s:system()};
  function apply(m){root.dataset.theme=m;root.style.colorScheme=m;document.querySelectorAll('[data-theme-toggle],[data-subpage-theme]').forEach(b=>{const i=b.querySelector('.theme-icon'),l=b.querySelector('.theme-label');if(i)i.textContent=m==='dark'?'☾':'☀';if(l)l.textContent=m==='dark'?'Dark':'Light';b.setAttribute('aria-pressed',m==='dark'?'true':'false')})}
  function toggle(){const n=mode()==='dark'?'light':'dark';try{localStorage.setItem(key,n)}catch(e){}apply(n)}
  apply(mode());
  const nav=document.querySelector('.site-nav');
  if(nav&&!nav.querySelector('[data-subpage-theme]')&&!nav.querySelector('[data-theme-toggle]')){
    const book=nav.querySelector('.book');
    const b=document.createElement('button');b.type='button';b.className='theme-switch';b.setAttribute('data-subpage-theme','');b.setAttribute('aria-label','Switch colour theme');b.innerHTML='<span class="theme-icon">'+(mode()==='dark'?'☾':'☀')+'</span><span class="theme-label">'+(mode()==='dark'?'Dark':'Light')+'</span>';
    if(book)nav.insertBefore(b,book);else nav.appendChild(b);b.addEventListener('click',toggle);
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',toggle));
  const progress=document.createElement('div');progress.className='subpage-progress';document.body.appendChild(progress);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function motion(){
    if(!window.gsap||reduce){document.querySelectorAll('.subpage-reveal').forEach(e=>{e.style.opacity=1;e.style.transform='none'});return}
    const gsap=window.gsap;
    if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
    const hero=document.querySelector('.page-hero');
    if(hero){const copy=hero.children[0],image=hero.querySelector('.hero-image');gsap.timeline({defaults:{ease:'power4.out'}}).from(copy,{y:55,autoAlpha:0,duration:1.05}).from(image,{clipPath:'inset(0 0 100% 0)',duration:1.2},'-=.85');if(image&&window.ScrollTrigger)gsap.to(image.querySelector('img'),{scale:1.12,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}})}
    document.querySelectorAll('.section,.quote,.cta').forEach(s=>s.querySelectorAll('h2,.card,.price,.feature-image,.feature>div,.gallery img').forEach((el,i)=>{el.classList.add('subpage-reveal');if(window.ScrollTrigger)gsap.to(el,{opacity:1,y:0,duration:.8,delay:Math.min(i*.045,.24),ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}});else gsap.to(el,{opacity:1,y:0,duration:.8,delay:i*.04,ease:'power3.out'});}));
    if(window.ScrollTrigger){gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}});window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true})}
  }
  if(window.gsap)motion();else{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';s.onload=()=>{const t=document.createElement('script');t.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js';t.onload=motion;document.head.appendChild(t)};document.head.appendChild(s)}
  const follow=()=>{if(!saved())apply(system())};if(media.addEventListener)media.addEventListener('change',follow);else media.addListener(follow);
})();
