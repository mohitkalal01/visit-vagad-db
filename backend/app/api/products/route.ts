import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/controllers/productController';

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
    const data = await request.json();
    const product = await createProduct(data);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
