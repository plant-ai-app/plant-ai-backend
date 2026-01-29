import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import passwordRepository from '../repositories/password.repository.js';
import usuarioRepository from '../repositories/usuario.repository.js';
import prisma from '../../databases/prisma.js';
import { validarSenha } from '../middlewares/validations/usuario.validation.js';

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

    async resetPassword({token, novaSenha, confirmarSenha}) {

        // 1 validar entradas
        if (novaSenha !== confirmarSenha) {
            throw new Error('As senhas não coincidem.');
        }

        //2 validar nova senha
        validarSenha(novaSenha);

        const tokensAtivos = await passwordRepository.findActiveTokenWithUser();

          // 3️ Encontrar token correspondente
        const tokenEncontrado = await Promise.all(
            tokensAtivos.map(async (registro) => {
            const match = await bcrypt.compare(token, registro.token_hash);
            return match ? registro : null;
            })
        ).then(resultados => resultados.find(r => r));

        if (!tokenEncontrado) {
            throw new Error('Token inválido.');
        }

        // 4 tokens expirados ?
        if (new Date() > tokenEncontrado.expira_em) {
            throw new Error("Token expirado.");
        }

        // 5 atualizar senha
        const senhaHash = await bcrypt.hash(novaSenha, 10);

        await usuarioRepository.update(
            tokenEncontrado.fk_usuario_id,
            { senha_hash: senhaHash }
        )

        // 6️ Invalidar token
        await prisma.pwd_reset_token.update({
            where: { id: tokenEncontrado.id },
            data: { encerrado_em: new Date() }
        });
    }
}

export default new PasswordService();
