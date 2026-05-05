import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { ApiResponse } from '@/types';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    let query: any = {};
    if (user_id) query.user_id = user_id;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: orders, count: orders.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Auto calculate total_price
    data.total_price = (data.price || 0) * (data.quantity || 1);
    data.status = 'pending';

    const order = await Order.create(data);
    
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
