(function(){
  const root=document.documentElement;
  const key='vogue-theme';
  const saved=localStorage.getItem(key);
  if(saved==='light'||saved==='dark') root.dataset.theme=saved;

  function updateButtons(){
    const manual=root.dataset.theme;
    const systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark=manual ? manual==='dark' : systemDark;
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
      button.querySelector('.theme-icon').textContent=dark?'☾':'☀';
      button.querySelector('.theme-label').textContent=dark?'Dark':'Light';
      button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
      button.setAttribute('aria-pressed',dark?'true':'false');
    });
  }
  function toggle(){
    const current=root.dataset.theme;
    const systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark=current ? current==='dark' : systemDark;
    const next=isDark?'light':'dark';
    root.dataset.theme=next;
    localStorage.setItem(key,next);
    updateButtons();
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('[data-theme-toggle]').forEach(function(button){button.addEventListener('click',toggle)});
    updateButtons();
  });
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener?.('change',function(){if(!localStorage.getItem(key)){delete root.dataset.theme;updateButtons()}});
})();
