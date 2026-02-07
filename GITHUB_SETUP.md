# Guide de Déploiement GitHub - Neemba Intelligence

## Étape 1 : Initialiser Git

Ouvrez un terminal PowerShell dans `E:\cryo-sojourner` et exécutez :

```bash
# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "Initial commit: MVP Dashboard Neemba Intelligence

- Dashboard with KPIs, charts and visualizations
- Pipeline Kanban board with 12 real Senegal construction projects
- Competitive intelligence (SMT/Komatsu, Bia/Volvo)
- Intelligent alerts system
- Client database with buying signals
- Premium dark mode design with glassmorphism
- Full documentation in French"
```

## Étape 2 : Créer le Repository GitHub

### Option A : Via l'Interface Web GitHub

1. Allez sur https://github.com
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez :
   - **Repository name** : `neemba-intelligence`
   - **Description** : "Système de Veille Concurrentielle pour Neemba Cat Sénégal - Construction Sector"
   - **Visibilité** : 
     - ✅ **Private** (recommandé - données sensibles)
     - ⬜ Public (si vous voulez le partager)
4. **NE PAS** cocher "Initialize with README" (vous en avez déjà un)
5. Cliquez **"Create repository"**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create neemba-intelligence --private --source=. --remote=origin
```

## Étape 3 : Lier et Pousser vers GitHub

Après avoir créé le repo, GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Ajouter le remote (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/neemba-intelligence.git

# Renommer la branche principale (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### Si vous utilisez SSH (recommandé)

```bash
# Au lieu de HTTPS
git remote add origin git@github.com:USERNAME/neemba-intelligence.git
git push -u origin main
```

## Étape 4 : Configuration Initiale (Première fois seulement)

Si c'est votre première utilisation de Git sur cette machine :

```bash
# Configurez votre identité
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@neemba.sn"
```

## Étape 5 : Vérification

Une fois poussé, vérifiez sur GitHub :
- Allez sur https://github.com/USERNAME/neemba-intelligence
- Vous devriez voir tous vos fichiers
- Le README.md s'affiche automatiquement en page d'accueil

## Fichiers Exclus (via .gitignore)

Ces fichiers ne seront PAS poussés vers GitHub :
- `node_modules/` (dépendances - trop volumineuses)
- `dist/` (build - généré localement)
- `*.log` (logs)
- Fichiers locaux temporaires

## Commandes Git Utiles pour la Suite

### Après avoir fait des modifications

```bash
# Voir les fichiers modifiés
git status

# Ajouter les modifications
git add .

# Commit avec message
git commit -m "Description des changements"

# Pousser vers GitHub
git push
```

### Créer une branche pour nouvelles fonctionnalités

```bash
# Créer et basculer sur nouvelle branche
git checkout -b feature/salesforce-integration

# Pousser la branche
git push -u origin feature/salesforce-integration
```

### Récupérer les changements (si travail en équipe)

```bash
git pull
```

## Structure du Repository

```
neemba-intelligence/
├── .gitignore              # Fichiers ignorés
├── README.md               # Documentation principale
├── package.json            # Dépendances npm
├── vite.config.ts          # Config Vite
├── tailwind.config.js      # Config Tailwind
├── tsconfig.json           # Config TypeScript
├── index.html              # Entry point HTML
└── src/
    ├── components/         # Composants React
    │   ├── Dashboard.tsx
    │   ├── Pipeline.tsx
    │   ├── Competitors.tsx
    │   ├── Alerts.tsx
    │   ├── Clients.tsx
    │   └── Sidebar.tsx
    ├── data/               # Données mockées
    │   ├── opportunities.ts
    │   ├── competitors.ts
    │   ├── alerts.ts
    │   └── clients.ts
    ├── types/
    │   └── index.ts        # TypeScript types
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

## Bonnes Pratiques

### Messages de Commit

Utilisez des messages clairs :
```bash
# Bon
git commit -m "Add SMT competitor analysis component"
git commit -m "Fix: Pipeline Kanban sorting issue"
git commit -m "Update: Client scoring algorithm"

# Mauvais
git commit -m "changes"
git commit -m "fix bug"
```

### Fréquence de Push

- **Après chaque fonctionnalité complète**
- **En fin de journée** (sauvegarde)
- **Avant de montrer à quelqu'un**

### Branches

Pour les grosses modifications, créez des branches :
```bash
git checkout -b feature/erp-integration
# ... travail ...
git add .
git commit -m "Add ERP data integration"
git push -u origin feature/erp-integration
# Ensuite : Pull Request sur GitHub pour review
```

## Sécurité

### Fichiers Sensibles

Si vous ajoutez des credentials plus tard :
```bash
# Créer .env pour secrets
echo "SALESFORCE_TOKEN=xxx" > .env

# Ajouter au .gitignore
echo ".env" >> .gitignore
```

⚠️ **JAMAIS** pusher :
- Mots de passe
- Tokens API
- Clés privées
- Données clients réelles (RGPD)

### Repository Privé

Pour données sensibles Neemba, gardez le repo **PRIVÉ** :
- Settings → Danger Zone → Change visibility → Private

## Collaboration (Optionnel)

Pour inviter des collègues :
1. GitHub → Repository → Settings → Collaborators
2. Add people → Entrez email/username
3. Ils peuvent alors cloner et contribuer

## Clone du Projet (Pour Autres Machines)

```bash
# Cloner le projet
git clone https://github.com/USERNAME/neemba-intelligence.git

# Aller dans le dossier
cd neemba-intelligence

# Installer dépendances
npm install

# Lancer
npm run dev
```

## Résolution de Problèmes

### Erreur "Permission denied"
→ Configurez SSH : https://docs.github.com/authentication/connecting-to-github-with-ssh

### Erreur "Repository not found"
→ Vérifiez l'URL du remote : `git remote -v`

### Conflits lors du push
→ `git pull` d'abord, résoudre conflits, puis `git push`

---

## 🎯 Commandes Complètes (Copier-Coller)

```bash
# 1. Initialisation
cd E:\cryo-sojourner
git init
git add .
git commit -m "Initial commit: MVP Dashboard Neemba Intelligence"

# 2. Lier au repo GitHub (remplacez USERNAME)
git remote add origin https://github.com/USERNAME/neemba-intelligence.git
git branch -M main
git push -u origin main
```

**Ensuite, votre code sera sauvegardé sur GitHub !** ✅
