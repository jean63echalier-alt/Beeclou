/* Beeclou v3 : profondeur au scroll, aperçu de boîte, formulaires. Sans dépendance. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* header : fond plein après le hero */
  var bar = $('.bar');
  function onBar() { if (bar) bar.classList.toggle('is-solid', window.scrollY > 40); }
  onBar();

  /* hero en couches : une seule valeur --p (0 à 1) pilote tous les plans */
  var depth = $('[data-depth]');
  var ticking = false;
  function updateDepth() {
    ticking = false;
    onBar();
    if (!depth || reduce) return;
    var h = depth.offsetHeight - window.innerHeight;
    if (h <= 0) return;
    var p = clamp((window.scrollY - depth.offsetTop) / h, 0, 1);
    depth.style.setProperty('--p', p.toFixed(4));
    depth.classList.toggle('is-past', p > 0.35);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateDepth); }
  }, { passive: true });
  window.addEventListener('resize', updateDepth);
  updateDepth();

  /* apparitions : visibles par défaut sans JS ; déclenchées tôt, jamais bloquées si on saute plus bas */
  var ins = $$('[data-in]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px 14% 0px' });
    ins.forEach(function (el, i) { el.style.setProperty('--i', (i % 4)); io.observe(el); });
    setTimeout(function () { ins.forEach(function (el) { el.classList.add('in'); }); }, 4000);
  } else { ins.forEach(function (el) { el.classList.add('in'); }); }

  /* chiffre de preuve : valeur réelle en dur dans le HTML, aucune animation depuis 0 */

  /* parcours : l'image suit l'étape au centre */
  var steps = $$('.step');
  if (steps.length && 'IntersectionObserver' in window) {
    var imgs = $$('.steps__media img');
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        steps.forEach(function (s) { s.classList.toggle('on', s === e.target); });
        var n = parseInt(e.target.getAttribute('data-img'), 10) || 0;
        imgs.forEach(function (im, i) { im.classList.toggle('on', i === n); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { so.observe(s); });
    if (imgs[0]) imgs[0].classList.add('on');
    if (steps[0]) steps[0].classList.add('on');
  } else { steps.forEach(function (s) { s.classList.add('on'); }); $$('.steps__media img')[0] && $$('.steps__media img')[0].classList.add('on'); }

  /* aperçu : votre marque sur la boîte */
  var face = $('#face');
  if (face) {
    var nameIn = $('#bx-name'), tagIn = $('#bx-tag');
    var nm = $('.nm', face), tg = $('.tg', face);
    var themes = {
      miel:   { fc: '#F2EAD6', f1: '#D9B12A', f2: '#EBA58D', fi: '#17130F', label: 'Miel' },
      saumon: { fc: '#EBA58D', f1: '#F2EAD6', f2: '#D9B12A', fi: '#17130F', label: 'Saumon' },
      encre:  { fc: '#1F1A15', f1: '#D9B12A', f2: '#4A3F33', fi: '#F7F3EA', label: 'Encre' },
      sauge:  { fc: '#DCE3D2', f1: '#8FA68A', f2: '#F2EAD6', fi: '#17130F', label: 'Sauge' }
    };
    var cur = 'miel';
    function fit() {
      var txt = nameIn.value.trim() || 'Votre marque';
      nm.textContent = txt;
      var max = face.clientWidth * 0.82;
      var fs = face.clientHeight * 0.34;
      nm.style.fontSize = fs + 'px';
      var guard = 0;
      while (nm.scrollWidth > max && fs > 10 && guard++ < 60) { fs *= 0.94; nm.style.fontSize = fs + 'px'; }
      var tag = tagIn.value.trim();
      tg.textContent = tag;
      tg.style.display = tag ? '' : 'none';
      nm.style.transform = tag ? 'translateY(-70%)' : 'translateY(-52%)';
      $('#pv-name') && ($('#pv-name').value = txt === 'Votre marque' ? '' : txt);
    }
    function paint(k) {
      cur = k; var t = themes[k];
      face.style.setProperty('--fc', t.fc); face.style.setProperty('--f1', t.f1);
      face.style.setProperty('--f2', t.f2); face.style.setProperty('--fi', t.fi);
      $('#pv-theme') && ($('#pv-theme').value = t.label);
      fit();
    }
    nameIn.addEventListener('input', fit);
    tagIn.addEventListener('input', fit);
    $$('input[name="theme"]').forEach(function (r) { r.addEventListener('change', function () { paint(r.value); }); });
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    paint('miel');
    var go = $('#bx-go');
    if (go) go.addEventListener('click', function () {
      var ent = $('#f-ent'); if (ent && nameIn.value.trim()) ent.value = nameIn.value.trim();
      var chip = $('#chip');
      if (chip) {
        chip.classList.add('on');
        $('#chip-t').textContent = 'Aperçu joint : « ' + (nameIn.value.trim() || 'Votre marque') + ' », couleur ' + themes[cur].label;
        $('#chip-sw').style.background = themes[cur].fc;
      }
    });
  }

  /* packs -> select du formulaire */
  $$('[data-pack]').forEach(function (b) {
    b.addEventListener('click', function () {
      var s = $('#f-pack'); if (s) s.value = b.getAttribute('data-pack');
    });
  });

  /* formulaires : POST send.php, sinon mailto */
  $$('form[data-send]').forEach(function (f) {
    var msg = $('.fmsg', f), btn = $('button[type=submit]', f);
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!f.reportValidity()) return;
      var fd = new FormData(f);
      btn.disabled = true; msg.className = 'fmsg'; msg.textContent = 'Envoi…';
      fetch('send.php', { method: 'POST', body: fd })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j.ok) throw new Error(j.msg || 'fail');
          msg.className = 'fmsg ok';
          msg.textContent = 'Merci, votre demande est bien envoyée. ' + f.getAttribute('data-delay');
          f.reset(); btn.disabled = false;
        })
        .catch(function () {
          var body = [];
          fd.forEach(function (v, k) { if (k !== 'website' && k !== '_subject' && v) body.push(k + ' : ' + v); });
          msg.className = 'fmsg err';
          msg.innerHTML = 'L’envoi automatique a échoué. <a href="mailto:jean63.echalier@gmail.com?subject=' +
            encodeURIComponent(fd.get('_subject') || 'Demande Beeclou') + '&body=' + encodeURIComponent(body.join('\n')) +
            '">Envoyer par e-mail</a>.';
          btn.disabled = false;
        });
    });
  });

  /* suivi des clics : Plausible, GA4 ou dataLayer s'ils sont installés, sinon ne fait rien */
  function track(name, props) {
    try {
      if (window.plausible) window.plausible(name, { props: props });
      if (window.gtag) window.gtag('event', name, props);
      if (window.dataLayer) window.dataLayer.push({ event: name, props: props });
    } catch (e) {}
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a.btn, button.btn, [data-evt]');
    if (!a) return;
    track('cta_click', { id: a.getAttribute('data-evt') || (a.textContent || '').trim().slice(0, 40), page: location.pathname });
  });
  $$('form[data-send]').forEach(function (f) { f.addEventListener('submit', function () { track('form_submit', { form: f.getAttribute('data-form') || f.id || 'form', page: location.pathname }); }); });

  var y = $('#yr'); if (y) y.textContent = new Date().getFullYear();
})();
