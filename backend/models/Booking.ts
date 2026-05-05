import mongoose from 'mongoose';
import { IBooking } from '@/types';

const BookingSchema = new mongoose.Schema<IBooking>({
  user_id: { type: String, required: true },
  stay_id: { type: String, required: true },
  stay_name: { type: String, required: true },
  host_name: { type: String, required: true },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  guests: { type: Number, required: true },
  total_nights: { type: Number, required: true },
  price_per_night: { type: Number, required: true },
  total_price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    required: true 
  },
  special_requests: { type: String },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
