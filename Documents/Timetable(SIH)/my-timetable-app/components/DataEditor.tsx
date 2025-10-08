import React, { useState, useEffect, useCallback } from 'react';
import { Textarea } from './Input';
import { Course, Faculty, Room, Student } from '../types';

type EntityType = 'courses' | 'students' | 'faculty' | 'rooms';

interface DataEditorProps {
    entityType: EntityType;
    data: Course[] | Student[] | Faculty[] | Room[];
    onSave: (newData: any[]) => void;
    onError: (message: string) => void;
}

export const DataEditor: React.FC<DataEditorProps> = ({ entityType, data, onSave, onError }) => {
    const [jsonValue, setJsonValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        try {
            setJsonValue(JSON.stringify(data, null, 2));
            setIsValid(true);
        } catch (e) {
            console.error(`Error stringifying ${entityType} data:`, e);
            setJsonValue('[]');
            setIsValid(false);
            onError(`Error displaying ${entityType} data. Invalid format.`);
        }
    }, [data, entityType, onError]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonValue(e.target.value);
        try {
            JSON.parse(e.target.value);
            setIsValid(true);
        } catch {
            setIsValid(false);
        }
    }, []);

    const handleSaveAttempt = useCallback(() => {
        if (!isValid) {
            onError(`Error saving ${entityType}: Invalid JSON format.`);
            return;
        }
        try {
            const parsedData = JSON.parse(jsonValue);
            onSave(parsedData);
        } catch (e) {
            onError(`Error parsing JSON for ${entityType}: ${e instanceof Error ? e.message : String(e)}`);
            setIsValid(false);
        }
    }, [isValid, jsonValue, onSave, onError, entityType]);

    return (
        <details className="group" open>
            <summary className="cursor-pointer font-semibold py-2 outline-none focus:ring-2 focus:ring-accent rounded transition-colors hover:text-accent">
                {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
            </summary>
            <Textarea
                value={jsonValue}
                onChange={handleChange}
                rows={8}
                className={`font-mono mt-2 ${!isValid ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                spellCheck="false"
                onBlur={handleSaveAttempt}
            />
            {!isValid && (
                <p className="text-red-500 text-sm mt-1">Invalid JSON format.</p>
            )}
        </details>
    );
};
