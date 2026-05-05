import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Itinerary from '@/models/Itinerary';
import { ApiResponse, IItinerary } from '@/types';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ success: false, error: 'User ID is required' } as ApiResponse<null>, { status: 400 });
    }

    const itineraries = await Itinerary.find({ user_id }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: itineraries, count: itineraries.length } as ApiResponse<IItinerary[]>);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<null>, { status: 500 });
  }
}
