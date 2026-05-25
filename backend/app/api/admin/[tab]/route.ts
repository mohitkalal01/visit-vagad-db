import { NextResponse } from 'next/server';
import { getAdminTabData } from '@/controllers/adminController';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ tab: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { tab } = await params;
    const data = await getAdminTabData(tab);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
