import { router } from "./router.js";

function loadComponent(id, file) {
  return fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
      return res.text();
    })
    .then(html => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
}

// Initialize immediately (avoid relying on the window 'load' timing).
async function init() {
  try {
    await Promise.all([
      loadComponent("navbar", "components/navbar.html"),
      loadComponent("footer", "components/footer.html")
    ]);

    // after navbar loaded, wire up active-link handling
    setupNavActive();
    setupNavToggle();
    router();
  } catch (err) {
    console.error("App init error:", err);
    const app = document.getElementById('app');
    if (app) app.innerHTML = `<pre style="color:red">Init error: ${err.message || err}</pre>`;
  }
}

init();

window.addEventListener("hashchange", router);

// Auto-hide footer: show only when scrolling or at bottom
(function setupFooterAutoHide() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  let scrollTimeout;
  let isAtBottom = false;

  function checkPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    isAtBottom = scrollTop + windowHeight >= docHeight - 10;
    
    if (isAtBottom) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  }

  function onScroll() {
    footer.classList.add('visible');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      checkPosition();
    }, 1000);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', checkPosition, { passive: true });
  
  checkPosition();
})();

function setupNavActive(){
  try{
    const container = document.getElementById('navbar');
    if(!container) return;
    const anchors = container.querySelectorAll('a[data-hash]');
    function update(){
      const hash = window.location.hash || '#home';
      anchors.forEach(a => {
        if(a.dataset.hash === hash) a.classList.add('active'); else a.classList.remove('active');
      });
    }
    update();
    window.addEventListener('hashchange', update);
  }catch(e){console.error('nav active setup failed', e)}
}

// Mobile hamburger toggle for fetched navbar component
function setupNavToggle(){
  try{
    const container = document.getElementById('navbar');
    if(!container) return;
    const toggleBtn = container.querySelector('#nav-toggle');
    const menu = container.querySelector('#nav-menu');
    const links = container.querySelectorAll('#nav-menu a');

    if(!toggleBtn || !menu) return;

    const closeMenu = () => menu.classList.remove('active');
    const openClose = () => menu.classList.toggle('active');

    // Use click for broad mobile support
    toggleBtn.addEventListener('click', openClose, { passive: true });

    // Close after navigating
    links.forEach(a => a.addEventListener('click', closeMenu, { passive: true }));
    window.addEventListener('hashchange', closeMenu, { passive: true });
  }catch(e){console.error('nav toggle setup failed', e)}
}
