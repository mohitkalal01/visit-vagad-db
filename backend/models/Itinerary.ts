import mongoose from 'mongoose';
import { IItinerary } from '@/types';

const ItinerarySchema = new mongoose.Schema<IItinerary>({
  user_id: { type: String },
  title: { type: String, required: true },
  days: { type: Number, required: true, min: 1, max: 14 },
  trip_type: { 
    type: String, 
    enum: ['cultural', 'nature', 'spiritual', 'adventure', 'mixed'], 
    required: true 
  },
  interests: [{ type: String }],
  generated_plan: { type: String },
  destinations: [{ type: String }],
  is_public: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Itinerary || mongoose.model<IItinerary>('Itinerary', ItinerarySchema);
