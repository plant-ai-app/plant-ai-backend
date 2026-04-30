import cuidadoRepository from "../repositories/cuidado.repository.js";
import { validateCuidadoCreate, validateCuidadoUpdate } from "../validations/cuidado.validation.js";

class CuidadoService {

    async create(data) {
        await validateCuidadoCreate(data);
        return await cuidadoRepository.create(data);
    }

    async findAll() {
        return await cuidadoRepository.findAll();
    }

    async findAllByUsuarioId(usuario_id) {
        return await cuidadoRepository.findAllByUsuarioId(usuario_id);
    }

    async findById(id) {
        const cuidado = await cuidadoRepository.findById(id);
        if (!cuidado) {
            throw new Error("Cuidado não encontrado.");
        }
        return cuidado;
    }

    async findByPlantaId(planta_id) {
        return await cuidadoRepository.findByPlantaId(planta_id);
    }

    async update(id, data) {
        await this.findById(id);

        validateCuidadoUpdate(data);

        return await cuidadoRepository.update(id, data);
    }

    async delete(id) {
        await this.findById(id);
        return await cuidadoRepository.delete(id);
    }

}

export default new CuidadoService();
