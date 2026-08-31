(function(){
  const root=document.documentElement,key='vogue-theme',media=window.matchMedia('(prefers-color-scheme: dark)');
  const saved=()=>{try{return localStorage.getItem(key)}catch(e){return null}};
  const system=()=>media.matches?'dark':'light';
  const mode=()=>{const s=saved();return s==='light'||s==='dark'?s:system()};
  function apply(m){root.dataset.theme=m;root.style.colorScheme=m;document.querySelectorAll('[data-theme-toggle]').forEach(b=>{const i=b.querySelector('.theme-icon'),l=b.querySelector('.theme-label');if(i)i.textContent=m==='dark'?'☾':'☀';if(l)l.textContent=m==='dark'?'Dark':'Light'})}
  function toggle(){const n=mode()==='dark'?'light':'dark';try{localStorage.setItem(key,n)}catch(e){}apply(n)}
  apply(mode());
  function loadGSAP(){return new Promise((resolve,reject)=>{if(window.gsap&&window.ScrollTrigger)return resolve();const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';s.onload=()=>{const t=document.createElement('script');t.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js';t.onload=resolve;t.onerror=reject;document.head.appendChild(t)};s.onerror=reject;document.head.appendChild(s)})}
  function vogueMotion(){
    if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    gsap.registerPlugin(ScrollTrigger);
    const q=gsap.utils.toArray,mobile=window.matchMedia('(max-width:700px)').matches,tablet=window.matchMedia('(max-width:1100px)').matches;
    const hero=document.querySelector('.hero');
    if(hero){const tl=gsap.timeline({defaults:{ease:'power4.out'}});tl.from('.hero-copy .eyebrow',{y:25,autoAlpha:0,duration:.7}).from('.hero h1',{y:70,autoAlpha:0,duration:1.15},'-=.45').from('.hero-intro,.hero-actions',{y:25,autoAlpha:0,duration:.75},'-=.65').from('.hero-media',{clipPath:'inset(0 0 100% 0)',duration:1.3},'-=1');gsap.to('.hero-media img',{scale:mobile?1.06:1.16,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:mobile?.6:1}});if(!mobile)gsap.to('.hero-copy',{y:tablet?-45:-90,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}})}
    q('.statement').forEach(s=>{gsap.from(s.querySelector('h2'),{y:mobile?55:100,autoAlpha:0,duration:.9,scrollTrigger:{trigger:s,start:'top 80%',toggleActions:'play none none reverse'}});gsap.from(s.querySelector('p'),{y:30,autoAlpha:0,duration:.7,delay:.1,scrollTrigger:{trigger:s,start:'top 70%',toggleActions:'play none none reverse'}})});
    q('.duality article').forEach(a=>{gsap.from(a.querySelector('img'),{scale:mobile?1.08:1.18,scrollTrigger:{trigger:a,start:'top bottom',end:'bottom top',scrub:mobile?.5:1}});gsap.from(a.querySelector('.copy'),{y:mobile?45:80,autoAlpha:0,duration:.8,scrollTrigger:{trigger:a,start:'top 78%',toggleActions:'play none none reverse'}})});
    const services=document.querySelector('.services');if(services){gsap.from('.services-head > *',{y:mobile?40:70,autoAlpha:0,duration:.8,stagger:.1,scrollTrigger:{trigger:services,start:'top 80%',toggleActions:'play none none reverse'}});q('.service-row').forEach((r,i)=>gsap.from(r,{x:mobile?0:(i%2?-45:45),y:mobile?25:0,autoAlpha:0,duration:.55,scrollTrigger:{trigger:r,start:mobile?'top 92%':'top 88%',toggleActions:'play none none reverse'}}))}
    const exp=document.querySelector('.experience');if(exp){gsap.to('.experience-media img',{scale:mobile?1.07:1.18,xPercent:mobile?0:7,ease:'none',scrollTrigger:{trigger:exp,start:'top bottom',end:'bottom top',scrub:mobile?.6:1}});gsap.from('.experience-copy > *',{x:mobile?0:60,y:mobile?35:0,autoAlpha:0,duration:.7,stagger:.08,scrollTrigger:{trigger:exp,start:'top 76%',toggleActions:'play none none reverse'}})}
    const academy=document.querySelector('.academy');if(academy){gsap.from('.academy h2',{scale:mobile?.9:.78,y:mobile?45:80,autoAlpha:0,duration:1,scrollTrigger:{trigger:academy,start:'top 76%',toggleActions:'play none none reverse'}});if(!mobile)gsap.to('.academy h2',{y:-45,ease:'none',scrollTrigger:{trigger:academy,start:'top bottom',end:'bottom top',scrub:1}})}
    const social=document.querySelector('.social');if(social)gsap.from('.social-grid figure',{y:mobile?45:90,autoAlpha:0,scale:.97,duration:.7,stagger:.07,scrollTrigger:{trigger:social,start:'top 78%',toggleActions:'play none none reverse'}});
    const final=document.querySelector('.final');if(final)gsap.from('.final h2',{y:mobile?55:100,autoAlpha:0,duration:.9,scrollTrigger:{trigger:final,start:'top 80%',toggleActions:'play none none reverse'}});
    const progress=document.querySelector('.scroll-progress');if(progress)gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}});
    if(!mobile){q('.hero-media,.experience-media').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{rotateX:((e.clientY-r.top)/r.height-.5)*-1.2,rotateY:((e.clientX-r.left)/r.width-.5)*1.2,duration:.35,overwrite:true})}));q('.hero-media,.experience-media').forEach(el=>el.addEventListener('mouseleave',()=>gsap.to(el,{rotateX:0,rotateY:0,duration:.5,ease:'power3.out'})))}
    window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>ScrollTrigger.refresh(),180)},{passive:true});
  }
  function fallbackMotion(){document.querySelectorAll('.reveal').forEach(e=>e.classList.add('on'))}
  function init(){document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',toggle));apply(mode());const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){fallbackMotion();return}loadGSAP().then(vogueMotion).catch(fallbackMotion)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  const change=()=>{if(!saved())apply(system())};if(media.addEventListener)media.addEventListener('change',change);else media.addListener(change);
})();
