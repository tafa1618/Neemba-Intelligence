# 📊 Guide d'Extraction de Données - Neemba Intelligence

## Vue d'ensemble

Ce document liste toutes les tables et champs à extraire de Salesforce et de l'ERP Neemba pour alimenter le système d'intelligence concurrentielle.

---

## 🔵 SALESFORCE - Tables à Exporter

### 1. Opportunités (Opportunity)

**Fréquence** : Hebdomadaire (MVP) → Quotidien (Production)  
**Format** : CSV ou JSON  
**Nom fichier** : `salesforce_opportunities.csv`

**Requête SOQL** :
```sql
SELECT 
    Id,
    Name,
    AccountId,
    Account.Name,
    Amount,
    Probability,
    StageName,
    CloseDate,
    Type,
    LeadSource,
    Description,
    NextStep,
    CreatedDate,
    LastModifiedDate,
    OwnerId,
    Owner.Name,
    Owner.Email,
    IsClosed,
    IsWon,
    
    -- Champs custom (si existants)
    Sector__c,
    Equipment_Type__c,
    Competitor__c,
    Region__c
    
FROM Opportunity
WHERE CreatedDate >= LAST_N_MONTHS:12
ORDER BY CreatedDate DESC
```

**Champs critiques** :
- ✅ `Name` - Nom du projet
- ✅ `Account.Name` - Nom client
- ✅ `Amount` - Montant en CFA
- ✅ `Probability` - Probabilité de gain (%)
- ✅ `StageName` - Étape du pipeline
- ✅ `CloseDate` - Date clôture prévue
- ✅ `Owner.Email` - Email commercial (pour alertes)

---

### 2. Comptes Clients (Account)

**Fréquence** : Hebdomadaire  
**Format** : CSV  
**Nom fichier** : `salesforce_accounts.csv`

**Requête SOQL** :
```sql
SELECT 
    Id,
    Name,
    Type,
    Industry,
    BillingCity,
    BillingCountry,
    Phone,
    Website,
    NumberOfEmployees,
    AnnualRevenue,
    CreatedDate,
    LastModifiedDate,
    LastActivityDate,
    OwnerId,
    Owner.Name,
    
    -- Champs custom
    Sector__c,
    Region__c,
    Fleet_Size__c,
    Preferred_Brand__c
    
FROM Account
WHERE Type IN ('Customer', 'Prospect')
ORDER BY LastModifiedDate DESC
```

**Champs critiques** :
- ✅ `Name` - Nom entreprise (clé de mapping ERP)
- ✅ `Type` - Customer ou Prospect
- ✅ `Industry` - Secteur d'activité
- ✅ `BillingCity` - Ville
- ✅ `LastActivityDate` - Dernière activité

---

### 3. Contacts (Contact)

**Fréquence** : Hebdomadaire  
**Format** : CSV  
**Nom fichier** : `salesforce_contacts.csv`

**Requête SOQL** :
```sql
SELECT 
    Id,
    FirstName,
    LastName,
    Email,
    Phone,
    Title,
    AccountId,
    Account.Name,
    Department,
    OwnerId,
    Owner.Email
    
FROM Contact
WHERE Email != NULL
AND Account.Type = 'Customer'
```

**Utilisation** : Alertes et notifications

---

### 4. Activités Récentes (Task)

**Fréquence** : Hebdomadaire  
**Format** : CSV  
**Nom fichier** : `salesforce_activities.csv`

**Requête SOQL** :
```sql
SELECT 
    Id,
    Subject,
    Status,
    ActivityDate,
    WhoId,
    WhatId,
    OwnerId,
    Description,
    Type
    
FROM Task
WHERE ActivityDate >= LAST_N_DAYS:90
ORDER BY ActivityDate DESC
```

**Utilisation** : Analyse engagement client

---

## 🟢 ERP NEEMBA - Tables à Exporter

### 1. Historique Ventes / Factures

**Table ERP** : `sales_invoices` ou `invoices` ou `orders`  
**Fréquence** : Hebdomadaire  
**Format** : CSV  
**Nom fichier** : `erp_sales_history.csv`

**Requête SQL** :
```sql
SELECT 
    customer_id,
    customer_name,
    invoice_number,
    invoice_date,
    total_amount,
    payment_status,
    payment_date,
    
    -- Détails équipements
    equipment_category,
    equipment_model,
    equipment_serial,
    quantity,
    unit_price,
    
    -- Informations projet
    project_name,
    project_sector,
    project_location,
    
    -- Commercial
    sales_rep_name,
    sales_rep_email
    
FROM sales_invoices
WHERE invoice_date >= DATE_SUB(CURDATE(), INTERVAL 24 MONTH)
ORDER BY invoice_date DESC
```

**Champs critiques** :
- ✅ `customer_name` - Nom client (clé de mapping Salesforce)
- ✅ `invoice_date` - Date facture
- ✅ `total_amount` - Montant total
- ✅ `equipment_model` - Modèle équipement vendu
- ✅ `project_sector` - Secteur (Construction, Mines, Énergie)

---

### 2. Contrats de Maintenance

**Table ERP** : `service_contracts` ou `maintenance_agreements`  
**Fréquence** : Mensuelle  
**Format** : CSV  
**Nom fichier** : `erp_service_contracts.csv`

**Requête SQL** :
```sql
SELECT 
    contract_id,
    customer_id,
    customer_name,
    contract_start_date,
    contract_end_date,
    contract_value,
    contract_status,
    equipment_covered,
    service_level,
    renewal_date,
    auto_renewal
    
FROM service_contracts
WHERE contract_end_date >= CURDATE()
   OR contract_end_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
ORDER BY contract_end_date ASC
```

**Utilisation** : Signaux de renouvellement

---

### 3. Commandes Pièces Détachées

**Table ERP** : `spare_parts_orders` ou `parts_sales`  
**Fréquence** : Hebdomadaire  
**Format** : CSV  
**Nom fichier** : `erp_spare_parts.csv`

**Requête SQL** :
```sql
SELECT 
    customer_id,
    customer_name,
    order_date,
    part_number,
    part_description,
    quantity,
    unit_price,
    total_amount,
    equipment_model,
    urgency_level
    
FROM spare_parts_orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
ORDER BY order_date DESC
```

**Utilisation** : Détection équipements vieillissants

---

### 4. Parc Équipements Clients

**Table ERP** : `customer_equipment_fleet` ou `equipment_registry`  
**Fréquence** : Mensuelle  
**Format** : CSV  
**Nom fichier** : `erp_customer_fleet.csv`

**Requête SQL** :
```sql
SELECT 
    customer_id,
    customer_name,
    equipment_serial,
    equipment_model,
    equipment_category,
    purchase_date,
    warranty_end_date,
    last_service_date,
    next_service_due,
    hours_operated,
    equipment_status,
    location
    
FROM customer_equipment_fleet
WHERE equipment_status = 'Active'
ORDER BY customer_name, purchase_date DESC
```

**Utilisation** : Prédiction besoins remplacement

---

## 📋 CHECKLIST D'EXTRACTION

### Phase MVP (Minimum Viable Product)

**Salesforce** :
- [ ] `salesforce_opportunities.csv` (12 derniers mois)
- [ ] `salesforce_accounts.csv` (clients actifs)
- [ ] `salesforce_contacts.csv` (avec emails)

**ERP** :
- [ ] `erp_sales_history.csv` (24 derniers mois)
- [ ] `erp_customer_fleet.csv` (équipements actifs)

**Total fichiers MVP** : 5 fichiers CSV

---

### Phase Production (Système Complet)

**Salesforce** :
- [ ] `salesforce_opportunities.csv`
- [ ] `salesforce_accounts.csv`
- [ ] `salesforce_contacts.csv`
- [ ] `salesforce_activities.csv`

**ERP** :
- [ ] `erp_sales_history.csv`
- [ ] `erp_service_contracts.csv`
- [ ] `erp_spare_parts.csv`
- [ ] `erp_customer_fleet.csv`

**Total fichiers Production** : 8 fichiers CSV

---

## 🔄 MAPPING SALESFORCE ↔ ERP

### Clé de Liaison

**Champ principal** : Nom client (`Account.Name` ↔ `customer_name`)

**Normalisation requise** :
- Supprimer espaces multiples
- Convertir en majuscules
- Retirer suffixes (SA, SARL, Ltd, etc.)

**Exemple de mapping** :
```
Salesforce: "APIX S.A."
ERP:        "APIX"
Match:      ✅ OUI (après normalisation)
```

---

## 📁 STRUCTURE FICHIERS CSV

### Format Standard

**Encodage** : UTF-8  
**Séparateur** : `,` (virgule)  
**Guillemets** : `"` pour champs avec virgules  
**Format dates** : `YYYY-MM-DD` (ex: 2026-02-07)  
**Format montants** : Nombres sans séparateurs (ex: 280000000)

### Exemple `salesforce_opportunities.csv`

```csv
Id,Name,Account.Name,Amount,Probability,StageName,CloseDate,Sector__c,Equipment_Type__c,Owner.Email
006xxx,Projet APIX Terminal,APIX,280000000,75,Qualification,2026-03-15,Construction,Bulldozer,amadou.diop@neemba.com
006yyy,Extension Port Dakar,Port Autonome Dakar,450000000,60,Prospection,2026-04-20,Construction,Grue,fatou.sall@neemba.com
```

### Exemple `erp_sales_history.csv`

```csv
customer_id,customer_name,invoice_date,total_amount,equipment_model,project_sector,sales_rep_email
CUST001,APIX,2025-08-15,45000000,CAT 320D,Construction,amadou.diop@neemba.com
CUST002,Port Autonome Dakar,2025-09-20,38000000,CAT 950H,Construction,fatou.sall@neemba.com
```

---

## 🎯 SIGNAUX D'ACHAT À CALCULER

À partir des données extraites, le système calculera automatiquement :

### 1. Fréquence d'Achat
- **Formule** : Jours depuis dernier achat
- **Signal** : < 180 jours = Haute fréquence

### 2. Valeur Client (LTV)
- **Formule** : Somme achats 24 derniers mois
- **Signal** : > 50M CFA = Client premium

### 3. Tendance Achats
- **Formule** : Revenus 6 derniers mois vs 6 mois précédents
- **Signal** : Croissance > 20% = Client en expansion

### 4. Équipements Vieillissants
- **Formule** : Âge équipement > 5 ans
- **Signal** : Besoin remplacement probable

### 5. Contrat Expirant
- **Formule** : Jours avant fin contrat < 90
- **Signal** : Opportunité renouvellement

### 6. Maintenance Intensive
- **Formule** : > 5 commandes pièces en 3 mois
- **Signal** : Équipement usé, remplacement proche

---

## 🚀 PROCÉDURE D'EXTRACTION

### Étape 1 : Salesforce

1. Aller dans **Setup** → **Data Export**
2. Ou utiliser **Data Loader** (recommandé)
3. Ou **Workbench** (https://workbench.developerforce.com)
4. Copier/coller les requêtes SOQL ci-dessus
5. Exporter en CSV

### Étape 2 : ERP

1. Accéder à l'interface d'extraction ERP
2. Sélectionner les tables listées
3. Appliquer les filtres de dates
4. Exporter en CSV

### Étape 3 : Validation

- [ ] Vérifier encodage UTF-8
- [ ] Vérifier format dates
- [ ] Vérifier absence valeurs nulles critiques
- [ ] Compter nombre de lignes (> 0)

### Étape 4 : Import Dashboard

1. Placer les CSV dans `E:\cryo-sojourner\data\imports\`
2. Exécuter script de transformation (à créer)
3. Vérifier données dans dashboard

---

## 📞 CONTACTS & SUPPORT

**Questions Salesforce** : IT Neemba  
**Questions ERP** : Service Informatique  
**Questions Projet** : [Votre email]

---

## 📅 CALENDRIER D'EXTRACTION

### MVP (2 premières semaines)
- **J1** : Extraction Salesforce (opportunités + comptes)
- **J2** : Extraction ERP (ventes + parc équipements)
- **J3** : Import et validation données
- **J4-J14** : Ajustements et démo

### Production (mensuel)
- **Semaine 1** : Extraction complète tous systèmes
- **Semaine 2-4** : Synchronisation incrémentale quotidienne

---

## ✅ VALIDATION QUALITÉ DONNÉES

### Checks Automatiques

**Salesforce** :
- Nombre opportunités > 10
- Montants > 0
- Dates cohérentes (CloseDate > CreatedDate)
- Emails valides (@neemba.com)

**ERP** :
- Nombre factures > 50
- Montants > 0
- customer_name non vide
- Dates cohérentes

### Checks Manuels

- [ ] Noms clients matchent entre SF et ERP
- [ ] Montants cohérents (pas de valeurs aberrantes)
- [ ] Secteurs bien renseignés
- [ ] Emails commerciaux valides

---

**Dernière mise à jour** : 2026-02-07  
**Version** : 1.0  
**Auteur** : Neemba Intelligence Team
