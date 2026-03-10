export const validarCriacaoPlanta = (data) => {
    const { nome_popular, nome_cientifico, apelido, foto_url, data_aquisicao, observacao } = data;
    
    if(nome_popular.trim().length < 3){
        throw new Error("Nome popular deve ter no mínimo 3 caracteres.");
    }

}