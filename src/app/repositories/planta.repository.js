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
        return await prisma.planta.findMany({
            include: {
                local: true
            }
        });
    }

    findByUserId = async (fk_usuario_id) =>{
        return await prisma.planta.findMany({
            where: {
                fk_usuario_id
            },
            include: {
                local: true
            }
        });
    }

    findById = async (id) => {
        return await prisma.planta.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                cuidados: true
            }
        });
    }

    delete = async (id) => {
        return await prisma.planta.delete({
            where: {
                id: parseInt(id)
            }
        });
    }

    deleteMany = async (ids, fk_usuario_id) => {
        return await prisma.planta.deleteMany({
            where: {
                id: { in: ids.map(id => parseInt(id)) },
                fk_usuario_id
            }
        });
    }

    update = async (id, data) => {
        return await prisma.planta.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

}

export default new PlantaRepository();