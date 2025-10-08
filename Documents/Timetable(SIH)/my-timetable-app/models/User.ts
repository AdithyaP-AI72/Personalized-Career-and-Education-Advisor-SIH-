import mongoose, { Schema, Document } from 'mongoose';
import { AppData } from '@/types'; // Import our AppData type

// Define the structure for the embedded timetable data
const AppDataSchema: Schema = new Schema({
    courses: { type: Array, default: [] },
    students: { type: Array, default: [] },
    faculty: { type: Array, default: [] },
    rooms: { type: Array, default: [] },
}, { _id: false }); // _id: false prevents a separate ID for this sub-document

export interface IUser extends Document {
    email: string;
    password?: string;
    createdAt: Date;
    // NEW: Each user will have their own set of timetable data
    timetableData: AppData;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // NEW: Add the timetable data to the user schema
    timetableData: {
        type: AppDataSchema,
        default: () => ({ courses: [], students: [], faculty: [], rooms: [] })
    }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);