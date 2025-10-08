import React from 'react';
import styles from './Button.module.css';

// The 'as' prop allows us to render the component as a different HTML element, like a 'label'
type ButtonProps = {
    as?: 'button' | 'label';
    variant?: 'default' | 'primary';
    isLoading?: boolean;
} & (
        React.ButtonHTMLAttributes<HTMLButtonElement> &
        React.LabelHTMLAttributes<HTMLLabelElement>
    );

export const Button: React.FC<ButtonProps> = ({
    as: Component = 'button',
    children,
    variant = 'default',
    isLoading = false,
    className,
    ...props
}) => {
    const variantClass = variant === 'primary' ? styles.buttonPrimary : styles.buttonDefault;

    const combinedClassName = [
        styles.button,
        variantClass,
        isLoading ? styles.loading : '',
        className
    ].join(' ');

    return (
        <Component
            className={combinedClassName}
            {...(Component === 'button' && { disabled: isLoading || (props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled })}
            {...props}
        >
            {isLoading ? <div className={styles.spinner} /> : children}
        </Component>
    );
};