import dotenv from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client/index.js";

dotenv.config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({adapter});
async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...')

  const tiposIniciais = [
    { nome: 'Rega', descricao: 'Adição de água ao solo ou substrato.' },
    { nome: 'Adubação', descricao: 'Aplicação de nutrientes ou fertilizantes para estimular crescimento.' },
    { nome: 'Poda', descricao: 'Remoção de folhas secas, galhos mortos ou excesso de raízes.' },
    { nome: 'Troca de Vaso', descricao: 'Replantio em um recipiente maior com substrato novo.' },
    { nome: 'Controle de Pragas', descricao: 'Aplicação de óleo de neem, inseticidas ou limpeza manual.' },
    { nome: 'Limpeza das Folhas', descricao: 'Remoção de poeira das folhas com pano úmido para facilitar a fotossíntese.' },
    { nome: 'Exposição Solar', descricao: 'Ajuste temporário do vaso para receber mais ou menos luz solar.' }
  ];

  // O createMany já insere tudo de uma vez de forma performática
  const resultado = await prisma.cuidadoTipo.createMany({
    data: tiposIniciais,
    skipDuplicates: true, // Garante que não vai duplicar se você rodar o comando duas vezes
  });

  console.log(`✅ Seed concluído! Foram inseridos/verificados ${resultado.count} tipos de cuidados.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })