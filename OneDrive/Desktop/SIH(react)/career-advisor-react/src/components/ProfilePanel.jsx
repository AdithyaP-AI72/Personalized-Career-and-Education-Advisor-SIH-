import { useState, useEffect } from 'react';

export default function ProfilePanel({ isOpen, onClose, userProfile, onUpdateProfile, onLogout }) {
    const [isEditMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(userProfile);

    // When userProfile prop changes, update the form data
    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);

    const handleInputChange = (e) => {
        const { dataset, value } = e.target;
        setFormData(prev => ({ ...prev, [dataset.key]: value }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
        setEditMode(false);
    };

    const handleCancel = () => {
        setFormData(userProfile); // Reset changes
        setEditMode(false);
    };

    const handlePfpChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                const updatedProfile = { ...formData, profilePic: imageUrl };
                setFormData(updatedProfile);
                onUpdateProfile(updatedProfile); // Save immediately
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className={`page-overlay ${isOpen ? '' : 'hidden'}`} onClick={onClose}></div>
            <div id="profilePanel" className={`profile-panel ${isOpen ? 'open' : ''}`}>
                <div className="profile-header">
                    <h3>Your Profile</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="profile-body">
                    <div className="pfp-container">
                        <div
                            id="profileAvatar"
                            className="profile-avatar"
                            style={{ backgroundImage: `url(${formData.profilePic})` }}
                        >
                            {!formData.profilePic && (
                                <span id="profileInitial">{formData.name ? formData.name.charAt(0).toUpperCase() : '?'}</span>
                            )}
                        </div>
                        <input type="file" id="pfpUpload" className="hidden" accept="image/*" onChange={handlePfpChange} />
                        <button
                            id="changePfpBtn"
                            className="pfp-edit-btn"
                            aria-label="Change Profile Picture"
                            onClick={() => document.getElementById('pfpUpload').click()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.586l6.5-6.5L13.5 6.646z" />
                            </svg>
                        </button>
                    </div>

                    {!isEditMode ? (
                        <div id="profileDisplay" className="profile-section">
                            <p><strong>Name:</strong> <span>{formData.name || 'N/A'}</span></p>
                            <p><strong>Age:</strong> <span>{formData.age || 'N/A'}</span></p>
                            <p><strong>Gender:</strong> <span>{formData.gender || 'N/A'}</span></p>
                            <p><strong>Class:</strong> <span>{formData.class || 'N/A'}</span></p>
                            <p><strong>Interests:</strong> <span>{formData.academicInterests || 'N/A'}</span></p>
                            <button className="action-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                        </div>
                    ) : (
                        <div id="profileEdit" className="profile-section">
                            <label>Name:</label>
                            <input type="text" data-key="name" value={formData.name} onChange={handleInputChange} />
                            <label>Age:</label>
                            <input type="number" data-key="age" value={formData.age} onChange={handleInputChange} />
                            <label>Gender:</label>
                            <select data-key="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <label>Class:</label>
                            <select data-key="class" value={formData.class} onChange={handleInputChange}>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                            <label>Interests:</label>
                            <input type="text" data-key="academicInterests" value={formData.academicInterests} onChange={handleInputChange} />
                            <div className="button-group">
                                <button className="action-btn" onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="profile-footer">
                    <button id="logoutBtn" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </>
    );
}