import plantaRepository from "../repositories/planta.repository.js";
import { validarCriacaoPlanta } from "../validations/planta.validation.js";

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

    async delete(userId) {
        return await plantaRepository.delete(userId);
    }

}

export default new PlantaService();