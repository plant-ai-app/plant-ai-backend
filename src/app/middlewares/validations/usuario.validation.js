export const validarCriacaoUsuario = (name, email, senha) => {

    name = name?.trim();
    email = email?.trim().toLowerCase();
    senha = senha?.trim();

    if (!name || !email || !senha) {
        throw new Error("Nome, e-mail e senha são obrigatórios.");
    }

    if (senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
    }
}

export const validarLoginUsuario = (email, senha) => {

    email = email?.trim().toLowerCase();
    senha = senha?.trim();

    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }
}