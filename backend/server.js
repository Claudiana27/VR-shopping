const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

require('./models/index');

// Importer et utiliser le routeur principal
const routes = require('./routes');
app.use('/api', routes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
