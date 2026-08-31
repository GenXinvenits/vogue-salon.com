(function(){
  const root=document.documentElement;
  const key='vogue-theme';
  const media=window.matchMedia('(prefers-color-scheme: dark)');

  // No saved preference = true automatic/system mode.
  // A saved value is a manual override.
  let saved=null;
  try{saved=localStorage.getItem(key)}catch(e){}
  if(saved==='light'||saved==='dark') root.dataset.theme=saved;
  else delete root.dataset.theme;

  function updateMeta(){
    const dark=root.dataset.theme ? root.dataset.theme==='dark' : media.matches;
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content',dark?'#151114':'#fffdfb');
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
      const icon=button.querySelector('.theme-icon');
      const label=button.querySelector('.theme-label');
      if(icon) icon.textContent=dark?'☾':'☀';
      if(label) label.textContent=dark?'Dark':'Light';
      button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
      button.setAttribute('aria-pressed',dark?'true':'false');
    });
  }

  function toggle(){
    const dark=root.dataset.theme ? root.dataset.theme==='dark' : media.matches;
    const next=dark?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem(key,next)}catch(e){}
    updateMeta();
  }

  function init(){
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
      button.addEventListener('click',toggle);
    });
    updateMeta();
  }

  // If the visitor has not manually overridden the theme, immediately follow OS changes.
  function systemChanged(){
    let savedNow=null;
    try{savedNow=localStorage.getItem(key)}catch(e){}
    if(savedNow!=='light'&&savedNow!=='dark'){
      delete root.dataset.theme;
      updateMeta();
    }
  }
  if(media.addEventListener) media.addEventListener('change',systemChanged);
  else media.addListener(systemChanged);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
