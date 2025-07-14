import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import webhookRoutes from './routes/webhookRoutes';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(cors());

// Webhook routes need raw body parsing, so they must come before express.json()
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use(errorHandler);

export default app;
