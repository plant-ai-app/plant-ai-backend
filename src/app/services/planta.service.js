import plantaRepository from "../repositories/planta.repository.js";
import { validarCriacaoPlanta } from "../validations/planta.validation.js";
import fs from "fs";
import path from "path";

class PlantaService {

    async create(data) {
        validarCriacaoPlanta(data);

        if (data.foto_url && data.foto_url.startsWith("data:image")) {
            const base64Data = data.foto_url.replace(/^data:image\/\w+;base64,/, "");
            const ext = data.foto_url.substring("data:image/".length, data.foto_url.indexOf(";base64"));
            const filename = `plant_${Date.now()}.${ext}`;
            const userFolder = `user_${data.fk_usuario_id}`;
            const uploadsDir = path.resolve("uploads", userFolder);
            
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const filepath = path.resolve(uploadsDir, filename);
            fs.writeFileSync(filepath, base64Data, 'base64');
            
            data.foto_url = `/uploads/${userFolder}/${filename}`;
        }
        
        const { hostUrl, ...dataToSave } = data;

        return await plantaRepository.create(dataToSave);
    }

    async findAll() {
        return await plantaRepository.findAll();
    }

    async findByUserId(fk_usuario_id) {
        return await plantaRepository.findByUserId(fk_usuario_id);
    }

    async findById(id) {
        return await plantaRepository.findById(id);
    }

    async delete(userId) {
        return await plantaRepository.delete(userId);
    }

}

export default new PlantaService();