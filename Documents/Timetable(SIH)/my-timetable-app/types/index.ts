export interface Course {
    id: string;
    name: string;
    type: 'theory' | 'practical';
    credits: number;
    category: 'Major' | 'Minor' | 'SEC' | 'AEC' | 'VAC' | 'IKS' | 'Other';
}

export interface Student {
    id: string;
    name: string;
    courses: string[];
}

export interface Faculty {
    id: string;
    name: string;
    // CORRECTED: Changed back to 'eligible' for consistency with all data files
    eligible: string[];
    maxHoursPerWeek: number;
    availability: { day: string; start: string; end: string }[];
}

export interface Room {
    id: string;
    type: 'lecture' | 'lab';
    capacity: number;
}

export interface TimetableEntry {
    course: string;
    day: string;
    start: string;
    end: string;
    room: string;
    faculty: string;
    conflicts?: string[];
}

export interface TimetableResult {
    timetable: TimetableEntry[];
    summary: {
        assigned: number;
        unassigned: number;
        unassigned_courses: string[];
    };
}

export interface TimetableGenerationOptions {
    days: string[];
    slots: string[];
}

export interface AppData {
    courses: Course[];
    students: Student[];
    faculty: Faculty[];
    rooms: Room[];
}