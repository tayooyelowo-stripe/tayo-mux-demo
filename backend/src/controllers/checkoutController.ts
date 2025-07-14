import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';
import { Product } from '../models/product';

const stripe = require('stripe')(config.stripeSecretKey);

interface LineItem extends Product {
  quantity?: number;
}

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawLineItems = req.body ? req.body : [];
    const updatedLineItems = rawLineItems.map((lineItem: LineItem) => {
      return {
        price: lineItem.priceId,
        quantity: lineItem.hasOwnProperty('quantity') ? lineItem.quantity : 1,
      }
    });

    const session = await stripe.checkout.sessions.create({
      line_items: updatedLineItems,
      mode: 'payment',
      success_url: `${config.webDomain}?success=true`,
      cancel_url: `${config.webDomain}?canceled=true`,
      metadata: {
        created_at: new Date().toISOString()
      }
    });

    res.status(201).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};