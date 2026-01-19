import "dotenv/config";
import { defineConfig, env} from "prisma/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
    url: env("DATABASE_URL")
});

const prisma = new PrismaClient();

export default prisma;