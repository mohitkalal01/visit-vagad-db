import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { ApiResponse, IBooking } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking } as ApiResponse<IBooking>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking } as ApiResponse<IBooking>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} } as ApiResponse<any>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}
