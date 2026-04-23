import cuidadoRepository from "../repositories/cuidado.repository.js";

export const validateUniqueCareType = async (planta_id, tipo_id) => {
    const cuidadoExistente = await cuidadoRepository.findByPlantaAndTipo(planta_id, tipo_id);
    if (cuidadoExistente) {
        throw new Error("Esta planta já possui este tipo de cuidado cadastrado.");
    }
}
