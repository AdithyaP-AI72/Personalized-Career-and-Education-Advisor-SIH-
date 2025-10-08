import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Check user's system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme: Theme = prefersDark ? 'dark' : 'light';
            setThemeState(initialTheme);
            document.documentElement.setAttribute('data-theme', initialTheme);
            localStorage.setItem('theme', initialTheme);
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return [theme, setTheme] as const;
};