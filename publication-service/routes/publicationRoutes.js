const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} = require('../controllers/publicationController');

router.post('/', authenticateToken, createPublication); // Créer une publication
router.get('/', getPublications); // Récupérer toutes les publications
router.get('/:id', getPublicationById); // Récupérer une publication par ID
router.put('/:id', authenticateToken, updatePublication); // Mettre à jour une publication
router.delete('/:id', authenticateToken, deletePublication); // Supprimer une publication

module.exports = router;
