import { NextResponse } from 'next/server';
import { getAllBookings, createBooking } from '@/controllers/bookingController';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookings = await getAllBookings(searchParams);
    return NextResponse.json({ success: true, data: bookings, count: bookings.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const data = await request.json();
    // Security: Ensure user_id matches the authenticated user
    data.user_id = user.id;
    data.user_name = user.name;

    const booking = await createBooking(data);
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
