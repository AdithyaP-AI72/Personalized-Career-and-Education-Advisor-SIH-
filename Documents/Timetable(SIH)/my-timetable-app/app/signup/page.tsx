'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import styles from './page.module.css';

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // This parses the JSON response from our API
            const data = await res.json();

            // THE KEY LOGIC IS HERE:
            // A 409 status code makes `res.ok` false.
            if (!res.ok) {
                // This takes the message from the API ("User with this email already exists.")
                // and throws it as an error.
                throw new Error(data.message || 'Something went wrong');
            }

            // If the response was successful, this part runs...
            router.push('/dashboard');
            router.refresh();

        } catch (err: any) {
            // The error we threw is caught here...
            // ...and its message is used to update the 'error' state.
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create an Account</h1>
            <p className={styles.subtitle}>Start generating timetables with ease.</p>
            <Card>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* This line will now display the error message on the page! */}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder="••••••••"
                    />
                    <Button type="submit" variant="primary" isLoading={isLoading}>
                        Sign Up
                    </Button>
                </form>
            </Card>
        </div>
    );
}