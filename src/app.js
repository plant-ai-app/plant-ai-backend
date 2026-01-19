import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));


app.get('/', (req, res) => {
    res.json({"teste": "API is running"});
});

export default app;