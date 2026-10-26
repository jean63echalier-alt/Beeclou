/* Beeclou — assistant FAQ (sans serveur, réponses issues du contenu du site) */
(function () {
  'use strict';

  var KB = [
    { q: 'Combien coûte une campagne ?', k: ['prix', 'tarif', 'cout', 'combien', 'pack', 'budget', 'euro', 'devis'],
      a: 'Dès 270 € : 3 vélos pendant 1 mois (pack Éclair). Visibilité : 480 €/mois (6 vélos, 3 mois). Impact : 780 €/mois (12 vélos, 3 mois, rapport inclus). Premium : dès 1 100 €/mois (20 vélos et +, 6 mois et +).',
      link: ['Voir les packs', 'annonceur.html'] },
    { q: 'Y a-t-il des frais en plus ?', k: ['frais', 'supplement', 'visuel', 'creation', 'impression', 'pose', 'rapport'],
      a: 'Création du visuel : 150 € (offerte dès 3 mois). Impression et pose : 15 € par vélo. Rapport de diffusion : 100 € (inclus dès le pack Impact).' },
    { q: 'Comment lancer une campagne ?', k: ['commander', 'lancer', 'brief', 'annonceur', 'demarrer', 'delai', 'proposition', 'combien de temps'],
      a: 'Vous nous donnez votre brief (message, cible, quartier). Nous répondons avec une proposition de campagne sous 24 h, puis nous imprimons votre pub aux dimensions de la boîte.',
      link: ['Commander', 'index.html#contact'] },
    { q: 'Comment gagner de l\'argent à vélo ?', k: ['cycliste', 'gagner', 'gain', 'remuneration', 'paye', 'forfait', 'revenu', 'salaire', 'toucher'],
      a: 'Vous touchez un forfait par semaine de campagne active, versé chaque mois par virement : jusqu\'à 25 €/mois pendant la phase pilote. C\'est un maximum, pas un revenu garanti. Le forfait est dû en entier si vous roulez au moins 3 jours et 10 km dans la semaine.',
      link: ['Réserver ma boîte', 'cycliste.html'] },
    { q: 'Mon vélo convient-il ?', k: ['velo', 'porte-bagages', 'porte bagages', 'electrique', 'cargo', 'convient', 'compatible'],
      a: 'Il faut un porte-bagages qui supporte 25 kg minimum. Le magasin partenaire le vérifie avant la pose.' },
    { q: 'Que contient la boîte ?', k: ['boite', 'litres', '30', 'rangement', 'caution', 'proprietaire'],
      a: 'Un espace de rangement de 30 litres, utilisable au quotidien, avec la pub d\'une marque locale. La boîte reste à Beeclou et vous est prêtée (caution de 40 €). Pose et vérifications gratuites en magasin partenaire.' },
    { q: 'Où roulent les vélos ?', k: ['ou', 'quartier', 'ville', 'zone', 'trajet', 'itineraire', 'horaire'],
      a: 'Dans votre quartier : les cyclistes l\'habitent ou y font poser leur boîte. Ils roulent librement, sans rues ni horaires imposés.' },
    { q: 'Comment mesurez-vous les résultats ?', k: ['mesure', 'resultat', 'statistique', 'donnee', 'application', 'app', 'suivi', 'rapport'],
      a: 'Avec l\'application mobile, bientôt disponible : elle estime les personnes touchées par trajet, par quartier et sur toute la campagne. Les annonceurs reçoivent des données regroupées, jamais le suivi individuel d\'un cycliste.' },
    { q: 'Mes données sont-elles protégées ?', k: ['donnees', 'prive', 'confidentialite', 'rgpd', 'domicile', 'gps', 'localisation', 'vie privee'],
      a: 'Le suivi ne s\'active que si le cycliste le décide, et le début et la fin de chaque trajet sont ignorés pour protéger son domicile. Plus de détails dans notre politique de confidentialité.',
      link: ['Confidentialité', 'confidentialite.html'] },
    { q: 'Qui imprime et crée la pub ?', k: ['imprime', 'impression', 'creer', 'design', 'graphiste'],
      a: 'Nous. Nous créons le visuel avec vous, puis nous l\'imprimons aux dimensions de la boîte et l\'envoyons au cycliste qui la pose.' },
    { q: 'Où en est le projet ?', k: ['pilote', 'phase', 'lance', 'disponible', 'quand', 'ouvert'],
      a: 'Beeclou est en phase pilote ouverte : le premier vélo roule déjà en ville. Annonceurs et cyclistes peuvent rejoindre les premiers.',
      link: ['Rejoindre la phase pilote', 'index.html#contact'] },
    { q: 'Comment vous contacter ?', k: ['contact', 'joindre', 'email', 'mail', 'telephone', 'humain', 'parler', 'equipe'],
      a: 'Écrivez-nous à contact@beeclou.fr ou via le formulaire du site : réponse sous 24 h pour les annonceurs, 24 à 48 h pour les cyclistes.',
      link: ['Nous contacter', 'index.html#contact'] }
  ];
  var HELLO = ['bonjour', 'salut', 'coucou', 'hello', 'bonsoir'];
  var FALLBACK = 'Je n\'ai pas la réponse à cette question. Pour une réponse précise, écrivez-nous à contact@beeclou.fr.';

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function find(text) {
    var t = norm(text), best = null, score = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (w) { if (t.indexOf(w) !== -1) s += w.length > 3 ? 2 : 1; });
      if (s > score) { score = s; best = e; }
    });
    return score > 0 ? best : null;
  }

  var css = '' +
    '.bcc-btn{position:fixed;right:18px;bottom:18px;z-index:9998;width:56px;height:56px;border-radius:50%;border:0;background:#D9A927;color:#17130F;font-size:26px;cursor:pointer;box-shadow:0 10px 24px -8px rgba(60,40,10,.5)}' +
    '.bcc-btn:focus-visible,.bcc-chip:focus-visible,.bcc-send:focus-visible{outline:3px solid #17130F;outline-offset:2px}' +
    '.bcc-box{position:fixed;right:18px;bottom:88px;z-index:9999;width:min(360px,calc(100vw - 36px));max-height:min(540px,calc(100vh - 120px));display:none;flex-direction:column;background:#FCFAF4;color:#17130F;border:1px solid rgba(23,19,15,.14);border-radius:16px;box-shadow:0 22px 40px -18px rgba(60,40,10,.45);font:15px/1.45 "DM Sans",system-ui,sans-serif;overflow:hidden}' +
    '.bcc-box.open{display:flex}' +
    '.bcc-head{background:#17130F;color:#F7F3EA;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;font-weight:700}' +
    '.bcc-x{background:none;border:0;color:inherit;font-size:22px;cursor:pointer;line-height:1}' +
    '.bcc-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}' +
    '.bcc-m{max-width:88%;padding:9px 12px;border-radius:14px;white-space:pre-wrap}' +
    '.bcc-m.bot{background:#F7F3EA;border:1px solid rgba(23,19,15,.14);align-self:flex-start}' +
    '.bcc-m.me{background:#D9A927;align-self:flex-end}' +
    '.bcc-m a{color:#7E5D08;font-weight:700;display:inline-block;margin-top:6px}' +
    '.bcc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}' +
    '.bcc-chip{border:1px solid rgba(23,19,15,.25);background:#fff;border-radius:999px;padding:6px 11px;font:inherit;font-size:13px;cursor:pointer}' +
    '.bcc-form{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(23,19,15,.14)}' +
    '.bcc-in{flex:1;min-width:0;border:1px solid rgba(23,19,15,.25);border-radius:10px;padding:9px 11px;font:inherit;font-size:16px;background:#fff}' +
    '.bcc-send{border:0;border-radius:10px;background:#17130F;color:#F7F3EA;padding:0 14px;font:inherit;font-weight:700;cursor:pointer}';

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt) n.textContent = txt;
    return n;
  }

  function init() {
    var st = el('style'); st.textContent = css; document.head.appendChild(st);

    var btn = el('button', 'bcc-btn', '🐝');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Ouvrir l\'assistant Beeclou');
    btn.setAttribute('aria-expanded', 'false');

    var box = el('div', 'bcc-box');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Assistant Beeclou');
    var head = el('div', 'bcc-head');
    head.appendChild(el('span', '', 'Assistant Beeclou'));
    var x = el('button', 'bcc-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Fermer');
    head.appendChild(x);
    var log = el('div', 'bcc-log'); log.setAttribute('aria-live', 'polite');
    var chips = el('div', 'bcc-chips');
    var form = el('form', 'bcc-form');
    var inp = el('input', 'bcc-in'); inp.type = 'text'; inp.placeholder = 'Votre question…';
    inp.setAttribute('aria-label', 'Votre question'); inp.maxLength = 200; inp.autocomplete = 'off';
    var send = el('button', 'bcc-send', 'Envoyer'); send.type = 'submit';
    form.appendChild(inp); form.appendChild(send);
    [head, log, chips, form].forEach(function (n) { box.appendChild(n); });
    document.body.appendChild(box); document.body.appendChild(btn);

    function say(text, who, link) {
      var m = el('div', 'bcc-m ' + who, text);
      if (link) {
        var a = el('a', '', link[0] + ' →'); a.href = link[1];
        m.appendChild(document.createElement('br')); m.appendChild(a);
      }
      log.appendChild(m); log.scrollTop = log.scrollHeight;
    }
    function ask(text) {
      say(text, 'me');
      var t = norm(text), r = find(text);
      setTimeout(function () {
        if (r) say(r.a, 'bot', r.link);
        else if (HELLO.some(function (h) { return t.indexOf(h) !== -1; })) say('Bonjour ! Posez-moi une question sur les tarifs, les cyclistes ou le fonctionnement.', 'bot');
        else say(FALLBACK, 'bot', ['Nous contacter', 'index.html#contact']);
      }, 250);
    }

    KB.slice(0, 5).forEach(function (e) {
      var c = el('button', 'bcc-chip', e.q); c.type = 'button';
      c.addEventListener('click', function () { ask(e.q); });
      chips.appendChild(c);
    });

    var started = false;
    function toggle(open) {
      box.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        if (!started) { started = true; say('Bonjour 🐝 Je réponds à vos questions sur Beeclou : tarifs, cyclistes, fonctionnement.', 'bot'); }
        inp.focus();
      } else btn.focus();
    }
    btn.addEventListener('click', function () { toggle(!box.classList.contains('open')); });
    x.addEventListener('click', function () { toggle(false); });
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = inp.value.trim();
      if (v) { inp.value = ''; ask(v); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
