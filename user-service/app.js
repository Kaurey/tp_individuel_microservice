const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importez la fonction connectDB
const app = express();
const userRoutes = require('./routes/userRoutes');

connectDB(); // Appelez la fonction pour connecter à la base de données

app.use(cors()); // Activez CORS pour toutes les origines
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`User Service démarré sur le port ${PORT}`);
});
