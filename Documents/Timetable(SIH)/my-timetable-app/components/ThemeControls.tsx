'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useAccent } from '@/hooks/useAccent';
import { Button } from './Button';
import styles from './Navbar.module.css'; // We can reuse the navbar styles

export const ThemeControls = () => {
    const [theme, setTheme] = useTheme();
    const [accent, setAccent] = useAccent();

    return (
        <div className={styles.themeControls}>
            <Button onClick={() => setTheme('light')} className={theme === 'light' ? styles.activeTheme : ''}>Light</Button>
            <Button onClick={() => setTheme('dark')} className={theme === 'dark' ? styles.activeTheme : ''}>Dark</Button>
            <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                title="Accent Color"
                className={styles.accentPicker}
            />
        </div>
    );
};