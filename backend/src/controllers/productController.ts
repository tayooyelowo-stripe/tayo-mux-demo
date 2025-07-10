import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { config } from '../config/config';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PRODUCT_CURRENCY } from '../defaults';
import Stripe from 'stripe';

const stripe = require('stripe')(config.stripeSecretKey);

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price, active } = req.body;

        // Based on https://docs.stripe.com/api/products/create?lang=node
        const createdProduct = await stripe.products.create({
            name,
            active: Boolean(req.body.active),
            description,
            shippable: Boolean(req.body.shippable),
            images: req.body.hasOwnProperty('images') ? req.body.images : [],
            default_price_data: {
                currency: DEFAULT_PRODUCT_CURRENCY,
                unit_amount: price // cents;
            }
        });

        console.log({createdProduct});

        // https://docs.stripe.com/api/prices/object?lang=node
        const createdPrice = await stripe.prices.create({
            currency: DEFAULT_PRODUCT_CURRENCY,
            unit_amount: price,
            product: createdProduct.id,
        })

        console.log({createdPrice})

        const formattedProduct: Product = {
            description: createdProduct.description,
            id: createdProduct.id,
            image: createdProduct.images?.[0],
            name: createdProduct.name,
            price: createdPrice.unit_amount,
            priceId: createdPrice.id,
        };

        res.status(201).json(formattedProduct);
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || DEFAULT_PAGINATION_LIMIT;
        const startingAfter = req.query.startingAfter as string;

        console.log({startingAfter, limit});
        console.log(req.query);

        const productsParams: Stripe.ProductListParams = {
            limit,
            active: true,
        };

        if (startingAfter) {
            productsParams['starting_after'] = startingAfter;
        }

        // https://docs.stripe.com/api/products/list?lang=node
        const products = await stripe.products.list(productsParams);
        console.log({ products: products.data });

        const prices = await Promise.all(
            // https://docs.stripe.com/api/prices/retrieve?lang=node
            products.data.map((product: Stripe.Product) => stripe.prices.retrieve(product.default_price))
        )

        const formattedProducts: Product[] = products.data.map((product: Stripe.Product, index: number) => {
            const price = prices[index];

            return {
                description: product.description,
                id: product.id,
                image: product.images?.[0],
                name: product.name,
                price: price.unit_amount,
                priceId: price.id,
            }
        });

        res.json({
            products: formattedProducts,
            hasMore: products.has_more,
            lastProductId: formattedProducts.length === 0 ? undefined : formattedProducts[formattedProducts.length - 1],
        });
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const product = await stripe.products.retrieve(id);
        const price = await stripe.prices.retrieve(product.default_price);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const formattedProduct = {
            description: product.description,
            id: product.id,
            image: product.images?.[0],
            name: product.name,
            price: price.unit_amount,
            priceId: price.id,
        };

        res.json(formattedProduct);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const deletedProduct = await stripe.products.del(id);
        res.status(204).json(deletedProduct);
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