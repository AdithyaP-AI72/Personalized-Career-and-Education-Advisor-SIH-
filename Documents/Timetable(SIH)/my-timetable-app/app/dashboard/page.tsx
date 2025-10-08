'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Toast } from '@/components/Toast';
import { DataEditor } from '@/components/DataEditor';
import { Modal } from '@/components/Modal';
import { CourseForm } from '@/components/CourseForm';
import { LoadingScreen } from '@/components/LoadingScreen';
import { generateTimetable } from '@/lib/timetable-generator';
import { AppData, TimetableResult, TimetableGenerationOptions, Course } from '@/types';
import { CalendarIcon, Cog6ToothIcon, DocumentTextIcon, FolderOpenIcon, PlusIcon, CloudArrowUpIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import styles from './page.module.css';

const DATA_KEYS: (keyof AppData)[] = ['courses', 'students', 'faculty', 'rooms'];

// This is a default empty state for a new user
const emptyData: AppData = {
    courses: [],
    students: [],
    faculty: [],
    rooms: []
};

export default function DashboardPage() {
    const router = useRouter();
    const [appData, setAppData] = useState<AppData | null>(null); // Start as null until loaded from DB
    const [daysInput, setDaysInput] = useState('Mon,Tue,Wed,Thu,Fri');
    const [slotsInput, setSlotsInput] = useState('09:00-10:00,10:00-11:00,11:00-12:00,14:00-15:00,15:00-16:00');
    const [isGenerating, setIsGenerating] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isShowingAiLoader, setIsShowingAiLoader] = useState(false);

    const showToast = useCallback((message: string) => setToastMessage(message), []);

    // NEW: Function to fetch data from our secure API
    const fetchData = useCallback(async () => {
        try {
            const res = await fetch('/api/data');
            if (!res.ok) throw new Error('Failed to fetch user data');
            const data = await res.json();
            // If user has no data, start them with an empty slate
            if (!data || DATA_KEYS.every(key => !data[key] || data[key].length === 0)) {
                setAppData(emptyData);
            } else {
                setAppData(data);
            }
        } catch (error) {
            showToast('Could not load your data. Please try again.');
            console.error(error);
            setAppData(emptyData); // Fallback to empty state on error
        }
    }, [showToast]);

    // Load data from the database when the page first loads
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // NEW: Universal save function that sends data to the server
    const handleDataSave = useCallback(async (dataToSave: AppData) => {
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave),
            });
            if (!res.ok) throw new Error('Failed to save data');
            showToast('Data saved to your profile!');
        } catch (error) {
            showToast('Error saving data.');
            console.error(error);
        }
    }, [showToast]);

    // NEW: Helper to save just one part of the data (e.g., only courses)
    const handleSingleEntitySave = useCallback((entityType: keyof AppData, newData: any[]) => {
        if (!appData) return;
        const updatedAppData = { ...appData, [entityType]: newData };
        setAppData(updatedAppData);
        handleDataSave(updatedAppData);
    }, [appData, handleDataSave]);

    const handleSaveCourse = (newCourse: Course) => {
        if (!appData) return;
        const courseIndex = appData.courses.findIndex(c => c.id === newCourse.id);
        let updatedCourses;
        if (courseIndex > -1) {
            updatedCourses = [...appData.courses];
            updatedCourses[courseIndex] = newCourse;
            showToast('Course updated!');
        } else {
            updatedCourses = [...appData.courses, newCourse];
            showToast('New course added!');
        }
        handleSingleEntitySave('courses', updatedCourses);
        setIsCourseModalOpen(false);
    };

    const handleImportData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target?.result as string);
                if (DATA_KEYS.every(key => Array.isArray(importedData[key]))) {
                    setAppData(importedData);
                    handleDataSave(importedData); // Save the imported data to the user's profile
                    showToast('Data imported and saved successfully!');
                } else {
                    showToast('Import failed: JSON structure is missing required keys.');
                }
            } catch (error) {
                showToast('Import failed: Invalid JSON file.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }, [handleDataSave, showToast]);

    const handleGenerateTimetable = useCallback(() => {
        if (!appData) {
            showToast('Data is not loaded yet.');
            return;
        }
        setIsGenerating(true);
        setIsShowingAiLoader(true);
        setTimeout(() => {
            try {
                const parsedDays = daysInput.split(',').map(s => s.trim()).filter(Boolean);
                const parsedSlots = slotsInput.split(',').map(s => s.trim()).filter(Boolean);
                if (parsedDays.length === 0 || parsedSlots.length === 0) throw new Error('Please provide valid days and slots.');
                const options: TimetableGenerationOptions = { days: parsedDays, slots: parsedSlots };
                const result = generateTimetable(appData, options);

                sessionStorage.setItem('lastTimetableResult', JSON.stringify(result));
                sessionStorage.setItem('lastTimetableOptions', JSON.stringify(options));

                router.push('/timetable');
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
                showToast(`Generation failed: ${errorMessage}`);
                setIsGenerating(false);
                setIsShowingAiLoader(false);
            }
        }, 5000);
    }, [appData, daysInput, slotsInput, router, showToast]);

    // Show a full-screen loader until the user's data has been fetched from the database
    if (!appData) {
        return <LoadingScreen />;
    }

    return (
        <section>
            {isShowingAiLoader && <LoadingScreen />}
            <header className={styles.header}>
                <h2 className={styles.title}><Cog6ToothIcon className={styles.icon} /> System Dashboard</h2>
            </header>
            <div className={styles.grid}>
                <Card>
                    <h3 className={styles.cardTitle}><DocumentTextIcon className={styles.icon} /> Data Actions</h3>
                    <p className={styles.cardSubtitle}>Manage your timetable data.</p>
                    <div className={styles.buttonGroup}>
                        <Button as="label" htmlFor="import-file">
                            <FolderOpenIcon className={styles.buttonIcon} />Import JSON
                            <input type="file" id="import-file" accept=".json" className={styles.hiddenInput} onChange={handleImportData} />
                        </Button>
                        <Button onClick={() => { const dataStr = JSON.stringify(appData, null, 2); const blob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'timelyantra_data.json'; a.click(); URL.revokeObjectURL(url); }}>
                            <CloudArrowUpIcon className={styles.buttonIcon} />Export JSON
                        </Button>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button onClick={() => { if (window.confirm('Are you sure you want to reset all your data? This cannot be undone.')) { setAppData(emptyData); handleDataSave(emptyData); } }} className={styles.clearButton}>
                            <ArrowPathIcon className={styles.buttonIcon} />Reset All Data
                        </Button>
                    </div>
                </Card>
                <Card>
                    <h3 className={styles.cardTitle}><CalendarIcon className={styles.icon} /> Timetable Generation</h3>
                    <p className={styles.cardSubtitle}>Configure constraints and generate.</p>
                    <div className={styles.inputGroup}>
                        <Input label="Days (comma-separated)" value={daysInput} onChange={(e) => setDaysInput(e.target.value)} />
                        <Input label="Slots (e.g., HH:MM-HH:MM)" value={slotsInput} onChange={(e) => setSlotsInput(e.target.value)} />
                    </div>
                    <Button variant="primary" onClick={handleGenerateTimetable} isLoading={isGenerating}>
                        Generate Timetable
                    </Button>
                </Card>
                <Card className={styles.fullWidth}>
                    <div className={styles.dataHeader}>
                        <h3 className={styles.cardTitle}><DocumentTextIcon className={styles.icon} /> Edit Data Entities</h3>
                        <Button onClick={() => setIsCourseModalOpen(true)}>
                            <PlusIcon className={styles.buttonIcon} /> Add / Edit Course
                        </Button>
                    </div>
                    <p className={styles.cardSubtitle}>Directly edit the JSON data for Courses, Students, Faculty, and Rooms below.</p>
                    <div className={styles.dataEditorGrid}>
                        {DATA_KEYS.map(key => (
                            <DataEditor key={key} entityType={key} data={appData[key]} onSave={data => handleSingleEntitySave(key, data)} onError={showToast} />
                        ))}
                    </div>
                </Card>
            </div>
            <Modal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} title="Add or Edit Course">
                <CourseForm onSave={handleSaveCourse} onCancel={() => setIsCourseModalOpen(false)} />
            </Modal>
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </section>
    );
}