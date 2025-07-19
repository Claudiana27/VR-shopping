const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const token = req.body.token;

    if(!token){
        return res.status(400).json({ success: false, message: 'Token manquant'});
    }

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log('Utilisateur connecté : ', payload.email);

        return res.json({
            success: true,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        });
    } catch (error){
        console.error('Erreur de validation token: ', error);
        return res.status(401).json({ success: false, message: 'Token Invalide' });
    }
};