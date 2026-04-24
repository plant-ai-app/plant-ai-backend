import plantnetService from "../services/plantnet.service.js";

class PlantnetController {
    
    async identify(req, res) {
        try {
            // Este endpoint pode receber a imagem ou a url da imagem
            // para enviar para identificação no Pl@ntNet.
            const plants = await plantnetService.identify(req);
            console.log("Identificação realizada com sucesso.", plants)
            return res.status(200).json({ message: "Identificação realizada com sucesso.", plants });
        } catch (error) {
            // Se o erro for de "não encontrada", podemos retornar um 404, senão 400.
            const status = error.message.includes("Não foi possível") ? 404 : 400;
            return res.status(status).json({ message: error.message, plants: [] });
        }
    }

}

export default new PlantnetController();
