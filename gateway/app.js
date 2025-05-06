const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Mapping des microservices
const serviceMap = {
    users: "http://localhost:5000/users", // dev sans docker
    publications: "http://localhost:6000/publications", // dev sans docker
    // users: "http://user-service:5000/users", // Utiliser les noms des services Docker
    // products: "http://product-service:6000/products",// Utiliser les noms des services Docker
};

// Middleware dynamique
app.use("/api/:service", (req, res, next) => {
    const serviceName = req.params.service;
    const target = serviceMap[serviceName];

    if (target) {
        createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: { [`^/api/${serviceName}`]: "" }, // Supprimer /api/<service> du chemin
            logLevel: "debug",
        })(req, res, next);
    } else {
        res.status(502).send(`Service ${serviceName} non disponible.`);
    }
});

const PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, () => {
    console.log(`API Gateway démarrée sur le port ${PORT}`);
});