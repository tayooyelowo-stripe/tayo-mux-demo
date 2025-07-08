import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use(errorHandler);

export default app;
