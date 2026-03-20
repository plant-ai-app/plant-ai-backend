import fs from "fs";
import path from "path";
import avatarRepository from "../repositories/avatar.repository.js";

class AvatarService {
    
    async getAll() {
        const avatars = await avatarRepository.getAll();
        return avatars;
    }
}

export default new AvatarService();