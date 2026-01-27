export const validarCriacaoUsuario = (name, email, senha) => {

    name = name?.trim();
    email = email?.trim().toLowerCase();
    senha = senha?.trim();

    if (!name || !email || !senha) {
        throw new Error("Nome, e-mail e senha são obrigatórios.");
    }
    
    validarSenha(senha);
}

export const validarLoginUsuario = (email, senha) => {

    email = email?.trim().toLowerCase();
    senha = senha?.trim();

    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }
}

export const validarAtualizacaoUsuario = (data) =>{
    const camposPermitidos = ["nome", "email", "fk_foto_perfil"];
    const camposRecebidos = Object.keys(data);

    const camposInvalidos = camposRecebidos.filter(campo => !camposPermitidos.includes(campo));

    if (camposInvalidos.length > 0) {
        throw new Error(`Campos inválidos para atualização: ${camposInvalidos.join(", ")}`);
    }

    if(data.nome && data.nome.length < 3){
        throw new Error("O nome deve ter no mínimo 3 caracteres.");
    }
    if (data.email && !data.email.includes("@")) {
        throw new Error("Email inválido");
    }


}

export function validarSenha(senha) {
  if (!senha) {
    throw new Error("Senha é obrigatória");
  }

  if (senha.length < 8) {
    throw new Error("Senha deve ter no mínimo 8 caracteres");
  }

  if (!/[A-Z]/.test(senha)) {
    throw new Error("Senha deve conter letra maiúscula");
  }

  if (!/[a-z]/.test(senha)) {
    throw new Error("Senha deve conter letra minúscula");
  }

  if (!/[0-9]/.test(senha)) {
    throw new Error("Senha deve conter número");
  }

  if (!/[@$!%*?&#]/.test(senha)) {
    throw new Error("Senha deve conter caractere especial");
  }
}
