import plantaService from "../services/planta.service.js";

class PlantaController {
    
    async create(req, res) {
        try {
            const {
                fk_local_id,
                nome_popular,
                nome_cientifico,
                apelido,
                foto_url,
                data_aquisicao,
                observacao,
            } = req.body;

            const data = {
               fk_usuario_id: req.usuarioId,
               fk_local_id,
               nome_popular,
               nome_cientifico,
               apelido,
               foto_url,
               data_aquisicao,
               observacao,
            }

            const planta = await plantaService.create(data);
          
            return res.status(201).json({ message: "Planta criada com sucesso.", planta });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const plantas = await plantaService.findAll();
            return res.status(200).json({message: "Plantas encontradas com sucesso.", plantas});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findByUserId(req, res) {
        try {
            const userId = req.usuarioId;
            const plantas = await plantaService.findByUserId(userId);
            return res.status(200).json({message: "Plantas encontradas com sucesso.", plantas});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const planta = await plantaService.findById(req.params.id);
            return res.status(200).json({message: "Planta encontrada com sucesso.", planta});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export default new PlantaController();