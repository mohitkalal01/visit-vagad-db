import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Stay from '@/models/Stay';
import Destination from '@/models/Destination';

export const globalSearch = async (query: string) => {
  await connectDB();
  
  if (!query || query.length < 2) {
    return { destinations: [], stays: [], products: [] };
  }

  const regex = new RegExp(query, 'i');

  const [destinations, stays, products] = await Promise.all([
    Destination.find({ $or: [{ name: regex }, { district: regex }, { tags: regex }] }).limit(5),
    Stay.find({ $or: [{ name: regex }, { location: regex }, { district: regex }] }).limit(5),
    Product.find({ $or: [{ name: regex }, { category: regex }, { artisan_name: regex }] }).limit(5)
  ]);

  return { destinations, stays, products };
};
