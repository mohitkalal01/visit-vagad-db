import mongoose from 'mongoose';

export interface IOrder {
  user_id: string;
  product_id: string;
  product_name: string;
  artisan_name: string;
  price: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delivery_address?: string;
  createdAt?: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  artisan_name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  total_price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  delivery_address: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
