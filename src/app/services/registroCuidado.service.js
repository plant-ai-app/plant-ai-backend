import registroCuidadoRepository from "../repositories/registroCuidado.repository.js";
import { validateRegistroCuidadoCreate, validateRegistroCuidadoUpdate } from "../validations/registroCuidado.validation.js";

class RegistroCuidadoService {

    calculateNextDate(baseDate, frequencyDays) {
        const nextDate = new Date(baseDate);
        const now = new Date();
        
        // Somar a frequência em loop até que a nova data seja > data atual
        do {
            nextDate.setDate(nextDate.getDate() + frequencyDays);
        } while (nextDate <= now);

        return nextDate;
    }

    async create(data) {
        const cuidado = await validateRegistroCuidadoCreate(data);

        // Calcular a nova proxima_data
        const novaProximaData = this.calculateNextDate(cuidado.proxima_data, cuidado.frequencia_dias);

        // Criar o registro em HistoricoCuidado e atualizar a proxima_data do Cuidado
        return await registroCuidadoRepository.createWithTransaction(data, cuidado.id, novaProximaData);
    }

    async findAll() {
        return await registroCuidadoRepository.findAll();
    }

    async findById(id) {
        const registro = await registroCuidadoRepository.findById(id);
        if (!registro) {
            throw new Error("Registro de cuidado não encontrado.");
        }
        return registro;
    }

    async findByCuidadoId(cuidado_id) {
        return await registroCuidadoRepository.findByCuidadoId(cuidado_id);
    }

    async update(id, data) {
        await this.findById(id);

        validateRegistroCuidadoUpdate(data);

        return await registroCuidadoRepository.update(id, data);
    }

    async delete(id) {
        await this.findById(id);
        return await registroCuidadoRepository.delete(id);
    }

}

export default new RegistroCuidadoService();
