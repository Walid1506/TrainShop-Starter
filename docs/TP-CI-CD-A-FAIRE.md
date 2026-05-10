# TP — Créer la CI/CD GitHub Actions

Le projet ne contient volontairement aucun workflow GitHub Actions.

## Objectif

Créer une CI progressive.

## Étape 1 — Créer le dossier

```bash
mkdir -p .github/workflows
```

Sous Windows PowerShell :

```powershell
New-Item -ItemType Directory -Force .github/workflows
```

## Étape 2 — Créer le fichier CI

Créer :

```text
.github/workflows/ci.yml
```

## Étape 3 — Objectifs de la CI

La CI doit :

1. se lancer au push sur `main`;
2. récupérer le code;
3. installer Node.js;
4. installer les dépendances de l'API;
5. lancer les tests;
6. construire l'image Docker de l'API;
7. construire l'image Docker du frontend.

## Étape 4 — Indices

Commandes utiles :

```bash
cd api
npm install
npm test
```

Builds Docker :

```bash
docker build -t trainshop-api:test ./api
docker build -t trainshop-frontend:test ./frontend
```

## Étape 5 — Bonus

Ajouter un deuxième workflow qui publie les images Docker sur Docker Hub.
