import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("🟢 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};

