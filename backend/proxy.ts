import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'visit_vagad_secret_key_2024';
const FRONTEND_URL = 'http://localhost:3000';

const corsHeaders = {
  'Access-Control-Allow-Origin': FRONTEND_URL,
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // 1. Define routes that NEED authentication
  const protectedRoutes = ['/api/admin', '/api/profile', '/api/bookings', '/api/orders'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Please login to access this resource' },
        { status: 401, headers: corsHeaders }
      );
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jose.jwtVerify(token, secret);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Session expired. Please login again.' },
        { status: 401, headers: corsHeaders }
      );
    }
  }

  const response = NextResponse.next();
  
  // Add CORS headers to the successful response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
