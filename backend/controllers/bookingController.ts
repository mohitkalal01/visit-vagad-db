import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export const getAllBookings = async (searchParams: URLSearchParams) => {
  await connectDB();
  const user_id = searchParams.get('user_id');
  const status = searchParams.get('status');
  let query: any = {};
  if (user_id) query.user_id = user_id;
  if (status) query.status = status;
  return await Booking.find(query).sort({ createdAt: -1 });
};

export const createBooking = async (data: any) => {
  await connectDB();
  
  // Auto calculate total_nights and total_price
  if (data.check_in && data.check_out && data.price_per_night) {
    const checkInDate = new Date(data.check_in);
    const checkOutDate = new Date(data.check_out);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const totalNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    data.total_nights = totalNights > 0 ? totalNights : 1;
    data.total_price = data.total_nights * data.price_per_night;
  }

  return await Booking.create(data);
};

export const updateBookingStatus = async (id: string, status: string) => {
  await connectDB();
  return await Booking.findByIdAndUpdate(id, { status }, { new: true });
};
