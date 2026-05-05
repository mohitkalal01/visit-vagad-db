import mongoose from 'mongoose';
import { IUser } from '@/types';

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  avatar: { type: String },
  role: { 
    type: String, 
    enum: ['tourist', 'host', 'artisan', 'admin'], 
    required: true 
  },
  district: { type: String, enum: ['banswara', 'dungarpur'] },
  is_verified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
