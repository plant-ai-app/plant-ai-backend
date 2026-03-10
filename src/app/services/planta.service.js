import plantaRepository from "../repositories/planta.repository.js";
import { validarCriacaoPlanta } from "../middlewares/validations/planta.validation.js";

class PlantaService {
    
    async create(data) {
        validarCriacaoPlanta(data);
        return await plantaRepository.create(data);
    }

    async findAll() {
        return await plantaRepository.findAll();
    }

    async findByUserId(fk_usuario_id) {
        return await plantaRepository.findByUserId(fk_usuario_id);
    }

    async findById(id) {
        return await plantaRepository.findById(id);
    }

}

export default new PlantaService();