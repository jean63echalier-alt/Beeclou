# 🚀 Guide de Déploiement Beeclou sur Vercel

Déploiement automatique : **Git push → Vercel rebuild → Site live**

## 1️⃣ Prérequis

- ✅ Compte GitHub
- ✅ Compte Vercel (gratuit, créé avec GitHub)
- ✅ Accès au domaine `beeclou.fr` (registrar OVH, Namecheap, etc.)

## 2️⃣ Étape 1 : Code prêt sur GitHub

```bash
# Le code Vite doit être pushé sur GitHub
git push -u origin claude/beeclou-v1-site-57bFG

# Vérifier : https://github.com/jean63echalier-alt/Beeclou
```

### Vérifier que le repo contient :

```
✓ package.json (scripts npm run dev/build)
✓ index.html (HTML principal)
✓ src/main.js (JavaScript interactif)
✓ src/styles.css (Styles)
✓ vite.config.js (Config Vite)
✓ dist/ (généré au build)
✓ README.md (documentation)
```

## 3️⃣ Étape 2 : Connecter à Vercel

### Option A : Via l'interface web

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Sign in** avec GitHub (OAuth)
3. **Import Project**
4. Sélectionner le repo `jean63echalier-alt/Beeclou`
5. Vérifier la branche : `claude/beeclou-v1-site-57bFG`

### Configuration Automatique

Vercel détecte :
- ✅ Framework : Vite
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `dist`

**Ne rien changer**, cliquer **Deploy**

### Résultat

```
✅ Deployment successful!
🎉 Site live sur https://beeclou.vercel.app
```

**Vous avez 2-3 minutes pour accéder au site.**

## 4️⃣ Étape 3 : Connecter le domaine beeclou.fr

### Dans Vercel (Dashboard)

1. Sélectionner le **Projet Beeclou**
2. Aller à **Settings** → **Domains**
3. Cliquer **Add Domain**
4. Entrer : `beeclou.fr`
5. Cliquer **Add**

Vercel affiche :

```
Domain: beeclou.fr
Status: Pending
```

### Dans votre Registrar DNS

Selon votre registrar (OVH, Namecheap, Gandi, Google Domains, etc.) :

#### Option 1 : Nameservers Vercel (RECOMMANDÉ)

1. Copier les **4 nameservers** que Vercel affiche
2. Aller dans votre registrar (ex. OVH.com)
3. Modifier les **Nameservers** du domaine
4. Remplacer par les nameservers Vercel
5. **Attendre 24-48h** (ou quelques minutes si chance)

**Exemple OVH :**
```
1. OVH Control Panel → Domains
2. Sélectionner beeclou.fr
3. Onglet "DNS"
4. Modifier les nameservers
5. Ajouter nameservers Vercel
```

#### Option 2 : Records DNS Manuels (CNAME)

Si vous utilisez un autre DNS (CloudFlare, Route53, etc.) :

```
Type    Name                 Value
------- -------------------- ----------------------------
CNAME   www.beeclou.fr       → cname.vercel.domains
CNAME   beeclou.fr           → (alias ou CNAME direkt)
A       beeclou.fr           → 76.76.19.165 (IP Vercel)
```

*Note: Les détails exacts dépendent du registrar.*

### Vérifier la propagation

```bash
# Terminal
nslookup beeclou.fr

# Ou utiliser : https://mxtoolbox.com/nslookup.aspx
```

Quand vous voyez `vercel.com` dans les résultats → **C'est bon!**

## 5️⃣ Étape 4 : Ajouter www.beeclou.fr

Dans Vercel → Domains :

1. Ajouter aussi `www.beeclou.fr`
2. Configurer la redirection (Settings)
   - Rediriger `www` vers `beeclou.fr` (optionnel)

## 6️⃣ Étape 5 : Certificat SSL (Automatique)

Vercel ajoute automatiquement un certificat SSL Let's Encrypt :

```
✅ https://beeclou.fr (HTTPS activé)
🔒 Certificat valide
```

*Rien à faire, c'est automatique.*

## 7️⃣ Étape 6 : Déploiement Automatique

À partir de maintenant, **chaque push déclenche un redéploiement automatique** :

```bash
# Vous modifiez le code en local
echo "Nouveau texte" >> index.html

# Vous commitez et poussez
git add .
git commit -m "Update hero text"
git push origin claude/beeclou-v1-site-57bFG

# ✅ Vercel détecte le push
# ✅ Rebuild du site
# ✅ Déploiement automatique
# ✅ Site mis à jour en ~2 minutes
```

## 📋 Configuration des Environnements

### Dans Vercel Dashboard

**Settings** → **Environment Variables**

Ajouter :

```
VITE_GOOGLE_FORM_ID = YOUR_FORM_ID_HERE
VITE_INSTAGRAM_URL = https://instagram.com/beeclou
VITE_CONTACT_EMAIL = hello@beeclou.com
```

Ces variables sont injectées lors du build.

### Ou modifier dans le code

Éditer `src/main.js` :

```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com'
}
```

## 🔍 Vérification du Déploiement

### 1. URL accessible

```bash
curl https://beeclou.fr
# Doit retourner le HTML du site
```

### 2. Performance (Lighthouse)

```
Aller sur https://beeclou.fr
Chrome DevTools → Lighthouse → Run audit
```

**Objectif** : Score 90+

### 3. HTTPS

```bash
https://beeclou.fr
# 🔒 Certificat valide (Check le cadenas)
```

## 📊 Monitoring & Analytics

### Vercel Analytics (Gratuit)

1. **Settings** → **Analytics**
2. Activer **Vercel Web Analytics**

Voir les stats en live.

### Google Analytics (Optionnel)

1. Créer un compte Google Analytics
2. Ajouter le tracking code à `index.html` :

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

## 🆘 Troubleshooting

### Erreur: "Build failed"

**Cause** : Configuration Vercel incorrecte

**Solution** :

```bash
# 1. Vérifier que le build fonctionne en local
npm install
npm run build

# 2. Vérifier que dist/ est généré
ls dist/
# Doit montrer : index.html, assets/

# 3. Vérifier .gitignore
cat .gitignore
# Ne doit PAS contenir : dist/

# 4. Si nécessaire, éditer vercel.json
```

### Site vide ou 404

**Cause** : Mauvaise configuration du output directory

**Solution** :

Vercel → Settings → Build & Development

```
Build Output Directory: dist
```

Doit être exactement `dist`

### Domaine pointe vers mauvais site

**Cause** : Anciens nameservers DNS

**Solution** :

1. Attendre 48h pour la propagation
2. Ou forcer le flush DNS :

```bash
# Mac
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved

# Windows
ipconfig /flushdns
```

### Certificat SSL non valide

**Cause** : Très rare avec Vercel

**Solution** :

1. Attendre 5 min
2. Actualiser (Ctrl+Shift+R)
3. Contacter support Vercel

## ✅ Checklist Final

- [ ] Code sur GitHub branche `claude/beeclou-v1-site-57bFG`
- [ ] Vercel compte créé
- [ ] Repo importé dans Vercel
- [ ] Build réussi (`npm run build` en local fonctionne)
- [ ] Site live sur `https://beeclou.vercel.app`
- [ ] Domaine ajouté dans Vercel
- [ ] DNS configuré (nameservers ou CNAME)
- [ ] Accès à `https://beeclou.fr` fonctionne
- [ ] Certificat SSL activé (🔒)
- [ ] Lighthouse score 90+
- [ ] URLs configurées dans `src/main.js`
- [ ] Google Forms liés
- [ ] Analytics (optionnel) activé

## 📞 Support

**Si ça bloque :**

1. Vérifier logs Vercel → Dashboard → Deployments
2. Relancer le build : Dashboard → Deployments → Redeploy
3. Contacter Vercel support : vercel.com/support

**Pour les DNS :**

1. Voir documentation du registrar
2. Utiliser [mxtoolbox.com](https://mxtoolbox.com) pour vérifier
3. Attendre la propagation (24-48h max)

## 🎉 Vous êtes live!

```
✅ https://beeclou.fr → Site en ligne
✅ Déploiement automatique à chaque push
✅ HTTPS sécurisé
✅ Performant (Vercel CDN)
✅ Maintenabilité facile (Git + Vercel)
```

---

**Beeclou est maintenant accessible au monde entier! 🌍**

Chaque modification du code → Push GitHub → Vercel rebuilde → Site mis à jour en 2 min.

*Made with 🐝 for better urban mobility.*
