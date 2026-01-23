import prisma from "../../databases/prisma.js";

class UsuarioRepository {

    constructor() {
        this.prisma = prisma;
    }

    create = async (data) => {
        return await this.prisma.usuario.create({
            data
        });
    }

    findAll = async () => {
        return await this.prisma.usuario.findMany({
            include:{
                foto_perfil: true
            }
        });
    }

    findById = async (id) => {
        return await this.prisma.usuario.findUnique({
            where: { id },
            include:{
                foto_perfil: true
            }
        });
    }

    findByEmail = async (email) => {
        return await this.prisma.usuario.findUnique({
            where: { email }
        })
    }


}

export default new UsuarioRepository();
