import aiPlantRepository from '../repositories/aiPlant.repository.js';
import { generatePlantData } from '../../infra/gemini/gemini.service.js';

class AIPlantService {
    async getGetOrCreatePlantData(scientificName) {
        if(!scientificName) {
            throw new Error("O nome científico é obrigatório para buscar os dados da planta.");
        }

        // 1. Regra de Negócio: Verifica se os dados já existem no Mongo
        let plant = await aiPlantRepository.findByScientificName(scientificName);

        if (plant) {
          console.log(`[Cache NoSQL] Dados de "${scientificName}" recuperados do MongoDB.`);
          return plant;
        }

        // 2. Se não existir, a IA entra em ação externa
        console.log(`[IA Gemini] Gerando novos dados estruturados para "${scientificName}"...`);
        const generatedData = await generatePlantData(scientificName);

        // 3. Persiste no MongoDB através do repository para futuras consultas
        plant = await aiPlantRepository.create(generatedData);

        return plant;
    }
}

export default new AIPlantService();
