import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: string;
    email: string;
}

// CORRECTED: The function is now async
export const useUser = async () => {
    // CORRECTED: We no longer need to call cookies() separately
    const token = cookies().get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};