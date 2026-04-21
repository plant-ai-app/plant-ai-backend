import prisma from "../../databases/prisma.js";

class CuidadoTipoRepository {

    findAll = async () => {
        return await prisma.cuidadoTipo.findMany();
    }

    findById = async (id) => {
        return await prisma.cuidadoTipo.findUnique({
            where: { id }
        });
    }

}

export default new CuidadoTipoRepository();
