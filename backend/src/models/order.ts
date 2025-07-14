import mongoose, { Schema, Document } from 'mongoose';

// It seems like there's duplication, but it's necessary to have the interface and the schema separate.
// This is because we're using Mongoose with TypeScript, so we need to define both :crying_face: 

export interface OrderItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  priceId: string;
}

export interface IOrder extends Document {
  stripeSessionId: string;
  stripePaymentIntentId: string;
  customerEmail: string;
  customerName?: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  priceId: { type: String, required: true }
});

const OrderSchema = new Schema({
  stripeSessionId: { type: String, required: true, unique: true },
  stripePaymentIntentId: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerName: { type: String },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'usd' },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema); 