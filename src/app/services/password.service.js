import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import passwordRepository from '../repositories/password.repository.js';

class PasswordService {
    async forgotPassword(email) {

        if(!email) {
            throw new Error('Por favor, forneça um e-mail.');
        }

        const usuario = await passwordRepository.findUserByEmail(email);

        if (!usuario) return;

        await passwordRepository.invalidateUserTokens(usuario.id);

        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(token, 10);

        const expriraEm = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

        await passwordRepository.createToken({
            fk_usuario_id: usuario.id,
            token_hash: tokenHash,
            expira_em: expriraEm
        })

        // link por enquato
        const link = `http://localhost:3000/reset-password?token=${token}`;
        console.log(`Link de reset de senha: ${link}`);


    }
}

export default new PasswordService();