# Argent Bank #

 Ce projet correspond au projet 13 de la formation développeur d'applications JS React de OPENCLASSROOMS.


 ## Table des Matières

- [Introduction](#introduction)
- [Installation et utilisation](#installation-et-utilisation)
- [Documentation](#documentation)
- [Auteurs](#auteurs)
- [Outils et contraintes techniques](#outils-et-contraintes-techniques) 


## Introduction

- L'objectif ici est de créer une application web React pour le nouveau système d'authentification des utilisateurs.Le backend est déjà disponible(https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API), ainsi que les fichiers HTML et CSS pour les différentes pages.


## Installation et utilisation

- Installation des dépendances : Cloner ce repository et lancer `yarn install` pour installer les dépendances puis démarrer avec `yarn start`.
- `yarn build` construit l'application pour la production dans le dossier `build`.\
- `yarn eject` supprimera la dépendance de build unique de votre projet. 


## Structure du Projet

- src/
- ├── assets/              # Ressources statiques telles que les images et icônes
- │   ├── icons/           # Icônes SVG réutilisables dans les composants
- │   └── ...              # Autres ressources comme les polices, logos, etc.
- │
- ├── features/            # Reducers
- │
- ├── components/          # Composants réutilisables à travers l'application
- │
- ├── pages/               # Pages principales de l'application (correspond à chaque route)   
- │
- ├── utils/               # Fonctions utilitaires et helpers
- │   ├── hooks/           # Hooks personnalisés pour gérer l'état ou les effets, selectors du store
- │   ├── skeleton/        # Squelettes de chargement ou placeholders
- │   ├── test/            # Configuration du wrapper de test
- │   ├── style/           # Configuration du style
- │   └── store.tsx        # Configuration du store
- │
- └── index.tsx            # Point d'entrée de l'application React


## Auteurs

- [GUIEBA Kévin](https://github.com/Kguie/)


### Outils et contraintes techniques ###

- Créer l’application web complète et responsive avec React.
- Utiliser Redux pour gérer le state de l'ensemble de l'application.

- Ce que doit faire l’application:
    - L'utilisateur peut visiter la page d'accueil
    - L'utilisateur peut se connecter au système
    - L'utilisateur peut se déconnecter du système
    - L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès
    - L'utilisateur peut modifier le profil et conserver les données dans la base de données. 

