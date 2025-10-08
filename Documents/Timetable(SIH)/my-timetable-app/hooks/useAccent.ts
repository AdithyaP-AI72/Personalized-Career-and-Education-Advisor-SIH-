import { useState, useEffect } from 'react';

export const useAccent = () => {
    const [accent, setAccentState] = useState<string>('#6366f1'); // Default accent color

    useEffect(() => {
        const savedAccent = localStorage.getItem('accent');
        if (savedAccent) {
            setAccentState(savedAccent);
            document.documentElement.style.setProperty('--accent', savedAccent);
        }
    }, []);

    const setAccent = (newAccent: string) => {
        setAccentState(newAccent);
        document.documentElement.style.setProperty('--accent', newAccent);
        localStorage.setItem('accent', newAccent);
    };

    return [accent, setAccent] as const;
};