import cuidadoTipoRepository from "../repositories/cuidadoTipo.repository.js";

class CuidadoTipoService {
    async findAll() {
        return await cuidadoTipoRepository.findAll();
    }

    async findById(id) {
        const cuidadoTipo = await cuidadoTipoRepository.findById(id);
        if (!cuidadoTipo) {
            throw new Error("Tipo de cuidado não encontrado.");
        }
        return cuidadoTipo;
    }
}

export default new CuidadoTipoService();
