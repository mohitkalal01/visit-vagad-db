import { NextResponse } from 'next/server';
import { login } from '@/controllers/authController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await login(body);
    
    const response = NextResponse.json({ 
      success: true, 
      user: result.user,
      message: 'Login successful' 
    });

    // Set cookie
    response.cookies.set('auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login Route Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Login failed' 
    }, { status: 401 });
  }
}
