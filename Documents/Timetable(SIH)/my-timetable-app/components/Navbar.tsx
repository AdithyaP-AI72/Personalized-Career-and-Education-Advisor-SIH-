import Link from 'next/link';
import { Button } from './Button';
import { useUser } from '@/hooks/useUser';
import { LogoutButton } from './LogoutButton';
import { ThemeControls } from './ThemeControls';
import styles from './Navbar.module.css';

// CORRECTED: The component is now an async function
export const Navbar = async () => {
    const user = await useUser(); // We now 'await' the result of the hook

    return (
        <nav className={`${styles.navbar} no-print`}>
            <div className={styles.container}>
                <div className={styles.leftNav}>
                    <Link href="/" className={styles.brand}>Timelyantra</Link>
                    {user && (
                        <>
                            <Link href="/dashboard"><Button>Dashboard</Button></Link>
                            <Link href="/timetable"><Button>Timetable</Button></Link>
                        </>
                    )}
                </div>

                <div className={styles.rightNav}>
                    {user ? (
                        <>
                            <div className={styles.userProfile}>
                                <span>{user.email}</span>
                            </div>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/login"><Button variant="default">Login</Button></Link>
                            <Link href="/signup"><Button variant="primary">Sign Up</Button></Link>
                        </>
                    )}

                    <ThemeControls />
                </div>
            </div>
        </nav>
    );
};