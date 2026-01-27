import usuarioRepository from "../repositories/usuario.repository.js";
import { validarSenha, validarAtualizacaoUsuario, validarLoginUsuario, validarCriacaoUsuario } from "../middlewares/validations/usuario.validation.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class UsuarioService{

    compararSenhas = async (usuario, senhaDigitada) => {
        if(!senhaDigitada || !usuario){
            throw new Error("Senha inválida.");
        }
        const senhaValida = await bcrypt.compare(senhaDigitada, usuario.senha_hash);

        if(!senhaValida){
            throw new Error("Senha incorreta.");
        }
    }

    findAll = async () => {
        const usuarios = await usuarioRepository.findAll();
        if(!usuarios || usuarios.length === 0){
            return [];
        }

        return usuarios;
    }

    create = async ({nome, email, senha}) => {
        //email unico
        const usuarioExistente = await usuarioRepository.findByEmail(email);

        if(usuarioExistente){
            throw new Error("Já existe um usuário cadastrado com esse e-mail.");
        }

        validarCriacaoUsuario(nome, email, senha);

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await usuarioRepository.create({
            nome,
            email,
            senha_hash: senhaHash
        })

        return usuario;

    }

    login = async (email, senha) => {

        // verificar se o usuario existe
        const usuario = await usuarioRepository.findByEmail(email);

        if(!usuario){
            throw new Error("E-mail ou senha inválidos.");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if(!senhaValida){
            throw new Error("E-mail ou senha inválidos.");
        }

        validarLoginUsuario(email, senha);

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        return {
            token,
            usuario
        };
    }

    delete = async ({ usuarioIdLogado, usuarioIdAlvo, senha }) => {
        
        if (usuarioIdLogado !== usuarioIdAlvo) {
            throw new Error("Você não tem permissão para excluir este usuário.");
        }

        if(!senha){
            throw new Error("A senha atual é obrigatória.");
        }
        
        const user = await usuarioRepository.findById(usuarioIdAlvo);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        await this.compararSenhas(user, senha);

        return await usuarioRepository.delete(usuarioIdAlvo);
    }

    update = async (id, data) => {
        
        const usuarioExiste = await usuarioRepository.findById(id);

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado.");
        }

        validarAtualizacaoUsuario(data);

        return usuarioRepository.update(id, data);

    }

    updateSenha = async (id, senhaAtual, novaSenha) => {

        const usuario = await usuarioRepository.findById(id);

        if(!usuario){
            throw new Error("Usuário não encontrado.");
        }
        const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha_hash);

        if(!senhaValida){
            throw new Error("Senha atual incorreta.");
        }

        validarSenha(novaSenha);

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

        return usuarioRepository.update(
            id,
            {senha_hash: novaSenhaHash}
        )

    }


}

export default new UsuarioService();
