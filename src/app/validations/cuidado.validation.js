import cuidadoRepository from "../repositories/cuidado.repository.js";

export const validateUniqueCareType = async (planta_id, tipo_id) => {
    const cuidadoExistente = await cuidadoRepository.findByPlantaAndTipo(planta_id, tipo_id);
    if (cuidadoExistente) {
        throw new Error("Esta planta já possui este tipo de cuidado cadastrado.");
    }
}

export const validateCuidadoCreate = async (data) => {
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
}

export const validateCuidadoUpdate = (data) => {
    if (data.quantidade_instrucao && data.quantidade_instrucao.length > 80) {
        throw new Error("O campo 'quantidade_instrucao' não pode exceder 80 caracteres.");
    }
}

export const validateCuidadoDeleteMany = (ids) => {
    if (!ids) {
        throw new Error("O campo 'ids' é obrigatório.");
    }
    if (!Array.isArray(ids)) {
        throw new Error("O campo 'ids' deve ser um array.");
    }
    if (ids.length === 0) {
        throw new Error("O campo 'ids' não pode estar vazio.");
    }
}
