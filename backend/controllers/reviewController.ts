import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

export const getReviews = async (searchParams: URLSearchParams) => {
  await connectDB();
  const reference_id = searchParams.get('reference_id');
  const reference_type = searchParams.get('reference_type') || searchParams.get('type');
  
  let query: any = {};
  if (reference_id) query.reference_id = reference_id;
  if (reference_type) query.reference_type = reference_type;
  
  return await Review.find(query).sort({ createdAt: -1 });
};

export const createReview = async (body: any) => {
  await connectDB();
  const reference_type = body.reference_type || body.type;
  const { user_id, user_name, reference_id, rating, comment } = body;

  if (!user_id || !reference_id || !rating || !comment || !reference_type) {
    throw new Error('Missing required fields');
  }

  return await Review.create({
    user_id,
    user_name: user_name || 'Anonymous',
    reference_id,
    reference_type,
    rating: Number(rating),
    comment
  });
};
