import { NextResponse } from 'next/server';
import { getAllDestinations, createDestination } from '@/controllers/destinationController';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinations = await getAllDestinations(searchParams);
    return NextResponse.json({ success: true, data: destinations, count: destinations.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const data = await request.json();
    const destination = await createDestination(data);
    return NextResponse.json({ success: true, data: destination }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
