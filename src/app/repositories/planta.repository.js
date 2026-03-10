import prisma from "../../databases/prisma.js";

class PlantaRepository {

    create = async (data) => {
        return await prisma.planta.create({
            data: {
                ...data,
                data_aquisicao: new Date(data.data_aquisicao)
            }
        });
    }

}

export default new PlantaRepository();