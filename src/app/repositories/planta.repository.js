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
    
    findAll = async () =>{
        return await prisma.planta.findMany();
    }

    findByUserId = async (fk_usuario_id) =>{
        return await prisma.planta.findMany({
            where: {
                fk_usuario_id
            }
        });
    }

    findById = async (id) => {
        return await prisma.planta.findUnique({
            where: {
                id
            }
        });
    }

    delete = async (userId) => {
        return await prisma.planta.delete({
            where: {
                fk_usuario_id: userId
            }
        });
    }

}

export default new PlantaRepository();