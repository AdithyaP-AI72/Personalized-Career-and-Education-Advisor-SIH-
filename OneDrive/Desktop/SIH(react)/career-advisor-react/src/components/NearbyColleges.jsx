import { useState, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Helper function to format college details for the modal
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

// Map container style
const containerStyle = {
    width: '100%',
    height: '100%'
};

export default function NearbyColleges({ collegeState, setCollegeState, onTabSwitch, onOpenModal, onFindNearby }) {
    const [distanceFilter, setDistanceFilter] = useState('all');
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Effect to listen for online/offline status changes
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const { isCareerFilterActive, careerFilteredColleges, collegesWithDistance, userLocation, status } = collegeState;

    // Load the Google Maps script only if the user is online
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        disabled: !isOnline, // This is the key change
    });

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

    // Reusable UI for the list of colleges
    const collegeListUI = (
        <div className="college-list-container">
            {filteredColleges.length === 0 ? (
                <p>No colleges found with the current filters.</p>
            ) : (
                <ul id="collegeList">
                    {filteredColleges.map(college => (
                        <li key={college.name} onClick={() => isOnline && isLoaded && setSelectedCollege(college)}>
                            <div className="college-info">
                                <strong>{college.name}</strong>
                                <div className="college-details">
                                    <span>{college.type}</span>
                                    <span>📍 {college.distance.toFixed(1)} km away</span>
                                </div>
                            </div>
                            <div className="button-group">
                                <button
                                    className="about-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenModal(college.name, formatCollegeDetails(college));
                                    }}
                                >
                                    About
                                </button>
                                <a
                                    href={college.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="website-btn"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Website
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <section id="colleges">
            <h2>Nearby Colleges</h2>
            <div className="college-controls">
                {status === 'idle' && (
                    <button id="findNearbyBtn" className="action-btn" onClick={onFindNearby}>
                        📍 Find Colleges Near Me
                    </button>
                )}

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
                    {/* If ONLINE, show split-screen layout */}
                    {isOnline && isLoaded ? (
                        <div className="colleges-layout">
                            <div className="map-container">
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={userLocation}
                                    zoom={11}
                                >
                                    <Marker position={userLocation} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />
                                    {filteredColleges.map(college => (
                                        <Marker
                                            key={college.name}
                                            position={{ lat: college.lat, lng: college.lng }}
                                            onClick={() => setSelectedCollege(college)}
                                        />
                                    ))}
                                    {selectedCollege && (
                                        <InfoWindow
                                            position={{ lat: selectedCollege.lat, lng: selectedCollege.lng }}
                                            onCloseClick={() => setSelectedCollege(null)}
                                        >
                                            <div>
                                                <h4>{selectedCollege.name}</h4>
                                                <p>{selectedCollege.location}</p>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
                            </div>
                            {collegeListUI}
                        </div>
                    ) : (
                        // If OFFLINE, show only the list and a message
                        <div>
                            {!isOnline && <p style={{ textAlign: 'center', padding: '10px', background: 'var(--border-color)', borderRadius: '8px' }}>You are offline. Map features are disabled.</p>}
                            {collegeListUI}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}