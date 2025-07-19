const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config;

exports.registerAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin){
            return req.status(400).json({ message: 'Email déjà utilisé' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'Admin crée avec succès', admin: newAdmin});
    }catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin){
            return res.status(404).json({ message: 'admin non trouvé'});
        }

        const validePassword = await bcrypt.compare(password, admin.password);
        if (!validePassword) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id:admin._id , email: admin.email },
            process.env.JWT_SECRET, { expiresIn: '1h'});
            res.status(200).json({ token, message: 'Connexion réussie' });
    }catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur Serveur'});
    }
};

exports.logoutAdmin = (req, res) =>{
    res.status(200).json({ message: 'Deconnexion réussie' });
};