const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log('Tentative de connexion à MongoDB pour User Service...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connecté pour User Service');
    } catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
