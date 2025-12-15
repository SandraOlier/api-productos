import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productsRouter from './routes/products.routes.js';
import authRouter from './routes/auth.routes.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/auth', authRouter);

// Middleware de rutas desconocidas
app.use(notFoundHandler);

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
