import 'dotenv/config'
import app from './app.js'
import { connectMongo } from './databases/mongoose.js';

const PORT = process.env.PORT
const Adress = process.env.ADRESS || 'localhost'


const StartServer = async () => {

  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${Adress}:${PORT}/api`)
  })

};

StartServer();
