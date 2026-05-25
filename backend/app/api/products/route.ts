import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/controllers/productController';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const products = await getAllProducts(searchParams);
    return NextResponse.json({ success: true, data: products, count: products.length });
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
    const product = await createProduct(data);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
