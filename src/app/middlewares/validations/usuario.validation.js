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