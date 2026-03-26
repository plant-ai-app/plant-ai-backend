import { identifyPlant } from "../../infra/plantnet/plantnet.js";

class PlantnetService {

    async identify(req) {
        // Exemplo: recebendo um arquivo vindo de um formdata (ex: multer) 
        // ou arquivo base64, buffer etc.
        if (!req.file && !req.body.imageBuffer) {
             throw new Error("Nenhuma imagem fornecida para identificação.");
        }

        const imageBuffer = req.file ? req.file.buffer : req.body.imageBuffer;
        
        const rawResult = await identifyPlant(imageBuffer);

        if (!rawResult || !Array.isArray(rawResult.results)) {
             return [];
        }

        // Limita a 6 possíveis plantas, embora a API já possa estar retornando esse limite.
        const topResults = rawResult.results.slice(0, 6);

        const mappedPlants = topResults.map(item => {
            const species = item.species || {};
            const family = species.family || {};
            
            // Limita a no máximo 6 fotos por planta
            const rawImages = Array.isArray(item.images) ? item.images.slice(0, 6) : [];
            
            const mappedImages = rawImages.map(img => ({
                url: img.url && img.url.o ? img.url.o : '',
                author: img.author || '',
                license: img.license || '',
                citation: img.citation || ''
            }));

            return {
                name: species.scientificNameWithoutAuthor || "Desconhecida",
                scientificName: species.scientificName || "Desconhecida",
                family: family.scientificName || "Desconhecida",
                commonNames: species.commonNames || [],
                score: item.score || 0,
                images: mappedImages
            };
        });

        return mappedPlants;
    }

}

export default new PlantnetService();
