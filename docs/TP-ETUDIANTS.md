# TP Étudiants — TrainShop Starter

## Partie 1 — Lancer le projet

```bash
cp .env.example .env
docker compose up -d --build
```

Windows PowerShell :

```powershell
Copy-Item .env.example .env
docker compose up -d --build
```

## Partie 2 — Vérifier

```bash
docker compose ps
curl http://localhost:3000/health
curl http://localhost:3000/products
```

Frontend :

```text
http://localhost:8081
```

## Partie 3 — Comprendre

Répondez aux questions :

1. Quels sont les services Docker ?
2. Quel service expose le port 8081 ?
3. Quel service expose le port 3000 ?
4. Pourquoi la base PostgreSQL utilise un volume ?
5. À quoi sert `.env.example` ?
6. À quoi sert le Dockerfile API ?
7. À quoi sert le Dockerfile frontend ?
8. Pourquoi le projet ne contient pas encore `.github/workflows` ?

## Partie 4 — Exercice API

Ajoutez une route :

```text
GET /about
```

Réponse attendue :

```json
{
  "project": "TrainShop Starter",
  "module": "DevOps",
  "objective": "Créer une CI GitHub Actions"
}
```

## Partie 5 — Exercice CI

Créer la CI GitHub Actions à partir des consignes dans :

```text
docs/TP-CI-CD-A-FAIRE.md
```
