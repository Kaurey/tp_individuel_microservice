const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

router.post('/login', loginUser); // Route pour le login
router.post('/register', registerUser); // Route pour l'enregistrement

module.exports = router;