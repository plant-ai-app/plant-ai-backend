import prisma from "../../databases/prisma.js";

class CuidadoTipoRepository {

    findAll = async () => {
        return await prisma.cuidadoTipo.findMany()
    }

}

export default new CuidadoTipoRepository();
