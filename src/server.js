import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT
const Adress = process.env.ADRESS || 'localhost'

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${Adress}:${PORT}/api`)
})
