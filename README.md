# FesticarApp

Ce projet a été généré avec [Angular CLI] version 15.0.2.
Il s'agit d'une application web qui permet aux utilisateurs de rechercher des festivals et d'acheter des offres de covoiturages pour y aller en plus d'acheter leur places.

## Prérequis

- Node.js
- Angular CLI

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `ng serve` to start the development server
4. Navigate to `http://localhost:4200/` to use the application

## Fonctionnalités actuelles

- Rechercher un festival avec des filtres (date, lieu, prix, etc.)
- Voir les détails d'un festival
- Rechercher des offres de covoiturages pour le festival choisi
- Acheter des offres qui combinent le festival et le covoiturage
- Recevoir un récapitulatif de la commande par email

## Fonctionnalités à venir

- Créer une offre de festival et la publier
- Géo-localisation des festivals et des offres de covoiturages
- Ajout de nouveaux critères de recherche pour les festivals et les offres de covoiturages
- Ajout de nouvelles fonctionnalités pour les utilisateurs (profil, historique des commandes, etc.)
- Abandonner un panier en cours de commande

## Developement du serveur

Pour faire tourner le serveur de développement, exécutez `ng serve`. Naviguez à `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez un fichier source.

## Déploiement

Pour déployer l'application, exécutez `ng build`. Les fichiers seront générés dans le répertoire `dist/`. Utilisez l'option `--prod` pour une version de production.

## Tests unitaires

Des tests unitaires sont en cours de développement. Pour les exécuter, exécutez `ng test`.

## Tests de bout en bout

Prévu en développement pour la finalisation de la V2.0.0.

## Aide supplémentaire

Pour obtenir plus d'aide sur Angular CLI, utilisez `ng help` ou consultez la page [Angular CLI Overview and Command Reference](https://angular.io/cli).
