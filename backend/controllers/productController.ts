import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export const getAllProducts = async (searchParams: URLSearchParams) => {
  await connectDB();
  
  const category = searchParams.get('category');
  const district = searchParams.get('district');
  const min_price = searchParams.get('min_price');
  const max_price = searchParams.get('max_price');

  let query: any = {};
  if (category) query.category = category;
  if (district) query.district = district;
  if (min_price || max_price) {
    query.price = {};
    if (min_price) query.price.$gte = Number(min_price);
    if (max_price) query.price.$lte = Number(max_price);
  }

  return await Product.find(query).sort({ createdAt: -1 });
};

export const getProductById = async (id: string) => {
  await connectDB();
  return await Product.findById(id);
};

export const createProduct = async (data: any) => {
  await connectDB();
  return await Product.create(data);
};

export const updateProduct = async (id: string, data: any) => {
  await connectDB();
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProduct = async (id: string) => {
  await connectDB();
  return await Product.findByIdAndDelete(id);
};
