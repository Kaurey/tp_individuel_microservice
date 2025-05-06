const Publication = require('../models/publicationModel');
const redisClient = require('../config/redis');

// Créer une publication
const createPublication = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPublication = new Publication({
            title,
            content,
            author: req.user.id, // Utilisation de l'ID utilisateur extrait du token
        });
        await newPublication.save();

        // Invalide le cache des publications
        await redisClient.del('publications');

        res.status(201).json(newPublication);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la publication', error });
    }
};

// Récupérer toutes les publications
const getPublications = async (req, res) => {
    try {
        // Vérifie si les publications sont en cache
        const cachedPublications = await redisClient.get('publications');
        if (cachedPublications) {
            return res.status(200).json(JSON.parse(cachedPublications)); // Retourne les publications depuis Redis
        }

        // Si non en cache, récupère depuis MongoDB
        const publications = await Publication.find();
        await redisClient.set('publications', JSON.stringify(publications), {
            EX: 300, // Expiration du cache après 5 minutes
        });

        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des publications', error });
    }
};

// Récupérer une publication par ID
const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la publication', error });
    }
};

// Mettre à jour une publication
const updatePublication = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true }
        );
        if (!updatedPublication) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }

        // Invalide le cache des publications
        await redisClient.del('publications');

        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la publication', error });
    }
};

// Supprimer une publication
const deletePublication = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPublication = await Publication.findByIdAndDelete(id);
        if (!deletedPublication) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }

        // Invalide le cache des publications
        await redisClient.del('publications');

        res.status(200).json({ message: 'Publication supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la publication', error });
    }
};

module.exports = {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication,
};
