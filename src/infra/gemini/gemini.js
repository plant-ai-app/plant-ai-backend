import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("ERRO: GEMINI_API_KEY não encontrada no arquivo .env");
}

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default genAI;

