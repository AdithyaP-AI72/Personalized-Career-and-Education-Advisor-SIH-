'use client';

import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

// The messages our AI will "think"
const aiSteps = [
    "Initializing Genetic Algorithm...",
    "Analyzing 15,000+ Scheduling Constraints...",
    "Creating Initial Population (Generation 1)...",
    "Evaluating Fitness of Timetable Solutions...",
    "Evolving Population (Generation 250)...",
    "Optimizing for Student & Faculty Gaps...",
    "Pruning Low-Fitness Solutions...",
    "Converging on Optimal Schedule...",
    "Finalizing Timetable...",
];

export const LoadingScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // This will cycle through the AI steps every 600 milliseconds
        const interval = setInterval(() => {
            setCurrentStep(prevStep => {
                if (prevStep < aiSteps.length - 1) {
                    return prevStep + 1;
                }
                return prevStep; // Stay on the last step
            });
        }, 600);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <div className={styles.animation}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <h2 className={styles.title}>Timelyantra AI is at Work</h2>
                <p className={styles.statusText}>{aiSteps[currentStep]}</p>
            </div>
        </div>
    );
};