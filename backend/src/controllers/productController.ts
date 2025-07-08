import { Request, Response, NextFunction } from 'express';
import { Product, products } from '../models/product';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, img, title, description, price } = req.body;
        const newProduct: Product = { id, img, title, description, price };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

const getProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getProductById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const product = products.find((i) => i.id === id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedProductIdx = products.findIndex((i) => i.id === id);
        if (deletedProductIdx === -1) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const deletedProduct = products.splice(deletedProductIdx, 1)[0];
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
}

export {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
}