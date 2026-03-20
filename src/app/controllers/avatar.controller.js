import avatarService from "../services/avatar.service.js";

class AvatarController {
    
    async getAll(req, res) {
       try {
            const avatars = await avatarService.getAll();

            const urls = avatars.map(avatar => ({
                id: avatar.id,
                url: `${req.protocol}://${req.get("host")}/uploads/${avatar.path_url}`
            }));

            return res.status(200).json({
                message: "Avatares listados com sucesso!",
                data: { images: urls }
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

export default new AvatarController();