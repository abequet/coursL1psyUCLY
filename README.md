# Loi Normale — Site de révisions interactif

**L1 Psychologie · UCLy · Statistiques**

Site web pédagogique pour réviser la loi normale centrée réduite avant le contrôle terminal. Conçu pour les étudiants de L1 Psychologie / Sciences Cognitives.

Créé par A. Béquet, Chargé de recherche au [https://lescot.univ-gustave-eiffel.fr/] (Laboratoire Ergonomie et Sciences Cognitives pour les Transports (LESCOT)), Université Gustave Eiffel

🌐 **Accès en ligne** : [https://abequet.github.io/coursL1psyUCLY/](https://abequet.github.io/coursL1psyUCLY/)

---

## Contenu du site

Le site est organisé en 6 pages HTML autonomes :

### 1. Accueil (`index.html`)
- Présentation du site et mode d'emploi
- Rappel des deux formules fondamentales (z = (x−m)/s et x = (z×s)+m)
- Navigation vers toutes les sections

### 2. Fiches de cours (`cours.html`)
- **Navigation dans les tables directe et inverse** : Illustration dynamique de la façon dont on trouve une valeur dans les tables directe et inverse et explications associées
- **Table directe** : les 5 cas de figure (P(Z<z), P(Z>z), P(Z<−z), P(Z>−z), encadrement), chacun illustré par des mini-graphiques de la courbe normale avec les aires colorées
- **Table inverse** : les 4 cas (P<0.5 / P>0.5 × P(<) / P(>)), avec graphiques montrant "on connaît l'aire, on cherche z"
- **Valeurs atypiques** : critère |z| > 2, illustration avec zones rouges
- **Propriété de symétrie** : démonstration visuelle avec l'exemple du QI

Tous les exemples de la table directe utilisent z = 1.25 pour que les étudiants voient clairement les liens entre les différents cas.

### 3. Exercices — Lecture de table (`exercices-table.html`)
- 10 exercices de table directe couvrant tous les cas
- 6 exercices de table inverse (dont 2 avec retransformation z→x)
- Bouton **Valider** avec feedback visuel (vert/rouge)
- **Score tracker** sticky en haut de page
- Corrigés step-by-step avec règle identifiée (tag coloré) et mini-graphique de la distribution

### 4. Exercices — Problèmes contextualisés (`exercices-contexte.html`)
- 3 problèmes en contexte psychologique :
  - Stress au travail (N(55, 12)) — 4 questions
  - Sommeil des adolescents (N(7.5, 1.2)) — 4 questions
  - Performance scolaire (N(65, 10)) — 5 questions
- Couvre : proportions, encadrements, seuils (table inverse), comparaison à un percentile, application à un effectif
- Corrigés détaillés avec graphiques de la distribution
- Score tracker

### 5. Exercices — Tableaux z-scores (`exercices-zscore.html`)
- 3 tableaux de transformation x↔z à compléter :
  - Psycholinguistique (N(4.2, 0.8))
  - Empathie (N(72, 9))
  - Psychophysiologie (N(82, 11))
- Identification des valeurs atypiques avec justification
- Corrigés avec graphique montrant tous les points de données sur la courbe (rouge = atypique)
- Score tracker

### 6. Outil interactif (`outil.html`)
- **3 modes de distribution** :
  - Z ~ N(0, 1) — loi centrée réduite
  - Paramètres personnalisés (μ et σ au choix)
  - Distribution aléatoire (contextes psycho réalistes)
- **3 modes de calcul** :
  - Trouver une probabilité : P(X<a), P(X>a), P(a<X<b)
  - Trouver une valeur : x sachant P(X<x)=P ou P(X>x)=P
  - Sélection libre au slider (cliquer-glisser sur la courbe)
- Double axe (z-scores + valeurs x)
- Calcul détaillé avec **identification du cas spécifique** utilisé (Cas 1 à 5 pour la table directe, Cas A à D pour la table inverse)
- Gestion des erreurs (probabilité hors [0,1])

---

## Caractéristiques techniques

- **100% statique** : HTML + CSS + JavaScript vanilla, aucun framework ni backend
- **Fichiers autonomes** : le CSS et le JS sont inlinés dans chaque page HTML — chaque fichier fonctionne seul
- **Responsive** : adapté mobile, tablette et desktop
- **Aucune dépendance externe** sauf Google Fonts (DM Sans, DM Mono, Fraunces)
- **Calculs de probabilités** : approximation numérique de la CDF normale (Abramowitz & Stegun) et de l'inverse CDF (Acklam)
- **Graphiques** : dessinés en Canvas 2D natif, pas de librairie de graphiques

---

## Déploiement sur GitHub Pages

1. Cloner ou forker ce dépôt
2. Placer les fichiers HTML + les dossiers `css/` et `js/` à la racine (ou dans un sous-dossier)
3. Activer GitHub Pages dans les paramètres du dépôt (source : branche `main`, dossier `/` ou `/docs`)
4. Le site est accessible à `https://<username>.github.io/<repo>/`

Les fichiers HTML étant autonomes (CSS/JS inlinés), ils fonctionnent aussi en ouvrant directement les `.html` dans un navigateur sans serveur.

---

## Structure des fichiers

```
.
├── index.html                  # Page d'accueil
├── cours.html                  # Fiches de cours illustrées
├── exercices-table.html        # Exercices lecture de table
├── exercices-contexte.html     # Exercices problèmes contextualisés
├── exercices-zscore.html       # Exercices tableaux z-scores
├── outil.html                  # Outil interactif complet
├── css/
│   └── style.css               # Feuille de style partagée (aussi inlinée)
├── js/
│   └── shared.js               # Fonctions JS partagées (aussi inlinées)
├── README.md
└── LICENSE
```

---

## Contexte pédagogique

Ce site a été conçu comme support de révision pour le cours *Introduction aux statistiques pour psychologues* (L1 Psychologie, UCLy — Université Catholique de Lyon), dispensé par le Dr Adolphe Béquet (Laboratoire LESCOT, Université Gustave Eiffel).

Les exercices sont calibrés pour correspondre au format du contrôle terminal : lecture de table directe/inverse, problèmes contextualisés en psychologie avec transformation x↔z, et identification de valeurs atypiques.

Les étudiants sont encouragés à utiliser leur **table papier** de la loi normale (directe + inverse) en parallèle du site, pour s'entraîner dans les conditions réelles de l'examen.

---

## Auteur

**Dr Adolphe Béquet**  
Chercheur — Laboratoire LESCOT (Ergonomie, Sciences Cognitives pour les Transports)  
Université Gustave Eiffel  
📧 adolphe.bequet@univ-eiffel.fr 
---

## Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour les détails.
