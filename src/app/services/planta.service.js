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

    async delete(id, userId) {
        const planta = await plantaRepository.findById(id);
        
        if (!planta) {
            throw new Error("Planta não encontrada.");
        }
        
        if (planta.fk_usuario_id !== userId) {
            throw new Error("Você não tem permissão para deletar esta planta.");
        }

        return await plantaRepository.delete(id);
    }

    async update(id, data, userId) {
        const planta = await plantaRepository.findById(id);
        
        if (!planta) {
            throw new Error("Planta não encontrada.");
        }
        
        if (planta.fk_usuario_id !== userId) {
            throw new Error("Você não tem permissão para editar esta planta.");
        }

        if (data.foto_url && data.foto_url.startsWith("data:image")) {
            const base64Data = data.foto_url.replace(/^data:image\/\w+;base64,/, "");
            const ext = data.foto_url.substring("data:image/".length, data.foto_url.indexOf(";base64"));
            const filename = `plant_${Date.now()}.${ext}`;
            const userFolder = `user_${userId}`;
            const uploadsDir = path.resolve("uploads", userFolder);
            
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const filepath = path.resolve(uploadsDir, filename);
            fs.writeFileSync(filepath, base64Data, 'base64');
            
            data.foto_url = `/uploads/${userFolder}/${filename}`;
        } else if (data.foto_url && data.foto_url.startsWith("http")) {
             // Se já for uma URL completa (ex: do nosso próprio servidor), precisamos extrair só o caminho relativo
             try {
                const urlObj = new URL(data.foto_url);
                data.foto_url = urlObj.pathname;
             } catch (e) {
                // Ignore se não for uma URL válida
             }
        }

        const { hostUrl, id: _id, fk_usuario_id, criado_em, atualizado_em, local, usuario, cuidados, ...dataToUpdate } = data;

        if (dataToUpdate.data_aquisicao) {
            dataToUpdate.data_aquisicao = new Date(dataToUpdate.data_aquisicao);
        }

        return await plantaRepository.update(id, dataToUpdate);
    }

}

export default new PlantaService();