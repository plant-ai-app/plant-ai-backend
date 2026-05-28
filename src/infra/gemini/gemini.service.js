// src/infra/gemini/gemini.service.js
import genAI from "./gemini.js"; // Importa a instância que você já configurou
import { plantSchema } from "./plant-schema.js"; // Importa o schema validado

export const generatePlantData = async (plantName) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: plantSchema, // 🚀 O contrato de dados que validamos
    },
  });

  const prompt = `
    Atue como um botânico especialista. Forneça os dados detalhados para a planta: "${plantName}".
    
    REGRAS DE FORMATAÇÃO:
    - Retorne as informações estritamente no formato JSON definido pelo Schema.
    - Todos os textos descritivos devem ser em Português do Brasil.
    - Respeite rigorosamente as contagens de palavras e restrições de formatação.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Erro na geração de dados pelo Gemini:", error);
    throw new Error("Falha ao consultar a IA para os dados da planta.");
  }
};