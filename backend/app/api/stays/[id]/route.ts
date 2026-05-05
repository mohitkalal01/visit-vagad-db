import { NextResponse } from 'next/server';
import { getStayById, updateStay, deleteStay } from '@/controllers/stayController';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const stay = await getStayById(id);
    if (!stay) {
      return NextResponse.json({ success: false, error: 'Stay not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: stay });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const stay = await updateStay(id, data);
    if (!stay) {
      return NextResponse.json({ success: false, error: 'Stay not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: stay });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const stay = await deleteStay(id);
    if (!stay) {
      return NextResponse.json({ success: false, error: 'Stay not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
