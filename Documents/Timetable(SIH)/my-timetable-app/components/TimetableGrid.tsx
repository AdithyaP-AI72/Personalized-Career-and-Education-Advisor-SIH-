'use client';
import React, { useState, useCallback } from 'react';
import { TimetableResult, TimetableEntry, TimetableGenerationOptions } from '@/types';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { Toast } from './Toast';
import styles from './TimetableGrid.module.css';

interface TimetableGridProps {
    result: TimetableResult | null;
    options: TimetableGenerationOptions;
    onUpdateEntry: (updatedEntry: TimetableEntry, index: number) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({ result, options, onUpdateEntry }) => {
    const { days, slots } = options;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [modalCourse, setModalCourse] = useState('');
    const [modalRoom, setModalRoom] = useState('');
    const [modalFaculty, setModalFaculty] = useState('');

    const openEditModal = useCallback((entry: TimetableEntry, index: number) => {
        setEditingEntry(entry);
        setEditingIndex(index);
        setModalCourse(entry.course);
        setModalRoom(entry.room);
        setModalFaculty(entry.faculty);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingEntry(null);
        setEditingIndex(-1);
    }, []);

    const handleModalSave = useCallback(() => {
        if (editingEntry && editingIndex !== -1) {
            const updatedEntry: TimetableEntry = { ...editingEntry, course: modalCourse, room: modalRoom, faculty: modalFaculty };
            onUpdateEntry(updatedEntry, editingIndex);
            setToastMessage('Timetable entry updated!');
            closeModal();
        }
    }, [editingEntry, editingIndex, modalCourse, modalRoom, modalFaculty, onUpdateEntry, closeModal]);

    if (!result || !result.timetable || result.timetable.length === 0) {
        return <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--muted)' }}>No timetable generated yet. Please generate one from the dashboard.</div>;
    }

    const gridColumns = `auto repeat(${days.length}, 1fr)`;

    return (
        <div className={styles.gridContainer}>
            {/* Added 'tt-grid' class for the print stylesheet to target */}
            <div className={`${styles.ttGrid} tt-grid`} style={{ gridTemplateColumns: gridColumns }}>
                <div></div>
                {days.map(day => (
                    // Added 'tt-cell' and 'header' classes for print stylesheet
                    <div key={day} className={`${styles.ttCell} ${styles.header} tt-cell header`}>
                        <strong>{day}</strong>
                    </div>
                ))}

                {slots.map((slot) => (
                    <React.Fragment key={slot}>
                        <div className={`${styles.ttCell} ${styles.header} tt-cell header`}>
                            <strong>{slot}</strong>
                        </div>
                        {days.map((day) => {
                            const [startTime] = slot.split('-');
                            const matchIndex = result.timetable.findIndex(entry => entry.day === day && entry.start === startTime);
                            const match = matchIndex !== -1 ? result.timetable[matchIndex] : null;
                            const hasConflicts = match?.conflicts && match.conflicts.length > 0;
                            // Added 'tt-cell' class for print
                            const cellClasses = `${styles.ttCell} ${hasConflicts ? styles.conflictHighlight : ''} tt-cell`;

                            return (
                                <div key={`${day}-${slot}`} className={cellClasses} onClick={() => match && openEditModal(match, matchIndex)}>
                                    {match ? (
                                        <>
                                            {/* Added simple classes for print stylesheet */}
                                            <div className={`${styles.courseName} courseName`}>{match.course}</div>
                                            <div className={`${styles.courseDetails} courseDetails`}>{match.room} &bull; {match.faculty}</div>
                                            {hasConflicts && (
                                                <div className={`${styles.conflictText} conflictText`}>
                                                    Conflicts: {match.conflicts.join(', ')}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className={`${styles.availableText} availableText`}>Available</div>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Assignment" actions={<><Button variant="default" onClick={closeModal}>Cancel</Button><Button variant="primary" onClick={handleModalSave}>Save Changes</Button></>}>
                <Input label="Course" value={modalCourse} onChange={(e) => setModalCourse(e.target.value)} />
                <Input label="Room" value={modalRoom} onChange={(e) => setModalRoom(e.target.value)} />
                <Input label="Faculty" value={modalFaculty} onChange={(e) => setModalFaculty(e.target.value)} />
            </Modal>
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </div>
    );
};