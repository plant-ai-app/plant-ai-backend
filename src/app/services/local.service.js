import localRepository from "../repositories/local.repository.js";

class LocalService {
    async findAll() {
        return await localRepository.findAll();
    }
}

export default new LocalService();