import prisma from "../../databases/prisma.js";

class UsuarioRepository {

    async findAll() {
        return await prisma.usuario.findMany();
    }

}

export default new UsuarioRepository();
