import { NextResponse } from 'next/server';
import { getAdminTabData } from '@/controllers/adminController';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ tab: string }> }
) {
  try {
    const { tab } = await params;
    const data = await getAdminTabData(tab);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
