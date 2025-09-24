export default function TabNav({ activeTab, onTabClick }) {
    const tabs = ['quiz', 'courses', 'colleges', 'timeline'];
    const tabLabels = {
        quiz: '🧠 Aptitude Quiz',
        courses: '🗺️ Career Paths',
        colleges: '🏫 Nearby Colleges',
        timeline: '🗓️ Timeline Tracker',
    };

    return (
        <nav className="tab-nav">
            {tabs.map(tabId => (
                <button
                    key={tabId}
                    className={`tab-btn ${activeTab === tabId ? 'active' : ''}`}
                    onClick={() => onTabClick(tabId)}
                >
                    {tabLabels[tabId]}
                </button>
            ))}
        </nav>
    );
}