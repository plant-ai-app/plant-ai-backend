import usuarioRepository from "../repositories/usuario.repository.js";


class UsuarioService{
    async findAll(){
        const usuarios = await usuarioRepository.findAll();

        if(!usuarios || usuarios.length === 0){
            return [];
        }

        return usuarios;
    }
}

export default new UsuarioService();
