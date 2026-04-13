import plantaService from "../services/planta.service.js";

class PlantaController {
    
    create = async (req, res) => {
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

            const hostUrl = `${req.protocol}://${req.get("host")}`;

            const data = {
               fk_usuario_id: req.usuarioId,
               fk_local_id,
               nome_popular,
               nome_cientifico,
               apelido,
               foto_url,
               data_aquisicao,
               observacao,
               hostUrl
            }

            const planta = await plantaService.create(data);
          
            return res.status(201).json({ 
                message: "Planta criada com sucesso.", 
                planta: this._formatPlanta(planta, hostUrl) 
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }

    findAll = async (req, res) => {
        try {
            const hostUrl = `${req.protocol}://${req.get("host")}`;
            const plantas = await plantaService.findAll();
            const formattedPlantas = plantas.map(p => this._formatPlanta(p, hostUrl));
            return res.status(200).json({message: "Plantas encontradas com sucesso.", plantas: formattedPlantas});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findByUserId = async (req, res) => {
        try {
            const hostUrl = `${req.protocol}://${req.get("host")}`;
            const userId = req.usuarioId;
            const plantas = await plantaService.findByUserId(userId);
            const formattedPlantas = plantas.map(p => this._formatPlanta(p, hostUrl));
            return res.status(200).json({message: "Plantas encontradas com sucesso.", plantas: formattedPlantas});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    findById = async (req, res) => {
        try {
            const hostUrl = `${req.protocol}://${req.get("host")}`;
            const planta = await plantaService.findById(req.params.id);
            return res.status(200).json({message: "Planta encontrada com sucesso.", planta: this._formatPlanta(planta, hostUrl)});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const userId = req.usuarioId;

            await plantaService.delete(userId);

            return res.status(200).json({ message: "Planta deletada com sucesso." });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    _formatPlanta = (planta, hostUrl) => {
        if (!planta) return null;
        if (planta.foto_url && !planta.foto_url.startsWith("http")) {
            planta.foto_url = `${hostUrl}${planta.foto_url}`;
        }
        return planta;
    }

}

export default new PlantaController();