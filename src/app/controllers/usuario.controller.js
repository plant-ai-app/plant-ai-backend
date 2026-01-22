import usuarioService from "../services/usuario.service.js";

class UsuarioController{

    async findAll(req, res){
        try {
            const usuarios = await usuarioService.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
}
}

export default new UsuarioController();
