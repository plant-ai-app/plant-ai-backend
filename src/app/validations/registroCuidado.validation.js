import cuidadoRepository from "../repositories/cuidado.repository.js";

export const validateRegistroCuidadoCreate = async (data) => {
    if (!data.cuidado_id) {
        throw new Error("O campo 'cuidado_id' é obrigatório.");
    }
    if (!data.data_prevista) {
        throw new Error("O campo 'data_prevista' é obrigatório.");
    }
    if (!data.status) {
        throw new Error("O campo 'status' é obrigatório.");
    }

    // Validação se o status é válido
    if (!['CONCLUIDO', 'PULADO'].includes(data.status)) {
        throw new Error("Status inválido. Deve ser 'CONCLUIDO' ou 'PULADO'.");
    }

    // Buscar o Cuidado pelo cuidado_id
    const cuidado = await cuidadoRepository.findById(data.cuidado_id);
    if (!cuidado) {
        throw new Error("Cuidado não encontrado.");
    }

    return cuidado;
}

export const validateRegistroCuidadoUpdate = (data) => {
    if (data.status && !['CONCLUIDO', 'PULADO'].includes(data.status)) {
        throw new Error("Status inválido. Deve ser 'CONCLUIDO' ou 'PULADO'.");
    }
}
