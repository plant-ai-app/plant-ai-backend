import cuidadoTipoRepository from "../repositories/cuidadoTipo.repository.js";

class CuidadoTipoService {
    async findAll() {
        return await cuidadoTipoRepository.findAll();
    }
}

export default new CuidadoTipoService();
