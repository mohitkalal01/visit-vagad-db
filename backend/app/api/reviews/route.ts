import { NextResponse } from 'next/server';
import { getReviews, createReview } from '@/controllers/reviewController';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reviews = await getReviews(searchParams);
    return NextResponse.json({ success: true, data: reviews });
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

    const body = await request.json();
    
    // Security: Ensure user_id matches session
    body.user_id = user.id;
    body.user_name = user.name;

    const review = await createReview(body);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
