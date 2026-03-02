import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {Routes} from './app/routes/index.routes.js';

const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // credentials: true
}));

Routes(app);
    
export default app;
