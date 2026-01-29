import prisma from "../../databases/prisma.js";

class PasswordRepository {
    
  async findUserByEmail(email) {
    return prisma.usuario.findUnique({
      where: { email }
    });
  }

  // Invalidar tokens antigos (encerrar_em != null)
  async invalidateUserTokens(usuarioId) {
    return prisma.pwd_reset_token.updateMany({
      where: {
        fk_usuario_id: usuarioId,
        encerrado_em: null
      },
      data: {
        encerrado_em: new Date()
      }
    });
  }

  async createToken(data) {
    return prisma.pwd_reset_token.create({ data });
  }

  async findActiveToken(){
    return prisma.pwd
  }
}

export default new PasswordRepository();
