'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { TimetableGrid } from '@/components/TimetableGrid';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
// NOTE: We no longer import 'store' from '@/lib/store'
import { TimetableResult, TimetableEntry, TimetableGenerationOptions } from '@/types';
import { TableCellsIcon, PrinterIcon } from '@heroicons/react/24/outline';
import styles from './page.module.css';

export default function TimetablePage() {
    const [timetableResult, setTimetableResult] = useState<TimetableResult | null>(null);
    const [timetableOptions, setTimetableOptions] = useState<TimetableGenerationOptions>({ days: [], slots: [] });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        // CORRECTED: Read from sessionStorage instead of localStorage
        const savedResultItem = sessionStorage.getItem('lastTimetableResult');
        const savedOptionsItem = sessionStorage.getItem('lastTimetableOptions');

        if (savedResultItem && savedOptionsItem) {
            try {
                const savedResult = JSON.parse(savedResultItem);
                const savedOptions = JSON.parse(savedOptionsItem);
                setTimetableResult(savedResult);
                setTimetableOptions(savedOptions);
            } catch (error) {
                console.error("Failed to parse timetable data from session storage", error);
            }
        }
    }, []);

    const handleUpdateEntry = useCallback((updatedEntry: TimetableEntry, index: number) => {
        if (timetableResult) {
            const updatedTimetable = [...timetableResult.timetable];
            updatedTimetable[index] = updatedEntry;
            const newResult = { ...timetableResult, timetable: updatedTimetable };
            setTimetableResult(newResult);
            // CORRECTED: Save updates to sessionStorage
            sessionStorage.setItem('lastTimetableResult', JSON.stringify(newResult));
        }
    }, [timetableResult]);

    const handleExportPDF = () => {
        window.print();
        setToastMessage('Preparing print preview...');
    };

    return (
        <section>
            <header className={`${styles.header} no-print`}>
                <h2 className={styles.title}>
                    <TableCellsIcon className={styles.icon} /> Generated Timetable
                </h2>
                <Button onClick={handleExportPDF}>
                    <PrinterIcon className={styles.buttonIcon} />Export PDF
                </Button>
            </header>
            <div>
                <TimetableGrid
                    result={timetableResult}
                    options={timetableOptions}
                    onUpdateEntry={handleUpdateEntry}
                />
            </div>
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </section>
    );
}