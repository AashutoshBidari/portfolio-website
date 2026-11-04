/* ===== EDIT HERE: add your own links. Empty ones are hidden automatically. ===== */
const LINKS = {
  email: "",      // e.g. "you@example.com"
  github: "",     // full URL
  linkedin: "",   // full URL
  twitter: "",    // full URL
  instagram: ""   // full URL
};
const PROJECT_LINKS = {
  "Document Extractor": { "Live site": "", "GitHub": "" },
  "Student Command Center": { "Live site": "", "GitHub": "" }
};
/* ======================================================================== */

// Theme
const root = document.documentElement, btn = document.getElementById('theme');
const dark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const paint = () => btn.textContent = dark() ? '☀' : '☾';
try { const s = localStorage.getItem('theme'); if (s) root.dataset.theme = s; } catch (e) {}
paint();
btn.onclick = () => {
  root.dataset.theme = dark() ? 'light' : 'dark'; paint();
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
};

// Typing effect
const words = ['BTech AI student', 'builder in progress', 'curious learner'];
const t = document.getElementById('typed'); let w = 0, c = 0, del = false;
(function tick(){
  const word = words[w];
  t.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 40 : 80);
})();

// Contact links (only filled ones show)
const soc = document.getElementById('social');
Object.entries(LINKS).forEach(([k, v]) => {
  if (!v) return;
  const a = document.createElement('a');
  a.className = 'btn'; a.target = '_blank'; a.rel = 'noopener';
  a.href = k === 'email' ? 'mailto:' + v : v;
  a.textContent = k === 'email' ? 'Email' : k[0].toUpperCase() + k.slice(1);
  soc.appendChild(a);
});
if (!soc.children.length) {
  document.getElementById('contact').style.display = 'none';
  document.getElementById('navc').style.display = 'none';
}

// Project links
document.querySelectorAll('.card').forEach(card => {
  const name = card.querySelector('h3').textContent, box = card.querySelector('.proj-links');
  Object.entries(PROJECT_LINKS[name] || {}).forEach(([label, url]) => {
    if (!url) return;
    const a = document.createElement('a');
    a.className = 'l'; a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label + ' ↗';
    box.appendChild(a);
  });
});

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Cursor glow + card tilt
const g = document.getElementById('glow');
addEventListener('pointermove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  c.addEventListener('pointerleave', () => c.style.transform = '');
});
document.getElementById('yr').textContent = new Date().getFullYear();
