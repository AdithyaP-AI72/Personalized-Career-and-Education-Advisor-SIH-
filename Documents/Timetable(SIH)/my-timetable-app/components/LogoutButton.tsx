'use client';

import { useRouter } from 'next/navigation';
import { Button } from './Button';

export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // Call the logout API route to clear the session
        await fetch('/api/auth/logout', { method: 'POST' });

        // CORRECTED: Redirect to the main landing page, NOT the login page
        router.push('/');
        router.refresh();
    };

    return (
        <Button variant="default" onClick={handleLogout}>
            Logout
        </Button>
    );
};