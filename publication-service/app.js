const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const publicationRoutes = require('./routes/publicationRoutes');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/publications', publicationRoutes);

const PORT = process.env.PUBLICATION_SERVICE_PORT || 6000;
app.listen(PORT, () => {
    console.log(`Publication Service démarré sur le port ${PORT}`);
});