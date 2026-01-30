import transporter from "./email.config.js";

class EmailService {

  async sendPasswordReset(email, link) {
    const brandColor = "#2E7D32"; // Verde Floresta
    const accentColor = "#4CAF50"; // Verde Vibrante
    const backgroundColor = "#F4F6F4"; // Cinza/Verde muito claro para o fundo
  
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Redefinição de Senha | Seu App de Plantas",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${backgroundColor}; color: #333333;">
          
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <div style="background-color: ${brandColor}; padding: 30px 20px; text-align: center;">
              <div style="font-size: 40px; margin-bottom: 10px;">🌿</div> 
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Recuperação de Senha</h1>
            </div>
  
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #444444;">
                Olá, tudo bem?
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #444444;">
                Recebemos uma solicitação para redefinir a senha da sua conta. Para continuar e criar uma nova senha, basta clicar no botão abaixo:
              </p>
  
              <div style="text-align: center; margin-bottom: 35px;">
                <a href="${link}" style="background-color: ${accentColor}; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 50px; display: inline-block; transition: background-color 0.3s;">
                  Redefinir Minha Senha
                </a>
              </div>
  
              <div style="background-color: #e8f5e9; border-left: 4px solid ${brandColor}; padding: 15px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0; font-size: 14px; color: #2e5c31;">
                  <strong>Atenção:</strong> Este link é válido apenas por <strong>15 minutos</strong>.
                </p>
              </div>
  
              <p style="font-size: 14px; color: #888888; margin-top: 20px; text-align: center;">
                Se você não solicitou essa alteração, por favor, desconsidere este e-mail. Sua senha atual permanecerá inalterada.
              </p>
            </div>
  
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} App de Plantas. Cuidando do seu jardim.</p>
            </div>
          </div>
  
        </body>
        </html>
      `
    });
}
}

export default new EmailService();
