import connectDB from '@/lib/mongodb';
import Destination from '@/models/Destination';

export const getAllDestinations = async (searchParams: URLSearchParams) => {
  await connectDB();
  const district = searchParams.get('district');
  const type = searchParams.get('type');
  
  let query: any = {};
  if (district) query.district = district;
  if (type) query.type = type;
  
  return await Destination.find(query).sort({ name: 1 });
};

export const getDestinationById = async (id: string) => {
  await connectDB();
  return await Destination.findById(id);
};

export const createDestination = async (data: any) => {
  await connectDB();
  return await Destination.create(data);
};
