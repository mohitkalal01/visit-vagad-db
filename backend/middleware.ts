import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'visit_vagad_secret_key_2024';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://visit-vagad.vercel.app',
];

if (process.env.FRONTEND_URL) {
  const normalizedEnvUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
  if (!allowedOrigins.includes(normalizedEnvUrl)) {
    allowedOrigins.push(normalizedEnvUrl);
  }
}

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  
  let allowedOrigin = '';
  
  if (allowedOrigins.includes(origin)) {
    allowedOrigin = origin;
  } else if (origin.endsWith('.vercel.app')) {
    // Allow any vercel deployment/preview
    allowedOrigin = origin;
  } else if (origin.startsWith('http://localhost:')) {
    // Allow localhost development on any port
    allowedOrigin = origin;
  } else {
    // Default fallback
    allowedOrigin = process.env.FRONTEND_URL?.replace(/\/$/, '') || 'https://visit-vagad.vercel.app';
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const corsHeaders = getCorsHeaders(request);
  const method = request.method;
  const origin = request.headers.get('origin') || '';

  console.log(`[CORS/Middleware] Request: ${method} ${pathname} | Origin: "${origin}"`);
  console.log(`[CORS/Middleware] Set Access-Control-Allow-Origin: "${corsHeaders['Access-Control-Allow-Origin']}"`);

  // Handle preflight OPTIONS requests
  if (method === 'OPTIONS') {
    console.log(`[CORS/Middleware OPTIONS] Returning 204 for preflight OPTIONS`);
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Define routes that require authentication
  const protectedRoutes = ['/api/admin', '/api/profile', '/api/bookings', '/api/orders'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      console.log(`[CORS/Middleware Auth] Access Denied: No auth_token cookie for route: ${pathname}`);
      return NextResponse.json(
        { success: false, error: 'Please login to access this resource' },
        { status: 401, headers: corsHeaders }
      );
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jose.jwtVerify(token, secret);
      console.log(`[CORS/Middleware Auth] Access Granted: auth_token verified for route: ${pathname}`);
    } catch (error) {
      console.log(`[CORS/Middleware Auth] Access Denied: Session expired/invalid token for route: ${pathname}`);
      return NextResponse.json(
        { success: false, error: 'Session expired. Please login again.' },
        { status: 401, headers: corsHeaders }
      );
    }
  }

  const response = NextResponse.next();
  
  // Apply dynamic CORS headers to the response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
