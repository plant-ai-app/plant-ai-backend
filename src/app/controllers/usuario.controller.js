import usuarioService from "../services/usuario.service.js";

class UsuarioController{


    create = async (req, res) => {
        try {
            const {nome, email, senha} = req.body;

            const usuario = await usuarioService.create({nome, email, senha});

            res.status(201).json({ message: "Usuário criado com sucesso.", usuario });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    login = async (req, res) => {
        try {
            const {email, senha} = req.body;

            const usuario = await usuarioService.login(email, senha);

            return res.json({ message: "Login realizado com sucesso.", usuario });
        } catch (error) {
            return res.status(401).json({ error: error.message });
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

    delete = async (req, res) => {
        try {
            const {senha} = req.body;

            await usuarioService.delete({
                usuarioIdLogado: (req.usuarioId),
                usuarioIdAlvo: Number(req.params.id),
                senha
            });
            return res.status(200).json({message: "Usuário deletado com sucesso."});
        } catch (error) {
            return res.status(403).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;

            const usuarioAtualizado = await usuarioService.update(
                Number(id),
                data
            );

            return res.status(200).json({ message: "Usuário atualizado com sucesso.", usuarioAtualizado });


        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateSenha = async (req, res) => {
        try {
            const {id} = req.params;
            const {senhaAtual, novaSenha} = req.body;

            await usuarioService.updateSenha(
                Number(id),
                senhaAtual,
                novaSenha
            );
            return res.status(200).json({ message: "Senha atualizada com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}

export default new UsuarioController();

