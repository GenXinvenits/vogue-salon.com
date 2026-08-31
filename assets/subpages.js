(function(){
  const nav=document.querySelector('.site-nav,.nav');
  if(!nav)return;
  document.body.classList.add('subpage');

  const root=document.documentElement;
  const key='vogue-theme';
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  const saved=()=>{try{return localStorage.getItem(key)}catch(e){return null}};
  const system=()=>media.matches?'dark':'light';
  const mode=()=>{const s=saved();return s==='light'||s==='dark'?s:system()};

  function apply(m){
    root.dataset.theme=m;
    root.style.colorScheme=m;
    document.querySelectorAll('[data-theme-toggle], [data-subpage-theme]').forEach(b=>{
      const i=b.querySelector('.theme-icon');
      const l=b.querySelector('.theme-label');
      if(i)i.textContent=m==='dark'?'☾':'☀';
      if(l)l.textContent=m==='dark'?'Dark':'Light';
    });
  }

  function toggle(){
    const next=mode()==='dark'?'light':'dark';
    try{localStorage.setItem(key,next)}catch(e){}
    apply(next);
  }

  apply(mode());

  // Add the theme control to both the redesigned and legacy subpage navbars.
  if(!nav.querySelector('[data-subpage-theme]')){
    const book=nav.querySelector('.book');
    const b=document.createElement('button');
    b.type='button';
    b.className='theme-switch';
    b.setAttribute('data-subpage-theme','');
    b.setAttribute('aria-label','Switch colour theme');
    b.innerHTML='<span class="theme-icon"></span><span class="theme-label"></span>';
    apply(mode());
    if(book) nav.insertBefore(b,book); else nav.appendChild(b);
    b.addEventListener('click',toggle);
  }

  const progress=document.createElement('div');
  progress.className='subpage-progress';
  document.body.appendChild(progress);

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function motion(){
    if(!window.gsap||reduce){
      document.querySelectorAll('.subpage-reveal').forEach(e=>{e.style.opacity=1;e.style.transform='none'});
      return;
    }
    const gsap=window.gsap;
    if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
    const hero=document.querySelector('.page-hero,.hero');
    if(hero){
      const copy=hero.querySelector('.subpage-hero-copy,.hero-copy')||hero.children[0];
      const image=hero.querySelector('.hero-image,.heroimg');
      const tl=gsap.timeline({defaults:{ease:'power4.out'}});
      if(copy)tl.from(copy,{y:55,autoAlpha:0,duration:1.05});
      if(image)tl.from(image,{clipPath:'inset(0 0 100% 0)',duration:1.2},'-=.85');
    }
    if(window.ScrollTrigger){
      document.querySelectorAll('.section,.quote,.cta').forEach(s=>s.querySelectorAll('h2,.card,.price,.feature-image,.feature>div,.gallery img').forEach((el,i)=>{
        el.classList.add('subpage-reveal');
        gsap.to(el,{opacity:1,y:0,duration:.8,delay:Math.min(i*.045,.24),ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}});
      }));
      gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}});
      window.addEventListener('load',()=>window.ScrollTrigger.refresh(),{once:true});
    }
  }

  function loadMotion(){
    if(reduce){motion();return}
    if(window.gsap&&window.ScrollTrigger){motion();return}
    if(!window.gsap){
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';
      s.onload=loadMotion;
      s.onerror=()=>motion();
      document.head.appendChild(s);
      return;
    }
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js';
    s.onload=motion;
    s.onerror=motion;
    document.head.appendChild(s);
  }
  loadMotion();

  const change=()=>{if(!saved())apply(system())};
  if(media.addEventListener)media.addEventListener('change',change);else media.addListener(change);
})();
