import { NextResponse } from 'next/server';
import { signup } from '@/controllers/authController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await signup(body);
    
    const response = NextResponse.json({ 
      success: true, 
      user: result.user,
      message: 'Signup successful' 
    }, { status: 201 });

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
    console.error('Signup Route Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Signup failed' 
    }, { status: 400 });
  }
}
