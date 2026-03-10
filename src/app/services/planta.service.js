import plantaRepository from "../repositories/planta.repository.js";
import { validarCriacaoPlanta } from "../middlewares/validations/planta.validation.js";

class PlantaService {
    
    async create(data) {
        validarCriacaoPlanta(data);
        return await plantaRepository.create(data);
    }

}

export default new PlantaService();