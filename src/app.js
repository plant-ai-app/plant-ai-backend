import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import {Routes} from './app/routes/index.routes.js';
import testarConexao from '../teste-gemini.js';   


const app = express();
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // credentials: true
}));

Routes(app);


// const main = async () => {
//     const data = await testarConexao();
//     console.log(data);
// }

// main();

    
export default app;
