'use client';
import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import styles from './Input.module.css';

// Define the props for our component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, type, className, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine the actual type of the input field
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <div className={styles.inputContainer}>
                <input
                    id={id}
                    type={inputType}
                    className={`${styles.input} ${className || ''}`}
                    {...props}
                />
                {/* Only show the toggle button if the input type is 'password' */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleButton}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className={styles.icon} />
                        ) : (
                            <EyeIcon className={styles.icon} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

// The Textarea component remains unchanged
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, className, ...props }) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <textarea
                id={id}
                className={`${styles.textarea} ${className || ''}`}
                {...props}
            />
        </div>
    );
};