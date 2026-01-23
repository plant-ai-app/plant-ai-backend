import usuarioService from "../services/usuario.service.js";
import { validarCriacaoUsuario } from "../middlewares/validations/usuario.validation.js";

class UsuarioController{

    constructor(){
        this.usuarioService = usuarioService;
    }

    create = async (req, res) => {
        try {
            const {nome, email, senha} = req.body;

            validarCriacaoUsuario(nome, email, senha);

            const usuario = await this.usuarioService.create({nome, email, senha});

            res.status(201).json(usuario);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    findAll = async (req, res) => {
        try {
            const usuarios = await usuarioService.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

}

export default new UsuarioController();

