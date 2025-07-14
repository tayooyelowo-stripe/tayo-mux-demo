import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';
import { Order } from '../models/order';

const stripe = require('stripe')(config.stripeSecretKey);

export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = config.stripeWebhookSigningSecret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.log('Webhook signature verification failed.', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    next(error);
  }
};

const handleCheckoutSessionCompleted = async (session: any) => {
  try {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items.data.price.product']
    });

    const order = new Order({
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      customerEmail: session.customer_details.email,
      customerName: session.customer_details.name,
      items: sessionWithLineItems.line_items.data.map((item: any) => ({
        productId: item.price.product.id,
        name: item.price.product.name,
        description: item.price.product.description || '',
        quantity: item.quantity,
        price: item.price.unit_amount,
        priceId: item.price.id
      })),
      totalAmount: session.amount_total,
      currency: session.currency,
      status: 'pending'
    });

    await order.save();
    console.log('Order created successfully:', order._id);
  } catch (error) {
    console.error('Error creating order from checkout session:', error);
    throw error;
  }
};

const handlePaymentIntentSucceeded = async (paymentIntent: any) => {
  try {
    const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
    
    if (order) {
      order.status = 'paid';
      await order.save();
      console.log('Order status updated to paid:', order._id);
    } else {
      console.log('Order not found for payment intent:', paymentIntent.id);
    }
    
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const handlePaymentIntentFailed = async (paymentIntent: any) => {
  try {
    const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
    
    if (order) {
      order.status = 'failed';
      await order.save();
      console.log('Order status updated to failed:', order._id);
    } else {
      console.log('Order not found for payment intent:', paymentIntent.id);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}; 