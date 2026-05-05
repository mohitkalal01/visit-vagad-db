import { NextResponse } from 'next/server';
import { getReviews, createReview } from '@/controllers/reviewController';

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
    const body = await request.json();
    const review = await createReview(body);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
