import mongoose from 'mongoose';
import { IProduct } from '@/types';

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  artisan_name: { type: String, required: true },
  artisan_verified: { type: Boolean, default: false },
  description: { type: String },
  tags: [{ type: String }],
  images: [{ type: String }],
  district: { type: String, required: true },
  click_collect: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
