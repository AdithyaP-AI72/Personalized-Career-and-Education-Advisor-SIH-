import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className, ...props }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-5 h-5 border-3',
        lg: 'w-8 h-8 border-4',
    };

    return (
        <div
            className={twMerge(
                sizeClasses[size],
                'border-accent/35 border-t-cyan-400 rounded-full animate-spin',
                className
            )}
            {...props}
        />
    );
};