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
    router();
  } catch (err) {
    console.error("App init error:", err);
    const app = document.getElementById('app');
    if (app) app.innerHTML = `<pre style="color:red">Init error: ${err.message || err}</pre>`;
  }
}

init();

window.addEventListener("hashchange", router);

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
