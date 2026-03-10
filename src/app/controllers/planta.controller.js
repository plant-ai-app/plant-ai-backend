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
}

export default new PlantaController();