// src/components/NearbyColleges.jsx

import { useState, useMemo } from 'react';
import { collegeData } from '../collegeData.js';

// ... (getDistance function remains the same)
function getDistance(p1, p2) {
    const R = 6371;
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLon = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function formatCollegeDetails(college) {
    if (!college.details) {
        return <p>Detailed information is not available for this college.</p>;
    }
    return (
        <>
            <h4>Available Degree Programs</h4>
            <p>{college.details.programs}</p>
            <h4>Cut-offs & Eligibility</h4>
            <p>{college.details.eligibility}</p>
            <h4>Medium of Instruction</h4>
            <p>{college.details.medium}</p>
            <h4>Facilities</h4>
            <p>{college.details.facilities}</p>
        </>
    );
}

export default function NearbyColleges({ collegeState, setCollegeState, onTabSwitch, onOpenModal }) {
    const [status, setStatus] = useState('idle'); // idle, searching, found, error
    const [distanceFilter, setDistanceFilter] = useState('all');

    const { isCareerFilterActive, careerFilteredColleges, collegesWithDistance } = collegeState;

    const handleFindNearby = () => {
        setStatus('searching');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    const colleges = collegeData.map(c => ({ ...c, distance: getDistance(location, c) }))
                        .sort((a, b) => a.distance - b.distance);
                    setCollegeState(prev => ({ ...prev, userLocation: location, collegesWithDistance: colleges }));
                    setStatus('found');
                },
                () => setStatus('error')
            );
        } else {
            setStatus('error');
        }
    };

    const handleCareerFilterToggle = () => {
        if (isCareerFilterActive) {
            setCollegeState(prev => ({ ...prev, isCareerFilterActive: false }));
        } else {
            if (careerFilteredColleges.length === 0) {
                onTabSwitch('courses');
                return;
            }
            setCollegeState(prev => ({ ...prev, isCareerFilterActive: true }));
        }
    };

    const filteredColleges = useMemo(() => {
        let collegesToDisplay = collegesWithDistance;

        if (isCareerFilterActive && careerFilteredColleges.length > 0) {
            const careerCollegeNames = careerFilteredColleges.map(c => c.name);
            collegesToDisplay = collegesToDisplay.filter(c => careerCollegeNames.includes(c.name));
        }

        if (distanceFilter !== 'all') {
            return collegesToDisplay.filter(c => c.distance <= parseFloat(distanceFilter));
        }

        return collegesToDisplay;
    }, [distanceFilter, collegesWithDistance, isCareerFilterActive, careerFilteredColleges]);

    return (
        <section id="colleges">
            <h2>Nearby Colleges</h2>
            <div className="college-controls">
                {status === 'idle' && <button id="findNearbyBtn" className="action-btn" onClick={handleFindNearby}>📍 Find Colleges Near Me</button>}

                {status !== 'idle' && (
                    <div id="distanceFilterContainer" className="distance-filter-container">
                        <label htmlFor="distanceFilter">Show colleges within:</label>
                        <select value={distanceFilter} onChange={e => setDistanceFilter(e.target.value)}>
                            <option value="all">Any distance</option>
                            <option value="10">10 km</option>
                            <option value="20">20 km</option>
                            <option value="50">50 km</option>
                        </select>
                        <button className={`action-btn toggle-btn ${isCareerFilterActive ? 'active' : ''}`} onClick={handleCareerFilterToggle}>
                            <span className="icon"></span> Filter by Chosen Career
                        </button>
                    </div>
                )}
            </div>

            {status === 'searching' && <p>Getting your location...</p>}
            {status === 'error' && <p>Could not get your location. Please grant permission and refresh.</p>}
            {status === 'found' && (
                <>
                    {filteredColleges.length === 0 ? (
                        <p>No colleges found with the current filters.</p>
                    ) : (
                        <ul id="collegeList">
                            {filteredColleges.map(college => (
                                <li key={college.name}>
                                    <div className="college-info">
                                        <strong>{college.name}</strong>
                                        <div className="college-details">
                                            <span>{college.type}</span>
                                            <span>📍 {college.distance.toFixed(1)} km away</span>
                                        </div>
                                    </div>
                                    <div className="button-group">
                                        <button className="about-btn" onClick={() => onOpenModal(college.name, formatCollegeDetails(college))}>About</button>
                                        <a href={college.website} target="_blank" rel="noopener noreferrer" className="website-btn">Website</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    );
}