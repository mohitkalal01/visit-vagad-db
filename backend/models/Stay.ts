import mongoose from 'mongoose';
import { IStay } from '@/types';

const StaySchema = new mongoose.Schema<IStay>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  distance_from_landmark: { type: String },
  host_name: { type: String, required: true },
  paryatan_mitra_level: { type: Number, min: 1, max: 5 },
  rips_certified: { type: Boolean, default: false },
  price_per_night: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  review_count: { type: Number, default: 0 },
  images: [{ type: String }],
  type: { type: String, required: true },
  amenities: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Stay || mongoose.model<IStay>('Stay', StaySchema);
