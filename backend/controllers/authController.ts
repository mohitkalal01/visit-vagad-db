import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'visit_vagad_secret_key_2024';

export const signup = async (data: any) => {
  await connectDB();
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  return { id: user._id, name: user.name, email: user.email };
};

export const login = async (data: any) => {
  await connectDB();
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return { 
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    token 
  };
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', '', { maxAge: 0 });
};

export const getCurrentUser = async () => {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return null;
    return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
  } catch (err) {
    return null;
  }
};
