import usuarioRepository from "../repositories/usuario.repository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class UsuarioService{


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

    delete = async ({ usuarioIdLogado, usuarioIdAlvo }) => {
        
        if (usuarioIdLogado !== usuarioIdAlvo) {
            throw new Error("Você não tem permissão para excluir este usuário.");
        }

        const user = await usuarioRepository.findById(usuarioIdAlvo);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }


        return await usuarioRepository.delete(usuarioIdAlvo);
    };

    update = async (id, data) => {
        
        const usuarioExiste = await usuarioRepository.findById(id);

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado.");
        }

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

        if(novaSenha.length < 6){
            throw new Error("A senha deve ter no mínimo 6 caracteres.");
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

        return usuarioRepository.update(
            id,
            {senha_hash: novaSenhaHash}
        )


    }


}

export default new UsuarioService();
