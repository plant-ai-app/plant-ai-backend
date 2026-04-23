import prisma from "../../databases/prisma.js";

class CuidadoRepository {

    create = async (data) => {
        return await prisma.cuidado.create({
            data: {
                ...data,
                proxima_data: new Date(data.proxima_data)
            },
            include: {
                tipo: true
            }
        });
    }
    //buscar todos os cuidados da tabela
    findAll = async () => {
        return await prisma.cuidado.findMany({
            include: {
                tipo: true
            }
        });
    }

    //buscar todos os cuidados de um usuario específico com dados formatados para o frontend
    findAllByUsuarioId = async (usuario_id) => {
        return await prisma.cuidado.findMany({
            where: {
                planta: {
                    fk_usuario_id: usuario_id
                }
            },
            select: {
                id: true,
                proxima_data: true,
                quantidade_instrucao: true,
                horario_preferencial: true,
                tipo: {
                    select: {
                        nome: true
                    }
                },
                planta: {
                    select: {
                        apelido: true,
                        foto_url: true
                    }
                }
            },
            orderBy: {
                proxima_data: 'asc'
            }
    });
    }

    findById = async (id) => {
        return await prisma.cuidado.findUnique({
            where: { id },
            include: {
                tipo: true
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

    findByPlantaAndTipo = async (planta_id, tipo_id) => {
        return await prisma.cuidado.findFirst({
            where: { 
                planta_id,
                tipo_id
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
                tipo: true
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
