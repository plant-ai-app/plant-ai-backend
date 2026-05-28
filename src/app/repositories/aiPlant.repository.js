import PlantCollection from '../collections/plant.collection.js';

class AIPlantRepository {

    // Busca uma planta pelo nome científico (que definimos como index único)
    async findByScientificName(scientificName) {
        return await PlantCollection.findOne({ scientific_name: scientificName });
    }

    // Cria o registro dos dados gerados no MongoDB
    async create(plantData) {
        return await PlantCollection.create(plantData);
    }
    

}

export default new AIPlantRepository();
