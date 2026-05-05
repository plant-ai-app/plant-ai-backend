import prisma from "../../databases/prisma.js";

class RegistroCuidadoRepository {
      
    createWithTransaction = async (historicoData, cuidadoId, novaProximaData) => {
        return await prisma.$transaction(async (tx) => {
            const historico = await tx.historicoCuidado.create({
                data: historicoData
            });

            await tx.cuidado.update({
                where: { id: cuidadoId },
                data: { proxima_data: novaProximaData }
            });

            return historico;
        });
    }


        findAll = async (usuarioId) => {
            const registros = await prisma.historicoCuidado.findMany({
                where: {
                    cuidado: {
                        planta: {
                            fk_usuario_id: usuarioId
                        }
                    }
                },
                include: {
                    cuidado: {
                        include: {
                            tipo: {
                                select: { id: true, nome: true }
                            },
                            planta: {
                                select: {
                                    id: true,
                                    nome_popular: true,
                                    apelido: true,
                                    foto_url: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    data_prevista: 'desc'
                }
            });

            return registros.map(r => ({
                id: r.id,
                status: r.status ? r.status.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : r.status,
                data_prevista: r.data_prevista ? r.data_prevista.toISOString() : r.data_prevista,
                data_realizacao: r.data_realizacao ? r.data_realizacao.toISOString() : r.data_realizacao,
                tipo: r.cuidado.tipo.nome,
                tipo_id: r.cuidado.tipo.id,
                planta: r.cuidado.planta.apelido || r.cuidado.planta.nome_popular,
                planta_id: r.cuidado.planta.id,
                foto: r.cuidado.planta.foto_url
            }));
        }

    findById = async (id) => {
        return await prisma.historicoCuidado.findUnique({
            where: { id }
        });
    }

    findByCuidadoId = async (cuidado_id) => {
        return await prisma.historicoCuidado.findMany({
            where: { cuidado_id },
            orderBy: { data_prevista: 'desc' }
        });
    }

    update = async (id, data) => {
        return await prisma.historicoCuidado.update({
            where: { id },
            data
        });
    }

    delete = async (id) => {
        return await prisma.historicoCuidado.delete({
            where: { id }
        });
    }
}

export default new RegistroCuidadoRepository();
