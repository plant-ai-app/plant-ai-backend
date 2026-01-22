import dotenv from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client/index.js";

dotenv.config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({adapter});

export default prisma;
