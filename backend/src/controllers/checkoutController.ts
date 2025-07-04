import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

const stripe = require('stripe')(config.stripeSecretKey);

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // TODO: Provide the exact Price ID (for example, price_1234) of the product you want to sell
          // I'll eventually get this from the req
          price: 'price_1RgtqkGbaBCXbyosxI9PAVPe',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.webDomain}?success=true`,
      cancel_url: `${config.webDomain}?canceled=true`,
    });

    // res.redirect(303, session.url);
    res.status(201).json({url: session.url});
  } catch (error) {
    next(error);
  }
};