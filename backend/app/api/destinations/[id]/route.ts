import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { ApiResponse, IDestination } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const destination = await Destination.findById(params.id);
    if (!destination) {
      return NextResponse.json({ success: false, error: 'Destination not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: destination } as ApiResponse<IDestination>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    const destination = await Destination.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
    if (!destination) {
      return NextResponse.json({ success: false, error: 'Destination not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: destination } as ApiResponse<IDestination>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const destination = await Destination.findByIdAndDelete(params.id);
    if (!destination) {
      return NextResponse.json({ success: false, error: 'Destination not found' } as ApiResponse<null>, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} } as ApiResponse<any>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}
