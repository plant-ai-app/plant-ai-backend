import passwordService from "../services/password.service";

class passwordController{
    forgot = async (req, res) => {
        try {
            const {email} = req.body;

            await passwordService.forgotPassword(email);

            return res.status(200).json({message: "Se o e-mail existir em nossa base, um link de recuperação de senha será enviado."});
        } catch (error) {
            return res.status(500).json({ error: "Erro ao processar solicitação." });
        }
    }
}
export default new passwordController();
