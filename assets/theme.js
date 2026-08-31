(function(){
  const root=document.documentElement;
  const key='vogue-theme';
  const media=window.matchMedia('(prefers-color-scheme: dark)');

  // SYSTEM MODE IS THE DEFAULT. A saved value exists only after the user clicks the toggle.
  function getSaved(){try{return localStorage.getItem(key)}catch(e){return null}}
  function systemMode(){return media.matches?'dark':'light'}
  function currentMode(){const saved=getSaved();return saved==='light'||saved==='dark'?saved:systemMode()}

  function apply(mode){
    root.dataset.theme=mode;
    root.style.colorScheme=mode;
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.content=mode==='dark'?'#151114':'#fffdfb';
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
      const icon=button.querySelector('.theme-icon');
      const label=button.querySelector('.theme-label');
      if(icon) icon.textContent=mode==='dark'?'☾':'☀';
      if(label) label.textContent=mode==='dark'?'Dark':'Light';
      button.setAttribute('aria-label',mode==='dark'?'Switch to light theme':'Switch to dark theme');
    });
  }

  // Explicitly apply the browser preference when there is no manual override.
  function applySystem(){if(!getSaved()) apply(systemMode())}

  function toggle(){
    const next=currentMode()==='dark'?'light':'dark';
    try{localStorage.setItem(key,next)}catch(e){}
    apply(next);
  }

  // Apply immediately, including before DOMContentLoaded.
  apply(currentMode());

  function init(){
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
      button.addEventListener('click',toggle);
    });
    apply(currentMode());
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);else init();

  // Browser/OS changed its preferred appearance.
  const onSystemChange=function(){if(!getSaved()) applySystem()};
  if(media.addEventListener) media.addEventListener('change',onSystemChange);else media.addListener(onSystemChange);
})();
