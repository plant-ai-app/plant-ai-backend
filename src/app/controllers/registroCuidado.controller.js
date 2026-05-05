import registroCuidadoService from "../services/registroCuidado.service.js";

class RegistroCuidadoController {

    create = async (req, res) => {
        try {
            const {
                data_realizacao,
                data_prevista,
                observacoes,
                status,
                cuidado_id
            } = req.body;

            const data = {
                data_realizacao,
                data_prevista,
                observacoes,
                status,
                cuidado_id
            };

            const registro = await registroCuidadoService.create(data);

            return res.status(201).json({
                message: "Registro de cuidado criado com sucesso.",
                registro
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findAll = async (req, res) => {
        try {
            const usuarioId = req.usuarioId;
            const registros = await registroCuidadoService.findAll(usuarioId);
            return res.status(200).json({ message: "Registros encontrados.", registros });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    findById = async (req, res) => {
        try {
            const registro = await registroCuidadoService.findById(req.params.id);
            return res.status(200).json({ message: "Registro encontrado.", registro });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findByCuidadoId = async (req, res) => {
        try {
            const registros = await registroCuidadoService.findByCuidadoId(req.params.cuidadoId);
            return res.status(200).json({ message: "Registros do cuidado encontrados.", registros });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const registro = await registroCuidadoService.update(req.params.id, req.body);
            return res.status(200).json({ message: "Registro atualizado com sucesso.", registro });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            await registroCuidadoService.delete(req.params.id);
            return res.status(200).json({ message: "Registro deletado com sucesso." });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export default new RegistroCuidadoController();
