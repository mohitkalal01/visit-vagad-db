import connectDB from '@/lib/mongodb';
import Stay from '@/models/Stay';
import { IStay } from '@/types';

export const getAllStays = async (searchParams: URLSearchParams) => {
  await connectDB();
  
  const district = searchParams.get('district');
  const type = searchParams.get('type');
  const rips_certified = searchParams.get('rips_certified');
  const max_price = searchParams.get('max_price');

  let query: any = {};
  if (district) query.district = district;
  if (type) query.type = type;
  if (rips_certified !== null) query.rips_certified = rips_certified === 'true';
  if (max_price) query.price_per_night = { $lte: Number(max_price) };

  return await Stay.find(query).sort({ createdAt: -1 });
};

export const getStayById = async (id: string) => {
  await connectDB();
  return await Stay.findById(id);
};

export const createStay = async (data: any) => {
  await connectDB();
  return await Stay.create(data);
};

export const updateStay = async (id: string, data: any) => {
  await connectDB();
  return await Stay.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteStay = async (id: string) => {
  await connectDB();
  return await Stay.findByIdAndDelete(id);
};
