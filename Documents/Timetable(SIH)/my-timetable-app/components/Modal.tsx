'use client';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import styles from './Modal.module.css'; // Import styles

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, actions }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className={styles.overlay}
            onClick={(e) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                    onClose();
                }
            }}
        >
            <div ref={modalRef} className={styles.modal}>
                <header className={styles.header}>
                    <strong className={styles.title}>{title}</strong>
                    <Button onClick={onClose} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>✕</Button>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
                {actions && (
                    <div className={styles.actions}>
                        {actions}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
