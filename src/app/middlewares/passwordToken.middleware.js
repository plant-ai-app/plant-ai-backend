import bcrypt from 'bcryptjs';
import passwordRepository from '../repositories/password.repository.js';

export const validateResetToken = async (req, res, next) => {
    try {
        const token = req.query.token || req.body.token;

        if (!token) {
            return res.status(400).json({ error: 'Token não fornecido.' });
        }

        const tokensAtivos = await passwordRepository.findActiveTokenWithUser();

        const tokenEncontrado = await Promise.all(
            tokensAtivos.map(async (registro) => {
                const match = await bcrypt.compare(token, registro.token_hash);
                return match ? registro : null;
            })
        ).then((resultados) => resultados.find((r) => r));

        if (!tokenEncontrado) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        if (new Date() > tokenEncontrado.expira_em) {
            return res.status(401).json({ error: 'Token expirado.' });
        }

        req.resetToken = tokenEncontrado;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
