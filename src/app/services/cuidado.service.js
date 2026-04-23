import cuidadoRepository from "../repositories/cuidado.repository.js";
import { validateUniqueCareType } from "../validations/cuidado.validation.js";

class CuidadoService {

    async create(data) {
        if (!data.planta_id) {
            throw new Error("O campo 'planta_id' é obrigatório.");
        }
        if (!data.tipo_id) {
            throw new Error("O campo 'tipo_id' é obrigatório.");
        }
        if (!data.frequencia_dias) {
            throw new Error("O campo 'frequencia_dias' é obrigatório.");
        }
        if (!data.proxima_data) {
            throw new Error("O campo 'proxima_data' é obrigatório.");
        }

        if (data.quantidade_instrucao && data.quantidade_instrucao.length > 80) {
            throw new Error("O campo 'quantidade_instrucao' não pode exceder 80 caracteres.");
        }

        await validateUniqueCareType(data.planta_id, data.tipo_id);

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

        if (data.quantidade_instrucao && data.quantidade_instrucao.length > 80) {
            throw new Error("O campo 'quantidade_instrucao' não pode exceder 80 caracteres.");
        }

        return await cuidadoRepository.update(id, data);
    }

    async delete(id) {
        await this.findById(id);
        return await cuidadoRepository.delete(id);
    }

}

export default new CuidadoService();
