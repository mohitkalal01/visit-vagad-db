import mongoose from 'mongoose';
import { IDestination } from '@/types';

const DestinationSchema = new mongoose.Schema<IDestination>({
  name: { type: String, required: true },
  district: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  latitude: { type: Number },
  longitude: { type: Number },
  entry_fee: { type: Number, default: 0 },
  best_time_to_visit: { type: String },
  tags: [{ type: String }],
  highlights: [{ type: String }],
  timing: { type: String },
  icon: { type: String },
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
