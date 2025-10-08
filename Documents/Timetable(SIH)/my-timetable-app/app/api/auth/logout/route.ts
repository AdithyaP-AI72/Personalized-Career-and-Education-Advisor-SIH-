import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({ message: 'Logout successful.' }, { status: 200 });

        // Set the cookie with a past expiry date to effectively delete it
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0), // Set to a past date
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}