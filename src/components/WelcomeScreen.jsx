// src/components/WelcomeScreen.jsx

import { useState } from 'react';

export default function WelcomeScreen({ onLoginOrSignup, onCompleteSignup }) {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [details, setDetails] = useState({
        age: '',
        gender: '',
        class: '',
        academicInterests: '',
    });

    const handleLoginAttempt = () => {
        if (!username.trim()) {
            alert("Please enter a username.");
            return;
        }
        const isNewUser = onLoginOrSignup(username.trim());
        if (isNewUser) {
            setStep(2); // Go to details screen for new users
        }
    };

    const handleDetailChange = (e) => {
        const { id, value } = e.target;
        setDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleFinish = () => {
        onCompleteSignup(username.trim(), details);
    };

    return (
        <>
            {step === 1 && (
                <div id="welcomeScreen" className="setup-screen">
                    <div className="welcome-box">
                        <h2>Welcome Back!</h2>
                        <p>Please enter your username to log in or sign up.</p>
                        <div className="profile-form">
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button type="button" onClick={handleLoginAttempt}>Login or Sign Up</button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div id="detailsScreen" className="setup-screen">
                    <div className="welcome-box">
                        <h2>Create Your Profile</h2>
                        <p>Welcome, {username}! Please fill out your details.</p>
                        <div className="profile-form">
                            <input type="number" id="age" placeholder="Enter your age" value={details.age} onChange={handleDetailChange} />
                            <select id="gender" value={details.gender} onChange={handleDetailChange}>
                                <option value="" disabled>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <select id="class" value={details.class} onChange={handleDetailChange}>
                                <option value="" disabled>Select your class</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                            <button type="button" onClick={handleFinish}>Finish Setup</button>
                            <button type="button" className="skip-btn" onClick={handleFinish}>Skip for now</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
