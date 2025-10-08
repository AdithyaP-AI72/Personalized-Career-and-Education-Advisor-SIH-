import { AppData, TimetableResult, TimetableEntry, TimetableGenerationOptions, Course, Faculty, Room, Student } from '@/types';

const calculateStudentCourseConflicts = (
    students: Student[],
    courses: Course[]
): Map<string, Set<string>> => {
    const courseToStudents = new Map<string, Set<string>>();
    students.forEach(s => {
        s.courses.forEach((cId: string) => {
            if (!courseToStudents.has(cId)) courseToStudents.set(cId, new Set());
            courseToStudents.get(cId)?.add(s.id);
        });
    });

    const conflictGraph = new Map<string, Set<string>>();
    courses.forEach(c => conflictGraph.set(c.id, new Set()));

    for (let i = 0; i < courses.length; i++) {
        for (let j = i + 1; j < courses.length; j++) {
            const c1_id = courses[i].id;
            const c2_id = courses[j].id;
            const students1 = courseToStudents.get(c1_id) || new Set<string>();
            const students2 = courseToStudents.get(c2_id) || new Set<string>();
            const hasConflict = [...students1].some(s_id => students2.has(s_id));
            if (hasConflict) {
                conflictGraph.get(c1_id)?.add(c2_id);
                conflictGraph.get(c2_id)?.add(c1_id);
            }
        }
    }
    return conflictGraph;
};

export function generateTimetable(data: AppData, options: TimetableGenerationOptions): TimetableResult {
    const { days, slots } = options;
    const timeslots = days.flatMap(d => slots.map(s => ({ day: d, slot: s })));

    const studentCourseConflictGraph = calculateStudentCourseConflicts(data.students, data.courses);

    const sortedCourses = [...data.courses].sort((a, b) => {
        const degreeA = studentCourseConflictGraph.get(a.id)?.size || 0;
        const degreeB = studentCourseConflictGraph.get(b.id)?.size || 0;
        return degreeB - degreeA;
    });

    const assignments = new Map<string, { timeslot_index: number; faculty: string; room: string }>();
    const timeslotUsage = new Array(timeslots.length).fill(null).map(() => ({
        faculty: new Set<string>(),
        rooms: new Set<string>(),
    }));

    const unassignedCourses: string[] = [];

    sortedCourses.forEach(course => {
        if (assignments.has(course.id)) return;

        const conflictingCourses = studentCourseConflictGraph.get(course.id) || new Set();
        const occupiedTimeslotIndices = new Set<number>();
        conflictingCourses.forEach(neighborId => {
            if (assignments.has(neighborId)) {
                occupiedTimeslotIndices.add(assignments.get(neighborId)!.timeslot_index);
            }
        });

        const possibleSlots = [];

        for (let i = 0; i < timeslots.length; i++) {
            if (occupiedTimeslotIndices.has(i)) continue;

            const requiredRoomType = course.type === 'practical' ? 'lab' : 'lecture';

            // CORRECTED: Changed f.expertise back to f.eligible to match the data
            const eligibleFaculty = data.faculty.find(f =>
                f.eligible.includes(course.id) && !timeslotUsage[i].faculty.has(f.id)
            );

            const availableRoom = data.rooms.find(r =>
                r.type === requiredRoomType && !timeslotUsage[i].rooms.has(r.id)
            );

            if (eligibleFaculty && availableRoom) {
                possibleSlots.push({
                    timeslot_index: i,
                    faculty: eligibleFaculty.id,
                    room: availableRoom.id,
                });
            }
        }

        if (possibleSlots.length > 0) {
            const chosenSlot = possibleSlots[Math.floor(Math.random() * possibleSlots.length)];
            assignments.set(course.id, chosenSlot);
            timeslotUsage[chosenSlot.timeslot_index].faculty.add(chosenSlot.faculty);
            timeslotUsage[chosenSlot.timeslot_index].rooms.add(chosenSlot.room);
        } else {
            unassignedCourses.push(course.id);
        }
    });

    const timetable: TimetableEntry[] = Array.from(assignments.entries()).map(([courseId, details]) => {
        const timeslot = timeslots[details.timeslot_index];
        const [start, end] = timeslot.slot.split('-');
        return { course: courseId, day: timeslot.day, start, end, room: details.room, faculty: details.faculty };
    });

    return {
        timetable,
        summary: {
            assigned: timetable.length,
            unassigned: unassignedCourses.length,
            unassigned_courses: unassignedCourses,
        }
    };
}