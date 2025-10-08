import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { AppData } from '@/types';

interface UserPayload {
    userId: string;
}

// Helper function to get the current user's ID from the token
const getUserId = (): string | null => {
    const token = cookies().get('token')?.value;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

// --- API to GET the user's data ---
export async function GET() {
    const userId = getUserId();
    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user.timetableData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// --- API to SAVE the user's data ---
export async function POST(req: Request) {
    const userId = getUserId();
    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const dataToSave: AppData = await req.json();
        await dbConnect();

        await User.findByIdAndUpdate(userId, {
            $set: { timetableData: dataToSave }
        });

        return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}