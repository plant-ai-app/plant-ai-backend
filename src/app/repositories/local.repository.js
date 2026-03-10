import prisma from "../../databases/prisma.js";

class localRepository {

    create = async (data) => {
        return await prisma.local.create({
            data
        });
    }

    findAll = async () => {
        return await prisma.local.findMany()
    }



}

export default new localRepository();