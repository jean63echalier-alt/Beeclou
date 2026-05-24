# ⚙️ Configuration Beeclou — À Faire Absolument

**3 étapes pour rendre le site fonctionnel.**

## 1️⃣ Ajouter les URLs des Formulaires Google

**Fichier:** `src/main.js` (Lignes 5-11)

### Avant (placeholder):
```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/d/e/YOUR_TESTER_FORM_ID/viewform?embedded=true'
}
```

### Après (exemple):
```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScX1234567890/viewform?embedded=true',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/d/e/1FAIpQLScAbcdefgh1234/viewform?embedded=true'
}
```

### Comment obtenir les URLs:

**Pour le sondage:**
1. Aller sur [forms.google.com](https://forms.google.com)
2. Créer un nouveau formulaire "Sondage Beeclou"
3. Ajouter vos questions
4. Cliquer **Envoyer** (triangle en haut à droite)
5. Cliquer **< >** (Intégrer)
6. Copier le `src="..."` (l'URL complète)
7. Coller dans `googleFormUrl`

**Pour le formulaire testeurs:**
1. Créer un autre formulaire "Devenir testeur"
2. Ajouter champs: Nom, Email, Téléphone, Ville, Conditions
3. Répéter étapes 3-7 ci-dessus
4. Coller dans `contactForm`

### ⚠️ Important:
- L'URL doit inclure `?embedded=true` (pour intégration)
- Elle doit commencer par `https://docs.google.com/forms/d/e/`
- Il y a 2 URLs à configurer (sondage + testeurs)

---

## 2️⃣ Ajouter les Liens Sociaux

**Fichier:** `src/main.js` (Lignes 5-11)

### Instagram:
```javascript
instagramUrl: 'https://instagram.com/VOTRE_PROFIL'
```

Exemple:
```javascript
instagramUrl: 'https://instagram.com/beeclou_mobility'
```

### Email de Contact:
```javascript
contactEmail: 'votre.email@example.com'
```

Exemple:
```javascript
contactEmail: 'hello@beeclou.fr'
```

---

## 3️⃣ Tester en Local

```bash
# Dans le terminal
npm run dev

# Ouvrir http://localhost:5173
# Cliquer sur les boutons pour vérifier les liens
```

**Vérifier que:**
- Sondage s'ouvre dans un onglet
- Formulaire testeurs s'ouvre
- Instagram pointe vers le bon compte
- Email s'ouvre dans le client mail

---

## 📋 Configuration Optionnelle

### Analytics (Google Analytics)

Ajouter dans `index.html` avant `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID');
</script>
```

Remplacer `G-YOUR_ID` par votre ID Google Analytics.

### Environment Variables (Optional)

Créer `.env.local`:

```
VITE_GOOGLE_FORM_ID=YOUR_FORM_ID
VITE_INSTAGRAM_URL=https://instagram.com/beeclou
VITE_CONTACT_EMAIL=hello@beeclou.com
```

*Note: Pour l'instant, config dans src/main.js est plus simple.*

---

## 🚀 Avant de Déployer

```bash
# 1. Éditer src/main.js avec vos URLs
# 2. Tester localement
npm run dev

# 3. Build pour vérifier
npm run build

# 4. Commit
git add src/main.js
git commit -m "config: Set production URLs"

# 5. Push
git push origin claude/beeclou-v1-site-57bFG

# 6. Vercel rebuilde automatiquement
# ✅ Site live avec les bonnes URLs!
```

---

## ✅ Checklist Configuration

- [ ] Sondage Google Form créé
- [ ] URL sondage copié dans `googleFormUrl`
- [ ] Formulaire testeurs créé
- [ ] URL formulaire copié dans `contactForm`
- [ ] Instagram URL mis à jour
- [ ] Email de contact correct
- [ ] Testé en local (`npm run dev`)
- [ ] Buttons cliquables testés
- [ ] Build réussi (`npm run build`)
- [ ] Push vers GitHub
- [ ] Vercel rebuilt
- [ ] Site live en https://beeclou.vercel.app

---

## 🆘 Si Ça Ne Fonctionne Pas

### Les boutons ne font rien

**Cause:** URLs mal formées

**Solution:**
```javascript
// ❌ MAUVAIS
googleFormUrl: 'google.com/forms/...'

// ✅ BON
googleFormUrl: 'https://docs.google.com/forms/d/e/XXXXXX/viewform?embedded=true'
```

### Message d'avertissement console

**Si vous voyez:**
```
⚠️  Veuillez configurer les URLs dans src/main.js
```

**Cause:** URLs encore en placeholder

**Solution:**
- Vérifier que `YOUR_FORM_ID` a été remplacé
- Vérifier la URL commence par `https://`

### Google Form ne s'ouvre pas

**Cause:** URL incorrecte ou account non autorisé

**Solution:**
1. Tester l'URL directement dans le navigateur
2. Vérifier que le formulaire est accessible publiquement
3. S'il est privé, changer settings → "Toute personne avec le lien peut remplir"

### Instagram/Email ne fonctionne pas

**Pour Instagram:**
```javascript
// ❌ MAUVAIS
instagramUrl: '@beeclou'      // ❌ Pas de @
instagramUrl: 'instagram.com'  // ❌ URL incomplète

// ✅ BON
instagramUrl: 'https://instagram.com/beeclou'
```

**Pour Email:**
```javascript
// ❌ MAUVAIS
contactEmail: 'hello'          // ❌ Pas de domaine

// ✅ BON
contactEmail: 'hello@beeclou.fr'
```

---

## 📞 Support

Si vous avez des questions:

1. **Consulter les guides:**
   - QUICKSTART.md (déploiement rapide)
   - DEPLOYMENT.md (détails Vercel)
   - CUSTOMIZATION.md (personnalisation)

2. **Vérifier la console:**
   - Chrome DevTools → Console
   - Voir les erreurs JavaScript

3. **Tester en local:**
   ```bash
   npm run dev
   # http://localhost:5173
   ```

---

## 🎯 Important!

**TROIS CHOSES À FAIRE OBLIGATOIREMENT:**

1. ✅ Remplacer les URLs Google Forms
2. ✅ Ajouter votre Instagram
3. ✅ Ajouter votre email de contact

**APRÈS CES 3 ÉTAPES:**

1. Tester localement
2. Push vers GitHub
3. Vercel déploie automatiquement
4. Site live avec vos URLs! 🚀

---

Made with 🐝 for better urban mobility.
