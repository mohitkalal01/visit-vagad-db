import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import User from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@visitvagad.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@visitvagad.com',
      password: hashedPassword,
      role: 'admin',
      is_verified: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@visitvagad.com');
    console.log('🔐 Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password immediately in production!');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
