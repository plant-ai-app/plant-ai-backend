import localService from "../services/local.service.js";

class LocalController {
    async store(req, res) {
        
    }

    async findAll(req, res) {
        try {
            const locais = await localService.findAll();
            return res.status(200).json({message: 'Locais encontrados', locais});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

export default new LocalController();