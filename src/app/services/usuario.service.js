import usuarioRepository from "../repositories/usuario.repository.js";


class UsuarioService{

    constructor(){
        this.usuarioRepository = usuarioRepository;
    }

    findAll = async () => {
        const usuarios = await this.usuarioRepository.findAll();
        if(!usuarios || usuarios.length === 0){
            return [];
        }

        return usuarios;
    }

    create = async ({nome, email, senha}) => {
        //email unico
        const usuarioExistente = await this.usuarioRepository.findByEmail(email);

        if(usuarioExistente){
            throw new Error("Já existe um usuário cadastrado com esse e-mail.");
        }

        const usuario = await this.usuarioRepository.create({
            nome,
            email,
            senha_hash: senha
        })

        return usuario;

    }


}

export default new UsuarioService();
