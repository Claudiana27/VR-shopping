const sequelize = require('../config/db');
const admin = require('../models/admin');

// Sync Sequelize avec MySQL
sequelize.sync().then(() => {
  console.log('Base synchronisée avec Sequelize');
}).catch(err => {
  console.error('Erreur synchronisation :', err);
});
