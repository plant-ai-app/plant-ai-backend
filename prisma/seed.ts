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

  // Imagens de perfil disponíveis na pasta /perfil
  const fotosPerfil = [
    { id: 1, path_url: 'perfil/default.png' },
    { id: 2, path_url: 'perfil/avatar1.png' },
    { id: 3, path_url: 'perfil/avatar2.png' },
    { id: 4, path_url: 'perfil/avatar3.png' },
    { id: 5, path_url: 'perfil/avatar4.png' },
    { id: 6, path_url: 'perfil/avatar5.png' },
    { id: 7, path_url: 'perfil/avatar6.png' },
  ];

  for (const foto of fotosPerfil) {
    await prisma.fotoPerfil.upsert({
      where: { id: foto.id },
      update: { path_url: foto.path_url },
      create: foto,
    });
  }

  // O createMany já insere tudo de uma vez de forma performática
  const resultadoTipos = await prisma.cuidadoTipo.createMany({
    data: tiposIniciais,
    skipDuplicates: true,
  });

  const locaisIniciais = [
    { id: 1, nome: 'Quarto' },
    { id: 2, nome: 'Sala' },
    { id: 3, nome: 'Cozinha' },
    { id: 4, nome: 'Banheiro' },
    { id: 5, nome: 'Escritório' },
    { id: 6, nome: 'Jardim' },
    { id: 7, nome: 'Varanda' },
    { id: 8, nome: 'Quintal' },
    { id: 9, nome: 'nenhum' }
  ];

  for (const local of locaisIniciais) {
    await prisma.local.upsert({
      where: { id: local.id },
      update: { nome: local.nome },
      create: local,
    });
  }

  console.log('✅ Seed concluído!');
  console.log(`- ${fotosPerfil.length} fotos de perfil verificadas/inseridas.`);
  console.log(`- ${resultadoTipos.count} tipos de cuidados inseridos/verificados.`);
  console.log(`- ${locaisIniciais.length} locais inseridos/verificados.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })