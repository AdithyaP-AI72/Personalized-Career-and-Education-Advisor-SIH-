import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    // If trying to access protected routes without a token, redirect to login
    if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/timetable'))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If trying to access auth pages with a token, redirect to dashboard
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*', '/timetable/:path*', '/login', '/signup'],
};