const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL, // Utilise l'URL de Redis depuis le fichier .env
});

redisClient.on('error', (err) => {
    console.error('Erreur Redis:', err);
});

redisClient.connect();

module.exports = redisClient;
