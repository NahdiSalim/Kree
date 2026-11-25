# Kree — Vision produit

**Marketplace intelligente de location en Tunisie**  
Maisons · Véhicules · Assistance IA

---

**Document de vision**  
Version 1.0 · Novembre 2026  
Confidentiel — usage interne / partenaires

---

## 1. Résumé exécutif

**Kree** est une plateforme de location peer-to-peer en Tunisie qui connecte les voyageurs et locataires aux propriétaires de **maisons** et de **véhicules**, sans friction pour le client et avec un espace métier complet pour le loueur.

Au-delà d’un simple catalogue, Kree se positionne comme un **copilote de mobilité et d’hébergement** : planification assistée par IA, comparaison de prix, et assistant business pour les propriétaires (rapports, alertes, réponses clients WhatsApp / téléphone).

### Proposition de valeur

| Pour le client | Pour le propriétaire |
| --- | --- |
| Pas de compte obligatoire | Espace dédié clair (maisons ≠ véhicules) |
| Contact WhatsApp en un clic | Demandes de réservation centralisées |
| Demande de réservation simple | Publication d’annonces multi-photos |
| Planificateur IA (itinéraire + budget) | Chatbot business + rapports |
| Comparaison de prix transparente | Alertes départ / réponses clients assistées |

### Marché cible

- **Géographie** : Tunisie (extension Maghreb ensuite)
- **Clients** : familles, touristes, professionnels en déplacement
- **Offreurs** : propriétaires particuliers, petites agences, loueurs auto

---

## 2. Problème

Aujourd’hui, louer une maison ou une voiture en Tunisie reste fragmenté :

1. **Annonces dispersées** (Facebook, WhatsApp, sites hétérogènes)
2. **Peu de transparence sur les prix** et difficile de comparer
3. **Parcours client lourd** (compte, formulaires, délais)
4. **Propriétaires sans outils** : pas de tableau de bord, pas de suivi des demandes, pas d’aide pour répondre ou optimiser
5. **Planification de séjour / déplacement** laissée au hasard (plusieurs apps, devis informels)

Kree unifie la découverte, la comparaison, la réservation légère et l’accompagnement IA — côté client **et** côté loueur.

---

## 3. Solution — produit actuel (frontend livré)

### 3.1 Site public

- Accueil marketing (maisons / véhicules, offres, navigation FR)
- Catalogues filtrables **Maisons** et **Véhicules**
- Fiches détail (galerie, specs, visite 3D si dispo)
- Page **Contact**
- **Pas de compte locataire** : le client n’a pas besoin de s’inscrire

### 3.2 Parcours client sur une annonce

1. **Contacter le propriétaire** → ouverture WhatsApp préremplie  
2. **Demander une réservation** → petit formulaire (nom, téléphone, dates, message)  
3. La demande part en **statut « en attente »** dans le dashboard du propriétaire

### 3.3 Espace propriétaire

- Connexion / inscription **réservée aux propriétaires**
- Tableau de bord : vue d’ensemble, stats, accès rapide
- **Mes maisons** / **Mes véhicules** (séparés)
- **Ajouter** une annonce (formulaire plein écran, multi-photos drag & drop)
- **Demandes** : accepter / refuser + WhatsApp client + badge de notification
- **Profil** : photo, coordonnées, bio

> État technique actuel : frontend React (Vite + Tailwind). Persistance locale (démo). Backend réel à brancher ensuite.

---

## 4. Nouvelles idées stratégiques (roadmap IA)

Ces trois piliers différencient Kree d’un simple Airbnb/local clone.

### 4.1 Kree Plan — planification de mouvement par IA

**Idée** : un chatbot conversationnel qui discute avec l’utilisateur jusqu’à construire le **meilleur plan** selon ses besoins, son budget et les disponibilités Kree.

**Exemple de dialogue**

> « Je veux 4 jours à Hammamet avec ma famille, un appartement près de la plage et une voiture automatique, budget 1200 TND. »

Le bot :

1. Clarifie contraintes (dates, personnes, confort, bagages, aéroport…)
2. Cherche dans le catalogue maisons + véhicules
3. Propose **2–3 plans** (bon marché / équilibré / confort)
4. Compare prix totaux (nuitées + jours de location auto)
5. Oriente vers réservation / WhatsApp des propriétaires concernés

**Livrables produit**

- Chat embarqué (web, puis mobile)
- Moteur de recommandation (règles + LLM + données Kree)
- Export du plan (PDF / partage WhatsApp)
- Mémoire de préférence utilisateur (optionnelle, sans compte forcé)

**Valeur** : Kree devient le **point d’entrée** du voyage, pas seulement le catalogue.

---

### 4.2 Comparateur de prix intelligent

**Idée** : une recherche / vue « Comparaison » pour aligner plusieurs annonces (maisons entre elles, véhicules entre eux, ou **pack séjour**).

**Fonctionnalités**

- Sélection de 2 à 4 annonces côte à côte
- Normalisation du prix (TND / nuit, / jour, total période)
- Score simple : prix, note, distance, équipements
- Alerte « meilleure offre du moment » sur une zone / dates
- Intégration au Plan IA (comparaison générée automatiquement)

**Valeur** : transparence → confiance → conversion.

---

### 4.3 Kree Coach — assistant propriétaire

**Idée** : un chatbot métier dédié aux loueurs, qui les aide à **gérer et faire grandir** leur activité.

**Cas d’usage**

| Besoin | Réponse du Coach |
| --- | --- |
| Business | Conseils pricing, occupation, photos, titres d’annonces |
| Rapports | Synthèse hebdo : vues, demandes, taux d’acceptation, revenus estimés |
| À corriger | Checklist (photos manquantes, prix hors marché, description faible) |
| Opérations | Notification quand un séjour **se termine** / client « sort » |
| Relation client | Brouillons de réponses WhatsApp / téléphone ; suggestions de ton |
| Urgences | Relance automatique d’une demande en attente trop longue |

**Canaux**

- Chat in-dashboard
- Notifications push / e-mail
- Relais vers **WhatsApp Business** (et plus tard appels / voix)

**Valeur** : le propriétaire reste sur Kree parce que la plateforme **travaille pour lui**.

---

## 5. Personas

### Client — « Sarra »

Voyageuse / famille. Veut réserver vite, comparer, parler sur WhatsApp. N’accepte pas de créer un compte pour une simple demande.

### Propriétaire — « Karim »

Loue 1–3 biens ou voitures. Besoin de clarté (demandes, annonces) et d’aide pour ne pas perdre de clients (réponses lentes, prix mal calibrés).

---

## 6. Architecture fonctionnelle (cible)

```text
┌─────────────────────────────────────────────────────────┐
│                     Clients (web / mobile)               │
│  Catalogue · Détail · WhatsApp · Réservation · Plan IA  │
│  Comparateur de prix                                     │
└───────────────────────────┬─────────────────────────────┘
                            │ API
┌───────────────────────────▼─────────────────────────────┐
│                      Backend Kree                        │
│  Auth propriétaires · Annonces · Demandes · Médias       │
│  Search / Ranking · Notifications · Intégrations WA      │
└───────┬─────────────────────────┬───────────────────────┘
        │                         │
┌───────▼────────┐       ┌────────▼────────┐
│  Services IA   │       │  Données        │
│  Plan bot      │       │  Users / Listings│
│  Coach bot     │       │  Reservations   │
│  Comparaison   │       │  Analytics      │
└────────────────┘       └─────────────────┘
```

---

## 7. Roadmap recommandée

### Phase A — Fondations (en cours / immédiat)

- Backend réel (auth, annonces, demandes, upload images)
- Remplacer le localStorage
- WhatsApp & numéros vérifiés
- Mise en production stable

### Phase B — Confiance & conversion

- Comparateur de prix
- Filtres avancés + carte
- Avis & vérification propriétaire
- Notifications e-mail / push demandes

### Phase C — Différenciation IA

- **Kree Plan** (chat planification)
- **Kree Coach** (rapports + suggestions)
- Réponses assistées WhatsApp
- Alertes fin de séjour / check-out

### Phase D — Échelle

- App mobile
- Paiement / acompte (si cadre réglementaire OK)
- Multi-pays Maghreb
- API partenaires (hôtels, transferts aéroport)

---

## 8. Modèle économique (pistes)

1. **Commission** sur réservation confirmée  
2. **Abonnement propriétaire** (Coach Pro, rapports avancés, mise en avant)  
3. **Boost d’annonces** (visibilité catalogue / Plan IA)  
4. **Partenariats** (assurance location, transfert aéroport)

Le freemium côté loueur (publier gratuitement + Coach basique) accélère l’offre ; la monétisation suit l’usage.

---

## 9. Indicateurs de succès (KPI)

| KPI | Objectif early |
| --- | --- |
| Annonces actives (maisons + véhicules) | Croissance hebdo stable |
| Demandes / annonce / mois | ≥ 2 |
| Temps de 1ʳᵉ réponse propriétaire | < 2 h |
| Taux d’acceptation demandes | > 50 % |
| Usage Plan IA (sessions / semaine) | Adoption mesurable Phase C |
| NPS propriétaires | > 40 |

---

## 10. Risques & mitigation

| Risque | Mitigation |
| --- | --- |
| Qualité des annonces | Coach + checklist publication |
| Réponses lentes | Badge, relances, réponses assistées |
| Hallucinations IA | Toujours ancrer les plans sur données Kree réelles |
| Confiance WhatsApp | Numéros vérifiés, historique demandes |
| Concurrence | Différenciation IA Plan + Coach, focus Tunisie |

---

## 11. Positionnement

> **Kree n’est pas seulement une vitrine de locations.**  
> C’est la plateforme qui **planifie** le déplacement du client, **compare** les offres, et **coach** le propriétaire pour mieux louer.

Slogan de travail :  
**« Louez mieux. Bougez plus malin. »**

---

## 12. État d’avancement & prochaines étapes

### Déjà réalisé (frontend)

- Marketplace maisons / véhicules
- Détail + WhatsApp + formulaires de demande
- Auth & dashboard propriétaire
- Publication multi-images
- Profil, notifications demandes
- Contact, 404, nettoyage template

### Prochaine étape

- Conception et implémentation du **backend** (API, base de données, auth réelle, stockage médias)
- Puis incrémentation Plan IA / Comparateur / Coach selon la roadmap

---

## 13. Synthèse des trois idées IA

1. **Planificateur de mouvement** — chatbot qui affine le besoin et propose le meilleur plan (prix + fit)  
2. **Comparateur** — recherche et comparaison transparente des prix / offres  
3. **Coach propriétaire** — rapports, correctifs, alertes check-out, aide à répondre (WhatsApp / téléphone)

Ces trois briques forment le **moat** produit de Kree sur le marché tunisien.

---

*Document préparé pour Kree · Novembre 2026*  
*Contact produit : équipe Kree*
