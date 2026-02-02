CAHIER DES CHARGES (CdC-FT) - PROJET EURO-SOUVERAINETÉ
Projet : Portail de Présentation de la Réforme Monétaire & RUP (Revenu Universel Progressif) Commanditaire : Parti Politique 647 (Sous contrôle CNCCFP) Cible : États membres de l'UE, Institutions Financières (Bundesdruckerei, Banque de France, etc.), Citoyens. Version : 1.0

1. CONTEXTE ET VISION POLITIQUE
1.1 Le Constat
Le modèle actuel de l'Euro est basé sur la dette et les marchés financiers, déconnecté de la valeur réelle (Travail). La gestion centralisée ne permet pas une régulation fine des économies nationales ni le financement direct d'un modèle social avancé.

1.2 La Solution : La "Signature Nationale"
Mise en place d'un protocole permettant à chaque État membre de l'UE d'apposer une signature cryptographique et physique unique sur les billets en Euros qu'il émet.

Objectif Monétaire : Transformer le billet en "Preuve de Valeur Travail" et non en dette.

Objectif Fiscal : Tracer la circulation monétaire nationale pour appliquer une Taxe sur les Transactions (TTF Interne) ou une redevance de circulation.

Objectif Social : Les fonds collectés financent automatiquement, via le CORE_SYSTEM, le Revenu Universel Progressif (RUP) versé tous les 28 jours aux détenteurs du CV Numérique (CVNU).

2. SPÉCIFICATIONS FONCTIONNELLES
Le site web sert de Portail Institutionnel pour présenter cette réforme. Il ne s'agit pas d'un blog, mais d'une documentation officielle d'État.

2.1 Architecture de l'Information
Le site doit être multilingue dès la conception (Architecture i18n).

Langues initiales : Français (FR), Allemand (DE - pour Bundesdruckerei), Italien (IT), Anglais (EN).

Détection : Redirection automatique ou Splash Screen de choix de langue à l'arrivée.

2.2 Contenu des Pages (Sitemap)
ACCUEIL (Dashboard Politique) :

Introduction solennelle ("Vers une Souveraineté Monétaire Distribuée").

Schéma clair : Billet Signé -> Circulation -> Financement RUP.

LE PROJET (Dossier Technique) :

Explication de la distinction Monnaie-Dette vs Monnaie-Travail.

Le rôle de l'Économie Circulaire.

Le CVNU comme grand livre de comptes citoyens.

L'IMPRIMERIE (Spécifications Industrielles) :

Page dédiée aux partenaires techniques (Bundesdruckerei, EuropaFi).

Détails sur la sécurité (NFC, Hologrammes nationaux) et la traçabilité.

PLAN D'ACTION (Roadmap) :

Calendrier de mise en œuvre pour les États.

Appel à l'unification des standards.

3. SPÉCIFICATIONS TECHNIQUES & ARCHITECTURE
3.1 Hébergement & Déploiement
Plateforme : GitHub Pages.

Contrainte : Le site doit être servi depuis le dossier /docs à la racine du dépôt pour être visible publiquement.

Nom de domaine : Sous-domaine github.io ou domaine personnalisé (party647.eu par ex).

3.2 Stack Technologique (Low-Tech & Robustesse)
Pour garantir la pérennité et l'auditabilité (Code Open Source) :

HTML5 Sémantique : Respect strict des normes W3C (Accessibilité ARIA niveau AA minimum).

CSS3 Natif : Pas de Framework lourd (pas de Bootstrap/Tailwind). Utilisation de CSS Variables pour le theming. Architecture BEM (Block Element Modifier).

JavaScript Vanilla (ES6+) : Aucun framework (pas de React/Vue/Angular). Scripts légers pour la navigation et le changement de langue.

Performance : Site statique ultra-rapide.

3.3 Structure des Fichiers (Invariant)
Plaintext

/docs
  ├── index.html       (Routeur Linguistique)
  ├── assets/          (CSS, JS, IMG partagés)
  ├── fr/              (Contenu FR)
  ├── de/              (Contenu DE)
  └── ...
3.4 Environnement de Développement
Serveur Local : Un fichier server.js (Node.js) simple pour servir le dossier docs/ en local et tester les liens absolus/relatifs avant le push.

4. CHARTE GRAPHIQUE & UX (Style "Régalien")
Le design doit inspirer la Confiance, l'Autorité et la Sérénité.

4.1 Palette de Couleurs (Officielles)
Bleu Europe Profond : #003399 (Base institutionnelle).

Or Souverain : #FFCC00 (Pour les éléments de valeur, la monnaie).

Blanc Papier : #F4F4F4 (Fond texturé type "Papier Sécurisé" ou "Filigrane").

Gris Anthracite : #333333 (Texte, pour un contraste optimal).

4.2 Typographie
Titres (Headings) : Une police avec empattement (Serif) classique et statutaire. Ex: Merriweather ou Libre Baskerville.

Corps (Body) : Une police sans empattement (Sans-Serif) très lisible. Ex: Inter ou Roboto.

4.3 Composants UI
Mise en page : Grille stricte, aérée. Pas d'animations superflues.

Iconographie : Symboles minimalistes (Drapeaux, Symboles monétaires, Rouages de l'industrie).

Double Signature : Pied de page mentionnant explicitement "Projet Party 647" et "Conformité CNCCFP".

5. LIVRABLES ATTENDUS
Arborescence de fichiers conforme.

Code Source (HTML/CSS/JS) validé W3C.

Contenu rédactionnel intégré en FR (base pour traduction).

Serveur de test (server.js) fonctionnel.

Validation : Ce cahier des charges te semble-t-il complet et conforme à ta vision "Politique & Technique" ? Si oui, nous pouvons passer à l'étape suivante : La création de l'arborescence et du serveur de développement.