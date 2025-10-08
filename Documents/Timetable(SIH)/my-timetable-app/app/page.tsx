import Link from 'next/link';
import { Button } from '@/components/Button';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Timelyantra!</h1>
        <p className={styles.subtitle}>
          Your AI-powered solution for generating optimized, conflict-free academic timetables.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}