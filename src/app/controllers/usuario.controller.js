import usuarioService from "../services/usuario.service.js";

class UsuarioController{

    create = async (req, res) => {
        try {
            const {nome, email, senha, confirmaSenha} = req.body;

            const usuario = await usuarioService.create({nome, email, senha, confirmaSenha});

            res.status(201).json({ message: "Usuário criado com sucesso.", usuario });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });

        }
    }

    login = async (req, res) => {
        try {
            const { email, senha } = req.body;

            const usuario = await usuarioService.login(email, senha);

            return res.json({ message: "Login realizado com sucesso.", usuario });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: error.message });
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

    findById = async (req, res) => {
        try {
            const id = req.usuarioId;
            if (!id) {
                return res.status(400).json({ message: "ID do usuário não fornecido." });
            }

            const usuario = await usuarioService.findById(Number(id));

            return res.status(200).json({ message: "Usuário encontrado com sucesso.", data: {usuario} });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const { senha } = req.body;
            const usuarioId = req.usuarioId;

            await usuarioService.delete(senha, usuarioId);

            return res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const usuarioId = req.usuarioId;
            const data = req.body;

            const usuarioAtualizado = await usuarioService.update(
                Number(usuarioId),
                data
            );

            return res.status(200).json({ message: "Usuário atualizado com sucesso.", data: {usuarioAtualizado} });


        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    updateSenha = async (req, res) => {
        try {
            const userId = req.usuarioId;
            const { senhaAtual, senhaNova } = req.body;

            await usuarioService.updateSenha({
                userId: Number(userId),
                senhaAtual,
                senhaNova
            });

            return res.status(200).json({ message: "Senha atualizada com sucesso." });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
    }


}

export default new UsuarioController();

