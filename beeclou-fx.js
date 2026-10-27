/* Beeclou : couche d'animation (GSAP + ScrollTrigger + Vanilla-Tilt). Optionnelle : sans elle ou sans CDN, le site reste complet. */
(function () {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.documentElement.classList.add('fx');

  /* barre de progression de lecture */
  var pb = document.createElement('div');
  pb.className = 'fx-progress'; pb.setAttribute('aria-hidden', 'true');
  document.body.appendChild(pb);
  gsap.to(pb, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* titre du hero : mots qui montent un à un */
  var h1 = $('.d--hero');
  if (h1) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
            var o = document.createElement('span'); o.className = 'fx-w';
            var i = document.createElement('span'); i.className = 'fx-wi'; i.textContent = t;
            o.appendChild(i); frag.appendChild(o);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) split(n);
      });
    })(h1);
    gsap.from('.fx-wi', { yPercent: 115, rotate: 4, duration: 0.9, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
    gsap.from('.depth__copy > *', { y: 22, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.7, clearProps: 'transform,opacity' });
  }

  /* portes : inclinaison 3D au survol (souris uniquement) */
  if (fine && window.VanillaTilt) {
    var doors = $$('.door');
    doors.forEach(function (d) { d.classList.add('fx-tilt'); });
    window.VanillaTilt.init(doors, { max: 5, speed: 600, perspective: 1200, glare: true, 'max-glare': 0.12, scale: 1.01 });
  }

  /* principe : lignes en cascade + pictos qui se dessinent */
  $$('.lines li').forEach(function (li, i) {
    var shapes = $$('svg path, svg rect, svg circle', li);
    shapes.forEach(function (s) {
      var len = s.getTotalLength ? s.getTotalLength() : 0;
      if (!len) return;
      s.style.strokeDasharray = len; s.style.strokeDashoffset = len;
      gsap.to(s, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', delay: 0.15,
        scrollTrigger: { trigger: li, start: 'top 85%', once: true } });
    });
    gsap.from($('span', li), { x: 28, opacity: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: li, start: 'top 88%', once: true } });
  });

  /* parallaxe douce sur les grandes photos */
  $$('#principe figure img, .pilot img').forEach(function (img) {
    gsap.fromTo(img, { scale: 1.14, yPercent: -5 }, { scale: 1, yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* chiffre de preuve : entrée en grand, valeur jamais animée depuis 0 */
  var big = $('.big');
  if (big) gsap.from(big, { scale: 0.86, yPercent: 8, opacity: 0, duration: 1, ease: 'power4.out',
    scrollTrigger: { trigger: big, start: 'top 85%', once: true } });

  /* le titre de chaque section se révèle par masque */
  $$('h2.d').forEach(function (h) {
    gsap.from(h, { clipPath: 'inset(0 0 100% 0)', y: 30, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 88%', once: true }, clearProps: 'clipPath,transform' });
  });

  window.addEventListener('load', function () { ST.refresh(); });
})();
