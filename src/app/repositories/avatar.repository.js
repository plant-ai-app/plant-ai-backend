import prisma from "../../databases/prisma.js";

class AvatarRepository {

    async getAll() {
      return await prisma.fotoPerfil.findMany({
            orderBy: {
                id: "asc"
            }
        })

    }
    
}

export default new AvatarRepository();