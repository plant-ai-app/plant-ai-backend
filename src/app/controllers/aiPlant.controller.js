import aiPlantService from "../services/aiPlant.service.js";

class AIPlantController {

    async getDetails(req, res) {
        try {
            
            const { scientificName } = req.params;

            const plantData = await aiPlantService.getGetOrCreatePlantData(scientificName);

            return res.status(200).json({
                message: "Dados botânicos da planta obtidos com sucesso!",
                data: plantData
            });

            } catch (error) {
                console.error("Erro no AiPlantController:", error.message);
                return res.status(500).json({ 
                    error: "Falha ao processar os dados botânicos da planta.",
                    details: error.message 
                });
            }
    }

}

export default new AIPlantController();
