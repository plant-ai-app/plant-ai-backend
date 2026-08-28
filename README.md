# 🌿 Plant AI - Backend API

API RESTful desenvolvida em **Node.js** e **Express** para gerenciamento de plantas, rotinas de cuidados (rega, poda, adubação), identificação botânica por imagem através de inteligência artificial e geração de recomendações personalizadas.

---

## 🛠️ Pré-requisitos e Ferramentas Necessárias

Antes de baixar e executar este projeto localmente, certifique-se de ter as seguintes ferramentas instaladas e configuradas em seu ambiente:

### 1. Ambiente de Execução & Pacotes
* **[Node.js](https://nodejs.org/)** (Versão `18.x` ou superior - LTS recomendada)
* **[NPM](https://www.npmjs.com/)** (Geralmente incluído com o Node.js)
* **[Git](https://git-scm.com/)** (Para clonar o repositório e versionamento)

### 2. Bancos de Dados
O projeto utiliza uma arquitetura híbrida com dois bancos de dados:
* **[MySQL](https://www.mysql.com/)** ou **[MariaDB](https://mariadb.org/)**:
  * Utilizado como banco relacional principal via **Prisma ORM** (armazena usuários, plantas, locais, tipos de cuidados e históricos).
* **[MongoDB](https://www.mongodb.com/)**:
  * Utilizado como banco NoSQL via **Mongoose** (armazenamento de coleções e dados flexíveis).
  * *Pode ser instalado localmente, via [MongoDB Compass](https://www.mongodb.com/products/compass), [Docker](https://www.docker.com/) ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) na nuvem.*

### 3. Chaves de APIs Externas & Serviços
Para que todas as funcionalidades funcionem corretamente, obtenha as seguintes chaves de acesso:
* **Google Gemini API Key:** Necessária para os recursos de IA generativa.
  * 👉 Obtenha gratuitamente em: [Google AI Studio](https://aistudio.google.com/app/apikey)
* **Pl@ntNet API Key:** Necessária para o reconhecimento e identificação de espécies de plantas por imagem.
  * 👉 Cadastre-se e obtenha sua chave em: [Pl@ntNet API](https://my.plantnet.org/)
* **Servidor SMTP (E-mail):** Necessário para o envio de e-mails de recuperação de senha.
  * Pode ser uma conta **Gmail** (com *Senha de App* de 16 dígitos gerada em [Google App Passwords](https://myaccount.google.com/apppasswords)) ou um serviço de testes como o **[Mailtrap](https://mailtrap.io/)**.

### 4. Ferramenta de Testes de API *(Opcional)*
* **[Postman](https://www.postman.com/)**, **[Insomnia](https://insomnia.rest/)** ou a extensão **Thunder Client** do VS Code para realizar requisições aos endpoints.

---

## 🚀 Passo a Passo para Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/plant-ai-app/plant-ai-backend.git
cd plant-ai-backend
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no arquivo de exemplo `.env.example`:

```bash
# No Linux/macOS ou Git Bash:
cp .env.example .env

# No Windows (PowerShell):
copy .env.example .env
```

Abra o arquivo `.env` e preencha as variáveis com suas credenciais:

```env
# Servidor
ADRESS="localhost"
PORT=3000

# Bancos de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/plant_ai_mysql"
MONGO_URL="mongodb://localhost:27017/plant_ai_mongo"

# Segurança
JWT_SECRET="seu_jwt_secret_aqui"

# Integrações de IA & Botânica
GEMINI_API_KEY="sua_chave_gemini_aqui"
PLANTNET_API_KEY="sua_chave_plantnet_aqui"

# Serviço de E-mail (SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="sua_senha_de_app_de_16_digitos"
EMAIL_FROM="Plant AI <seu_email@gmail.com>"
```

### 4. Configurar e Popular o Banco de Dados (Prisma)

1. Execute as migrações para criar as tabelas no MySQL/MariaDB:
   ```bash
   npx prisma migrate dev
   ```

2. Execute o **seed** para popular o banco com os dados iniciais obrigatórios (avatares de perfil, locais e tipos de cuidados):
   ```bash
   npx tsx prisma/seed.ts
   ```

### 5. Iniciar o Servidor

* **Modo de Desenvolvimento** (com *live-reload* via Nodemon):
  ```bash
  npm run dev
  ```

O servidor estará disponível em: `http://localhost:3000`

---

## 📋 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
| :--- | :---: | :--- |
| `DATABASE_URL` | Sim | String de conexão com o banco MySQL/MariaDB (Prisma). |
| `MONGO_URL` | Sim | String de conexão com o banco MongoDB (Mongoose). |
| `PORT` | Não | Porta em que o servidor Express rodará (Padrão: `3000`). |
| `ADRESS` | Não | Host do servidor (Padrão: `localhost`). |
| `JWT_SECRET` | Sim | Chave secreta usada para assinar e validar tokens JWT de autenticação. |
| `GEMINI_API_KEY` | Sim | Chave de autenticação da API Google Gemini. |
| `PLANTNET_API_KEY` | Sim | Chave de autenticação da API Pl@ntNet. |
| `EMAIL_HOST` | Sim | Endereço do servidor SMTP de envio de e-mails. |
| `EMAIL_PORT` | Sim | Porta do servidor SMTP (ex: `587` para TLS). |
| `EMAIL_USER` | Sim | Usuário/E-mail para autenticação no servidor SMTP. |
| `EMAIL_PASS` | Sim | Senha ou Senha de App para autenticação SMTP. |
| `EMAIL_FROM` | Sim | Endereço de e-mail e nome que aparecerão no remetente. |

---

## 📁 Estrutura do Projeto

```text
plant-ai-backend/
├── prisma/                    # Esquemas, migrações e seed do Prisma ORM
│   ├── migrations/            # Histórico de migrações SQL
│   ├── schema.prisma          # Schema do banco de dados relacional
│   └── seed.ts                # Script de povoamento inicial do banco
├── public/                    # Arquivos estáticos (imagens, avatares, logos)
├── src/
│   ├── app/
│   │   ├── collections/       # Schemas do MongoDB / Mongoose
│   │   ├── controllers/       # Controladores das rotas HTTP
│   │   ├── middlewares/       # Middlewares (autenticação JWT, validação de tokens)
│   │   ├── repositories/      # Camada de acesso a dados (Prisma/Mongo)
│   │   ├── routes/            # Definição das rotas da API
│   │   ├── services/          # Regras de negócio da aplicação
│   │   └── validations/       # Validações de entrada de dados
│   ├── databases/             # Conexões com os bancos (Prisma e Mongoose)
│   ├── infra/                 # Serviços externos (Gemini, Pl@ntNet, Nodemailer)
│   │   ├── email/             # Configuração e envio de e-mails
│   │   ├── gemini/            # Integração com a IA Google Gemini
│   │   └── plantnet/          # Integração com a API Pl@ntNet
│   ├── app.js                 # Configuração do Express e Middlewares globais
│   └── server.js              # Inicialização do servidor HTTP
├── .env.example               # Modelo de variáveis de ambiente
├── package.json               # Dependências e scripts do projeto
└── README.md                  # Documentação do projeto
```

---

## 🧰 Tecnologias Utilizadas

* **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
* **Framework Web:** [Express.js](https://expressjs.com/)
* **ORM Relacional:** [Prisma](https://www.prisma.io/) com adaptador MariaDB/MySQL
* **ODM NoSQL:** [Mongoose](https://mongoosejs.com/)
* **Autenticação:** [JSON Web Token (JWT)](https://jwt.io/) e [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* **Inteligência Artificial:** [@google/genai](https://www.npmjs.com/package/@google/genai) & [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
* **Uploads de Arquivos:** [Multer](https://www.npmjs.com/package/multer)
* **Envio de E-mails:** [Nodemailer](https://nodemailer.com/)

---

## 📄 Licença

Este projeto está sob a licença [ISC](LICENSE).
