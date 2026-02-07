# 🚀 Déploiement GitHub Pages - Guide Complet

## ✅ Configuration Terminée

J'ai configuré votre projet pour le déploiement automatique sur GitHub Pages :

### Fichiers Créés/Modifiés

1. **`.github/workflows/deploy.yml`** - Workflow GitHub Actions
2. **`vite.config.ts`** - Ajout du `base` path pour GitHub Pages

---

## 📋 Étapes de Déploiement

### 1. **Push vers GitHub** (Via VS Code)

1. Ouvrez le panneau **Source Control** (Ctrl+Shift+G)
2. Stage tous les fichiers (cliquez sur **+** à côté de "Changes")
3. Message de commit : `"Setup GitHub Pages deployment"`
4. Cliquez **"Commit"**
5. Cliquez **"Sync Changes"** ou **"Push"**

### 2. **Activer GitHub Pages**

1. Allez sur votre repo GitHub : `https://github.com/VOTRE-USERNAME/neemba-intelligence`
2. Cliquez sur **Settings** (en haut)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez :
   - Source: **GitHub Actions**
5. Sauvegardez

### 3. **Vérifier le Déploiement**

1. Allez dans l'onglet **Actions** de votre repo
2. Vous verrez le workflow "Deploy to GitHub Pages" en cours
3. Attendez 2-3 minutes (⏱️ build + deploy)
4. Une fois terminé (✅ vert), votre app sera live !

---

## 🌐 URL de Votre Application

Votre app sera accessible à :

```
https://VOTRE-USERNAME.github.io/neemba-intelligence/
```

*(Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub)*

---

## 🔄 Déploiements Futurs

**Automatique !** Chaque fois que vous pushez vers la branche `main`, GitHub Actions :
1. ✅ Build automatiquement votre app
2. ✅ Déploie sur GitHub Pages
3. ✅ Met à jour le site en 2-3 minutes

---

## 🐛 Dépannage

### Si le build échoue dans GitHub Actions

Le workflow ignore les warnings TypeScript non-critiques. Si ça échoue quand même :

1. Vérifiez les logs dans l'onglet **Actions**
2. Les erreurs critiques seront affichées en rouge
3. Contactez-moi avec le message d'erreur

### Si la page affiche une erreur 404

1. Vérifiez que GitHub Pages est activé (Settings → Pages)
2. Vérifiez que la source est bien **GitHub Actions**
3. Attendez 5 minutes après le premier déploiement

---

## 🎉 C'est Tout !

Votre dashboard Neemba Intelligence sera bientôt en ligne ! 🚀
