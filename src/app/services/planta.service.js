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
            const uploadsDir = path.resolve("uploads", "users", userFolder);
            
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const filepath = path.resolve(uploadsDir, filename);
            fs.writeFileSync(filepath, base64Data, 'base64');
            
            data.foto_url = `/uploads/users/${userFolder}/${filename}`;
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

    _deletarImagem(fotoUrl) {
        if (!fotoUrl) return;

        let relativePath = fotoUrl;
        if (relativePath.startsWith("http")) {
            try {
                const urlObj = new URL(relativePath);
                relativePath = urlObj.pathname;
            } catch (e) {
                // ignore
            }
        }
        relativePath = relativePath.replace(/^\//, "");
        if (relativePath.startsWith("uploads/")) {
            const filepath = path.resolve(relativePath);
            if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
                fs.unlinkSync(filepath);
            }
        }
    }

    async delete(id, userId) {
        const planta = await plantaRepository.findById(id);
        
        if (!planta) {
            throw new Error("Planta não encontrada.");
        }
        
        if (planta.fk_usuario_id !== userId) {
            throw new Error("Você não tem permissão para deletar esta planta.");
        }

        this._deletarImagem(planta.foto_url);

        return await plantaRepository.delete(id);
    }

    async deleteMany(ids, userId) {
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new Error("É necessário informar os IDs das plantas a serem deletadas.");
        }

        const plantas = await plantaRepository.findManyByIdsAndUserId(ids, userId);
        for (const planta of plantas) {
            this._deletarImagem(planta.foto_url);
        }

        return await plantaRepository.deleteMany(ids, userId);
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
            const uploadsDir = path.resolve("uploads", "users", userFolder);
            
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const filepath = path.resolve(uploadsDir, filename);
            fs.writeFileSync(filepath, base64Data, 'base64');
            
            data.foto_url = `/uploads/users/${userFolder}/${filename}`;
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