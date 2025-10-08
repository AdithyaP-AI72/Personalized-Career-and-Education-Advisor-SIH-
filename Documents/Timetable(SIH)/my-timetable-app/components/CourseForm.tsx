import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Course } from '@/types';
import styles from './CourseForm.module.css';

interface CourseFormProps {
    course?: Course | null; // Pass an existing course to edit it
    onSave: (course: Course) => void;
    onCancel: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onSave, onCancel }) => {
    const [formData, setFormData] = React.useState<Partial<Course>>(
        course || {
            id: '',
            name: '',
            type: 'theory',
            credits: 3,
            category: 'Other'
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'credits' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id && formData.name) {
            onSave(formData as Course);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                label="Course ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="e.g., CS101"
                disabled={!!course} // Disable editing ID for existing courses
            />
            <Input
                label="Course Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Introduction to Computer Science"
            />
            <div className={styles.inputRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="credits" className={styles.label}>Credits</label>
                    <Input
                        id="credits"
                        name="credits"
                        type="number"
                        value={formData.credits}
                        onChange={handleChange}
                        required
                        min="1"
                        max="6"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type" className={styles.label}>Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} className={styles.select}>
                        <option value="theory">Theory</option>
                        <option value="practical">Practical</option>
                    </select>
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>NEP Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="SEC">Skill Enhancement (SEC)</option>
                    <option value="AEC">Ability Enhancement (AEC)</option>
                    <option value="VAC">Value Added (VAC)</option>
                    <option value="IKS">Indian Knowledge Systems (IKS)</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className={styles.actions}>
                <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">Save Course</Button>
            </div>
        </form>
    );
};