import cuidadoService from "../services/cuidado.service.js";

class CuidadoController {

    create = async (req, res) => {
        try {
            const {
                planta_id,
                tipo_id,
                frequencia_dias,
                proxima_data,
                quantidade_instrucao,
                horario_preferencial
            } = req.body;

            const data = {
                planta_id,
                tipo_id,
                frequencia_dias,
                proxima_data,
                quantidade_instrucao,
                horario_preferencial
            };

            const cuidado = await cuidadoService.create(data);

            return res.status(201).json({
                message: "Cuidado criado com sucesso.",
                cuidado
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findAll = async (req, res) => {
        try {
            const cuidados = await cuidadoService.findAll();
            return res.status(200).json({ message: "Cuidados encontrados.", cuidados });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    findById = async (req, res) => {
        try {
            const cuidado = await cuidadoService.findById(req.params.id);
            return res.status(200).json({ message: "Cuidado encontrado.", cuidado });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findByPlantaId = async (req, res) => {
        try {
            const planta_id = parseInt(req.params.plantaId);
            const cuidados = await cuidadoService.findByPlantaId(planta_id);
            return res.status(200).json({ message: "Cuidados da planta encontrados.", cuidados });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const cuidado = await cuidadoService.update(req.params.id, req.body);
            return res.status(200).json({ message: "Cuidado atualizado com sucesso.", cuidado });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            await cuidadoService.delete(req.params.id);
            return res.status(200).json({ message: "Cuidado deletado com sucesso." });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export default new CuidadoController();
