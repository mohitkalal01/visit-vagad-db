import { NextResponse } from 'next/server';
import { generateItinerary } from '@/controllers/itineraryController';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const itinerary = await generateItinerary(data);
    return NextResponse.json({ success: true, data: itinerary }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
