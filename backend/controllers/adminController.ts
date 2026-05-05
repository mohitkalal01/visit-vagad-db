import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Stay from '@/models/Stay';

export const getAdminTabData = async (tab: string) => {
  await connectDB();
  
  switch (tab) {
    case 'bookings':
      return await Booking.find({}).sort({ createdAt: -1 });
    case 'orders':
      return await Order.find({}).sort({ createdAt: -1 });
    case 'stays':
      return await Stay.find({}).sort({ createdAt: -1 });
    case 'products':
      return await Product.find({}).sort({ createdAt: -1 });
    case 'users':
      return await User.find({}).select('-password').sort({ createdAt: -1 });
    default:
      throw new Error('Invalid tab');
  }
};

export const getAdminStats = async () => {
  await connectDB();
  
  const [userCount, bookingCount, orderCount, productCount, stayCount] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Stay.countDocuments()
  ]);

  return {
    counts: {
      users: userCount,
      bookings: bookingCount,
      orders: orderCount,
      products: productCount,
      stays: stayCount
    }
  };
};
