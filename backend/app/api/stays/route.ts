import { NextResponse } from 'next/server';
import { getAllStays, createStay } from '@/controllers/stayController';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stays = await getAllStays(searchParams);
    return NextResponse.json({ success: true, data: stays, count: stays.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const stay = await createStay(data);
    return NextResponse.json({ success: true, data: stay }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
