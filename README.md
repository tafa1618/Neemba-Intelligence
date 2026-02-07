# 🚀 Neemba Intelligence - MVP

**Système de Veille Concurrentielle pour Neemba Cat Sénégal**

Dashboard de démonstration avec données mockées pour le secteur Construction au Sénégal.

![Version](https://img.shields.io/badge/version-1.0.0-yellow)
![Status](https://img.shields.io/badge/status-MVP%20Demo-green)

---

## 📋 Description

Ce dashboard MVP vous permet de démontrer les capacités d'un système de veille concurrentielle intelligent pour Neemba Cat. Il surveille les concurrents **SMT (Komatsu)** et **Bia (Volvo)** dans le secteur Construction au Sénégal.

### Fonctionnalités

✅ **Dashboard Principal**
- KPIs en temps réel (opportunités, valeur pipeline, taux conversion)
- Graphiques d'évolution et parts de marché
- Top opportunités prioritaires

✅ **Pipeline d'Opportunités**
- Kanban board : Nouveau → Qualifié → Préparation → Soumis
- 12 projets construction réalistes (AGEROUTE, Port de Dakar, APIX, etc.)
- Scoring de probabilité et présence concurrents

✅ **Intelligence Concurrentielle**
- Profils détaillés SMT et Bia (forces/faiblesses)
- Parts de marché et projets en compétition
- Analyse stratégique

✅ **Alertes & Insights**
- Notifications intelligentes en temps réel
- Détection d'opportunités et mouvements concurrents
- Signaux d'achat clients

✅ **Base Clients**
- Aperçu enrichi de 8 clients échantillons
- Signaux d'achat détectés automatiquement
- Historique d'achats et CA annuel

---

## 🛠️ Installation

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Étapes

1. **Naviguer dans le dossier**
```bash
cd E:\cryo-sojourner
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

---

## 📦 Structure du Projet

```
E:\cryo-sojourner\
├── src/
│   ├── components/          # Composants React
│   │   ├── Dashboard.tsx    # Vue principale
│   │   ├── Pipeline.tsx     # Kanban opportunités
│   │   ├── Competitors.tsx  # Intelligence concurrentielle
│   │   ├── Alerts.tsx       # Flux d'alertes
│   │   ├── Clients.tsx      # Base clients
│   │   └── Sidebar.tsx      # Navigation
│   ├── data/                # Données mockées
│   │   ├── opportunities.ts # 12 projets construction Sénégal
│   │   ├── competitors.ts   # SMT, Bia, Neemba Cat
│   │   ├── alerts.ts        # 10 alertes intelligentes
│   │   └── clients.ts       # 8 clients échantillons
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # App principale
│   ├── main.tsx             # Entry point
│   └── index.css            # Styles globaux
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🎨 Technologies Utilisées

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS (glassmorphism, dark mode)
- **Charts**: Recharts
- **Icons**: Lucide React

---

## 📊 Données Mockées

### Projets Construction Sénégal (12)
- Autoroute Diamniadio-AIBD (650M CFA)
- Extension Port de Dakar (450M CFA)
- Construction Pont Thiès (150M CFA)
- Zone Industrielle Diass (280M CFA)
- Routes Kaolack (120M CFA)
- Aéroport Ziguinchor (320M CFA)
- Et 6 autres projets...

### Concurrents
- **SMT** - Komatsu (35% PDM)
- **Bia** - Volvo (28% PDM)
- **Neemba Cat** - Caterpillar (37% PDM - Leader)

### Clients Réels
Eiffage, AGEROUTE, APIX, Port de Dakar, CSE, SOGEA-SATOM, SENELEC, Ministère des Infrastructures

---

## 🎯 Utilisation pour Démo

### Scénario de Présentation

1. **Démarrer sur Dashboard** : Montrer les KPIs et graphiques
   - "12 opportunités actives pour 845M CFA"
   - "Nous sommes leader avec 37% de PDM"

2. **Aller sur Pipeline** : Montrer les projets par statut
   - "Voici nos projets en cours de qualification"
   - "On voit que SMT et Bia sont positionnés sur plusieurs"

3. **Intelligence Concurrentielle** : Analyser SMT et Bia
   - "Nous avons détecté les forces et faiblesses de chaque concurrent"
   - "SMT est agressif sur les prix, Bia sur le premium"

4. **Alertes** : Montrer les notifications
   - "5 alertes non lues, dont une opportunité chaude chez APIX"
   - "SMT approche notre client Eiffage - action requise"

5. **Clients** : Base enrichie
   - "Nos 3000 clients seront enrichis automatiquement"
   - "Détection de signaux d'achat en temps réel"

### Arguments Clés pour la Direction

💡 **ROI Potentiel**
- 2-3 marchés gagnés en plus = ROI massif
- Réduction du temps de veille : 80%

💡 **Avantage Concurrentiel**
- Détection opportunités avant SMT et Bia
- Insights stratégiques sur leurs mouvements

💡 **Scalabilité**
- Version complète : scraping automatique des marchés publics
- Agents IA pour analyse en temps réel

---

## 🚀 Prochaines Étapes (Après Approbation)

### Phase 1 : Données Réelles
- [ ] Import Excel des 3000 clients
- [ ] Connexion CRM existant

### Phase 2 : Backend & Scraping
- [ ] API FastAPI + PostgreSQL
- [ ] Scraper ARMP Sénégal (marchés publics)
- [ ] Scraper sites SMT et Bia

### Phase 3 : Intelligence IA
- [ ] Agent NLP pour analyse documents
- [ ] Système de scoring automatique
- [ ] Alertes email/SMS

### Phase 4 : Production
- [ ] Déploiement cloud sécurisé
- [ ] Formation équipes commerciales
- [ ] Monitoring et amélioration continue

---

## 📝 Notes Importantes

> ⚠️ **Cette version est une DÉMO avec données mockées**
> 
> Les projets, opportunités et alertes sont simulés mais **réalistes** pour le contexte sénégalais.
> La version production connectera des sources réelles (ARMP, web scraping, etc.)

---

## 👨‍💻 Développement

### Commandes Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

### Personnalisation

Les données mockées sont dans `src/data/`. Vous pouvez facilement :
- Ajouter de nouveaux projets dans `opportunities.ts`
- Modifier les profils concurrents dans `competitors.ts`
- Ajuster les alertes dans `alerts.ts`

---

## 📧 Contact

**Neemba Cat Sénégal**  
Système de Veille Concurrentielle v1.0  
MVP Démo - Février 2026

---

**Fait avec ❤️ pour Neemba Cat**
