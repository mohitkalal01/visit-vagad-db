import { NextResponse } from 'next/server';
import { generateItinerary } from '@/controllers/itineraryController';
import { getCurrentUser } from '@/controllers/authController';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const data = await request.json();
    data.user_id = user.id;

    const itinerary = await generateItinerary(data);
    return NextResponse.json({ success: true, data: itinerary }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
