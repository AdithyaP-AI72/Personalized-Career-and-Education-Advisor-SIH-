import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await dbConnect(); // Connect to the database

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }

        // Check if user already exists using the Mongoose model
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the Mongoose model
        await User.create({
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });

    } catch (error: any) {
        console.error('Signup error:', error);
        // Mongoose validation errors can be caught here
        if (error.name === 'ValidationError') {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}