import genAI from './src/infra/gemini/gemini.js';

export default async function testarConexao() {
  try {
    console.log("--- Iniciando teste de conexão com Gemini ---");
    
    // Vamos testar um prompt real sobre plantas com o gemini-2.5-flash
    const response = await genAI.models.generateContent({ 
      model: "gemini-2.5-flash", 
      contents: "Liste 3 benefícios da planta Espada-de-São-Jorge de forma bem resumida." 
    });
    
    console.log("Resposta da API:\n", response.text);
    console.log("--- Teste finalizado com sucesso! ---");
    return response.text;
  } catch (error) {
    console.error("X Erro na conexão:");
    console.error("- Mensagem:", error.message);
    console.error("- Verifique se sua API Key está correta e se você tem acesso à internet.");
  }
}
