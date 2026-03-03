import prisma from "../../databases/prisma";

class localRepository{

    create = async (data) => {
        return await prisma.local.create({
            data
        });
    }


}

export default new localRepository();