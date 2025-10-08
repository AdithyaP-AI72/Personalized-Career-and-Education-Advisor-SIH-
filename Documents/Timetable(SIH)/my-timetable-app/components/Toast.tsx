'use client';
import React, { useEffect } from 'react';
import styles from './Toast.module.css'; // Import styles

interface ToastProps {
    message: string | null;
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 2500 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={styles.toast}>
            {message}
        </div>
    );
};
