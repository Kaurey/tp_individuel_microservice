# Microservice de Publications

Ce projet est une application de microservices permettant de gérer des publications. Il inclut une interface frontend et un backend avec des fonctionnalités de cache via **Redis**.

---

## Endpoints disponibles

### **Endpoints du service des publications :**

1. **GET /api/publications**

   - Récupère toutes les publications.
   - **Cache Redis** : Les publications sont mises en cache pendant 5 minutes pour améliorer les performances.

2. **POST /api/publications**

   - Crée une nouvelle publication.
   - **Requiert un token d'authentification**.
   - **Invalidation du cache Redis** : Le cache est supprimé après la création.

3. **GET /api/publications/:id**

   - Récupère une publication spécifique par son ID.

4. **PUT /api/publications/:id**

   - Met à jour une publication existante.
   - **Requiert un token d'authentification**.
   - **Invalidation du cache Redis** : Le cache est supprimé après la mise à jour.

5. **DELETE /api/publications/:id**
   - Supprime une publication existante.
   - **Requiert un token d'authentification**.
   - **Invalidation du cache Redis** : Le cache est supprimé après la suppression.

### **Endpoints du service des utilisateurs :**

1. **POST /api/users/register**

   - Permet à un utilisateur de s'inscrire.
   - **Body attendu** :
     ```json
     {
       "name": "Nom de l'utilisateur",
       "email": "email@example.com",
       "password": "motdepasse"
     }
     ```

2. **POST /api/users/login**
   - Permet à un utilisateur de se connecter.
   - **Body attendu** :
     ```json
     {
       "email": "email@example.com",
       "password": "motdepasse"
     }
     ```
   - **Réponse** :
     ```json
     {
       "token": "jwt-token"
     }
     ```

---

## Lancer les services

### **Prérequis :**

- Node.js installé sur votre machine.
- MongoDB installé et en cours d'exécution.
- Redis installé et en cours d'exécution.

### **Étapes pour lancer les services :**

1. **Cloner le projet :**

   ```bash
   git clone https://github.com/Kaurey/tp_individuel_microservice.git
   cd tp_individuel_microservice
   ```

2. **Lancer le backend :**

   ```bash
   cd publication-service
   node app.js
   ```

   ```bash
   cd user-service
   node app.js
   ```

   ```bash
   cd gateway
   node app.js
   ```

3. **Lancer le frontend :**

   ```bash
   cd ../frontend
   npm start
   ```

4. **Accéder à l'application :**
   - URL : [http://localhost:3000](http://localhost:3000)

---

## Utilisation de Redis

### **Pourquoi Redis ?**

Redis est utilisé comme cache pour améliorer les performances de l'application en réduisant les requêtes répétées à la base de données.

### **Fonctionnalités implémentées avec Redis :**

1. **Cache des publications :**

   - Lorsqu'un utilisateur demande la liste des publications, elles sont mises en cache dans Redis pendant **5 minutes**.
   - Si les publications sont déjà en cache, elles sont retournées directement depuis Redis, ce qui accélère la réponse.

2. **Invalidation du cache :**
   - Après la création, la mise à jour ou la suppression d'une publication, le cache Redis est invalidé pour garantir que les données restent à jour.

### **Configuration de Redis :**

- Redis doit être en cours d'exécution pour que le cache fonctionne correctement.

---

## Fonctionnalités principales

- **Frontend :**

  - Affichage des publications.
  - Connexion et inscription des utilisateurs.
  - Ajout, modification et suppression des publications (uniquement pour les utilisateurs connectés).

- **Backend :**
  - Gestion des publications via des endpoints REST.
  - Authentification avec JWT.
  - Cache des publications avec Redis.

---

## Auteur

Ce projet a été réalisé par **Kaurey**.
