import prisma from "../../databases/prisma.js";

class CuidadoRepository {

    create = async (data) => {
        return await prisma.cuidado.create({
            data: {
                ...data,
                proxima_data: new Date(data.proxima_data)
            },
            include: {
                tipo: true,
                planta: true
            }
        });
    }

    findAll = async () => {
        return await prisma.cuidado.findMany({
            include: {
                tipo: true,
                planta: true
            }
        });
    }

    findById = async (id) => {
        return await prisma.cuidado.findUnique({
            where: { id },
            include: {
                tipo: true,
                planta: true,
                historicos: true
            }
        });
    }

    findByPlantaId = async (planta_id) => {
        return await prisma.cuidado.findMany({
            where: { planta_id },
            include: {
                tipo: true
            }
        });
    }

    update = async (id, data) => {
        if (data.proxima_data) {
            data.proxima_data = new Date(data.proxima_data);
        }

        return await prisma.cuidado.update({
            where: { id },
            data,
            include: {
                tipo: true,
                planta: true
            }
        });
    }

    delete = async (id) => {
        return await prisma.cuidado.delete({
            where: { id }
        });
    }

}

export default new CuidadoRepository();
