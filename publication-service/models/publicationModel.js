const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // Peut être un ID utilisateur
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);
