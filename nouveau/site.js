(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* icon sprite (line icons, 64 grid) */
const ICONS = {
  brief:'<path d="M14 8h26l10 10v38H14z"/><path d="M40 8v10h10"/><path class="g" d="M22 32h22M22 40h22M22 48h12"/>',
  print:'<rect x="14" y="26" width="36" height="20" rx="3"/><path d="M20 26V10h24v16"/><path class="g" d="M20 38h24v18H20z"/>',
  post:'<path d="M8 22l24-12 24 12v26L32 58 8 48z"/><path d="M8 22l24 12 24-12M32 34v24"/><path class="g" d="M20 16l24 12"/>',
  pose:'<rect x="10" y="22" width="44" height="30" rx="4"/><path d="M18 22v-6h28v6"/><path class="g" d="M20 30h24v14H20z"/>',
  city:'<path d="M8 56V26h14v30M22 56V14h18v42M40 56V30h16v26M6 56h52"/><path class="g" d="M28 24h6M28 32h6M28 40h6"/>',
  eye:'<path d="M4 32s11-18 28-18 28 18 28 18-11 18-28 18S4 32 4 32z"/><circle class="g" cx="32" cy="32" r="8"/>',
  bike:'<circle cx="16" cy="40" r="11"/><circle cx="48" cy="40" r="11"/><path d="M16 40l10-18h16l6 18M26 22l8 18h-18M38 22l-3-6h6"/><path class="g" d="M26 14h8"/>',
  coin:'<circle cx="32" cy="32" r="22"/><path class="g" d="M32 18v28M24 26h12a5 5 0 010 10H26a5 5 0 000 10h14"/>',
  check:'<circle cx="32" cy="32" r="22"/><path class="g" d="M21 33l8 8 15-17"/>',
  phone:'<rect x="18" y="6" width="28" height="52" rx="5"/><path d="M28 50h8"/><path class="g" d="M24 40l6-8 5 5 6-9"/>',
  clock:'<circle cx="32" cy="32" r="22"/><path class="g" d="M32 18v15l10 6"/>',
  people:'<circle cx="22" cy="20" r="7"/><path d="M10 50c0-10 5-16 12-16s12 6 12 16"/><circle class="g" cx="44" cy="24" r="6"/><path class="g" d="M38 50c0-8 3-13 8-13s8 5 8 13"/>',
  target:'<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="12"/><path class="g" d="M32 6v10M32 48v10M6 32h10M48 32h10"/>'
};
const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
sprite.setAttribute('width', 0); sprite.setAttribute('height', 0); sprite.style.position = 'absolute'; sprite.setAttribute('aria-hidden', 'true');
sprite.innerHTML = Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 64 64">${v}</symbol>`).join('');
document.body.prepend(sprite);
const icon = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-${k}"/></svg>`;

/* hexagon background parallax */
const hexbg = $('.hexbg');
if (hexbg){
  const hex = (r, w) => `<svg width="${r * 2}" height="${r * 2}" viewBox="-50 -50 100 100"><polygon points="25,-43 50,0 25,43 -25,43 -50,0 -25,-43" fill="none" stroke="#C9A84C" stroke-width="${w}"/></svg>`;
  const spots = [[8, 22, 60, 1.4, .25], [86, 14, 46, 1.4, .5], [74, 70, 80, 1.2, .35], [14, 72, 38, 1.6, .6], [48, 88, 54, 1.4, .3], [93, 46, 30, 1.8, .7]];
  spots.forEach(([x, y, r, w, s]) => { const d = document.createElement('div'); d.innerHTML = hex(r, w); const el = d.firstChild; el.style.left = x + '%'; el.style.top = y + '%'; el.dataset.s = s; hexbg.appendChild(el); });
  if (!RM) addEventListener('scroll', () => { const y = scrollY; $$('svg', hexbg).forEach(el => { el.style.transform = `translateY(${-y * el.dataset.s * .35}px) rotate(${y * el.dataset.s * .04}deg)`; }); }, { passive: true });
}

/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
$$('.rv').forEach(el => io.observe(el));
setTimeout(() => $$('.hero .rv').forEach(el => el.classList.add('in')), 60);

/* journey: sticky card follows the active step */
const journey = $('.journey');
if (journey){
  const steps = $$('.jstep', journey), stick = $('.jcard', journey);
  steps.forEach((s, i) => {
    const k = s.dataset.icon, img = s.dataset.img;
    const ico = document.createElement('div'); ico.className = 'jico';
    ico.innerHTML = img ? `<img src="${img}" alt="${s.dataset.alt || ''}">` : icon(k);
    stick.appendChild(ico); s._ico = ico;
    if (!img){ const t = document.createElement('div'); t.innerHTML = icon(k, 'jicon-inline'); s.prepend(t.firstChild); }
  });
  const label = document.createElement('span'); label.className = 'jlabel'; stick.appendChild(label);
  const bar = document.createElement('div'); bar.className = 'jbar'; bar.innerHTML = '<i></i>'; stick.appendChild(bar);
  const sio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const i = steps.indexOf(e.target);
    steps.forEach((s, j) => { s.classList.toggle('on', j === i); s._ico.classList.toggle('on', j === i); });
    label.textContent = e.target.dataset.label || ''; stick.style.setProperty('--jp', ((i + 1) / steps.length).toFixed(3));
  }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => sio.observe(s));
  steps[0].classList.add('on'); steps[0]._ico.classList.add('on'); label.textContent = steps[0].dataset.label || '';
  stick.style.setProperty('--jp', (1 / steps.length).toFixed(3));
}

/* counter */
$$('[data-count]').forEach(el => {
  const to = +el.dataset.count; let done = false;
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting || done) return; done = true; o.disconnect();
    if (RM){ el.firstChild.textContent = to; return; }
    const t0 = performance.now(); const tick = n => { const k = Math.min(1, (n - t0) / 1600); el.firstChild.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  }), { threshold: .5 }).observe(el);
});

/* forms : envoi via send.php, repli sur mailto */
$$('form[data-mail]').forEach(f => f.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('button[type=submit]', f), ok = $('.ok', f), err = $('.err', f), d = new FormData(f);
  d.append('_subject', f.dataset.mail); btn.disabled = true; if (ok) ok.hidden = true; if (err) err.hidden = true;
  try {
    const obj = Object.fromEntries(d.entries());
    let r = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) }).catch(() => null);
    let j = r && r.ok ? await r.json().catch(() => null) : null;
    if (!j || !j.ok){ r = await fetch('send.php', { method: 'POST', body: d }); j = await r.json(); if (!r.ok || !j.ok) throw new Error('send'); }
    f.reset(); if (ok) ok.hidden = false;
  } catch (_) {
    const body = [...d.entries()].filter(([k]) => k !== '_subject' && k !== 'website').map(([k, v]) => `${k} : ${v}`).join('\n');
    if (err) err.hidden = false;
    location.href = `mailto:jean63.echalier@gmail.com?subject=${encodeURIComponent(f.dataset.mail)}&body=${encodeURIComponent(body)}`;
  } finally { btn.disabled = false; }
}));

/* packs : préselection dans le formulaire */
$$('[data-pack]').forEach(a => a.addEventListener('click', () => { const s = $('select[name="Pack"]'); if (s) s.value = a.dataset.pack; }));
})();
