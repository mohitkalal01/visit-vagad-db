import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview {
  user_id: string;
  user_name: string;
  reference_id: string;
  reference_type: 'stay' | 'product' | 'experience' | 'destination';
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new Schema<IReviewDocument>({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  reference_id: { type: String, required: true },
  reference_type: { type: String, enum: ['stay', 'product', 'experience', 'destination'], required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const Review: Model<IReviewDocument> = mongoose.models.Review || mongoose.model<IReviewDocument>('Review', ReviewSchema);

export default Review;
