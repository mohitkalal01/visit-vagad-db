import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'visit_vagad_secret_key_2024';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define routes that NEED authentication
    const protectedRoutes = ['/api/admin', '/api/profile', '/api/bookings', '/api/orders'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        // 2. Get token from cookies
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Please login to access this resource' },
                { status: 401 }
            );
        }

        try {
            // 3. Verify JWT using 'jose' (works in Edge Runtime)
            const secret = new TextEncoder().encode(JWT_SECRET);
            await jose.jwtVerify(token, secret);
            
            // Authorized - continue to the route
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'Session expired. Please login again.' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

// 4. Configure which paths this middleware should run on
export const config = {
    matcher: [
        '/api/admin/:path*',
        '/api/profile/:path*',
        '/api/bookings/:path*',
        '/api/orders/:path*',
    ],
};
