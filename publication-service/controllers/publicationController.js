const Publication = require('../models/publicationModel');

// Créer une publication
const createPublication = async (req, res) => {
    const { title, content } = req.body; // Suppression de l'author du body

    try {
        const newPublication = new Publication({
            title,
            content,
            author: req.user.id // Utilisation de l'ID utilisateur extrait du token
        });
        await newPublication.save();
        res.status(201).json(newPublication);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la publication', error });
    }
};

// Récupérer toutes les publications
const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
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
    deletePublication
};
