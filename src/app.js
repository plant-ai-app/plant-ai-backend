import express from 'express';
import cors from 'cors';
import {Routes} from './app/routes/index.routes.js';

const app = express();
Routes(app);

app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));


export default app;
