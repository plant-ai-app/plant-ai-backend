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


    findAll = async () => {
        return await prisma.historicoCuidado.findMany();
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
