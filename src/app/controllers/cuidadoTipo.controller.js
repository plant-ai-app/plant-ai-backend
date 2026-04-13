import cuidadoTipoService from "../services/cuidadoTipo.service.js";

class CuidadoTipoController {
    async findAll(req, res) {
        try {
            const tipos = await cuidadoTipoService.findAll();
            return res.status(200).json({ message: 'Tipos de cuidados encontrados', tipos });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new CuidadoTipoController();
