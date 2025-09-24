import { useState } from 'react';

const timelineData = { Karnataka: { Class10: [{ title: "SSLC Board Exam Registration", date: "Sep - Oct 2025", status: "upcoming", description: "Schools complete the registration process for the SSLC board exams." }, { title: "SSLC Preparatory Exams", date: "Jan - Feb 2026", status: "upcoming", description: "State-level preparatory exams to help students prepare." }, { title: "SSLC Final Board Exams", date: "March 2026", status: "upcoming", description: "The main theory and practical examinations are conducted." },], Class12: [{ title: "2nd PUC Mid-Term Exams", date: "Nov - Dec 2025", status: "upcoming", description: "College-level mid-term exams." }, { title: "2nd PUC Final Practical Exams", date: "Jan - Feb 2026", status: "upcoming", description: "Practical exams for science stream students are conducted." }, { title: "2nd PUC Final Board Exams", date: "March 2026", status: "upcoming", description: "The main theory examinations for all streams." },] }, CBSE: { Class10: [{ title: "List of Candidates (LOC) Submission", date: "Aug - Sep 2025", status: "upcoming", description: "Schools submit the list of Class 10 candidates to CBSE." }, { title: "Practical Exams / Internal Assessments", date: "Jan - Feb 2026", status: "upcoming", description: "Schools conduct practicals and internal assessments." }, { title: "Class 10 Board Exams", date: "Feb - Apr 2026", status: "upcoming", description: "CBSE conducts the main board examinations." },], Class12: [{ title: "Pre-Board Examinations", date: "Dec 2025 - Jan 2026", status: "upcoming", description: "Schools conduct pre-board exams to prepare students." }, { title: "Practical Examinations", date: "Jan - Feb 2026", status: "upcoming", description: "Board-appointed external examiners conduct practicals." }, { title: "Class 12 Board Exams", date: "Feb - Apr 2026", status: "upcoming", description: "The main theory examinations for all streams." },] }, ICSE: { Class10: [{ title: "ICSE Semester 1 / Pre-Boards", date: "Nov - Dec 2025", status: "upcoming", description: "Internal school-level examinations." }, { title: "Project Work & Practical Submissions", date: "Jan 2026", status: "upcoming", description: "Final submission of all internal assessment work." }, { title: "ICSE Final Examinations", date: "Feb - Mar 2026", status: "upcoming", description: "CISCE conducts the final board examinations." },], Class12: [{ title: "ISC Semester 1 / Pre-Boards", date: "Nov - Dec 2025", status: "upcoming", description: "Internal school-level examinations for Class 12." }, { title: "Practical Examinations", date: "Jan - Feb 2026", status: "upcoming", description: "Practical exams are conducted by visiting examiners." }, { title: "ISC Final Examinations", date: "Feb - Mar 2026", status: "upcoming", description: "The final theory examinations for all streams." },] }, };

export default function Timeline() {
    const [currentBoard, setCurrentBoard] = useState('Karnataka');
    const [currentClass, setCurrentClass] = useState('Class10');

    const events = timelineData[currentBoard]?.[currentClass] || [];

    return (
        <section id="timeline" className="tab-content active">
            <h2>Academic Timelines (2025-26)</h2>
            <div id="boardSelector" className="timeline-selector">
                {Object.keys(timelineData).map(board => (
                    <button
                        key={board}
                        className={`board-select-btn ${currentBoard === board ? 'active' : ''}`}
                        onClick={() => setCurrentBoard(board)}
                    >
                        {board === 'Karnataka' ? 'Karnataka Board' : board}
                    </button>
                ))}
            </div>
            <div id="classSelector" className="timeline-selector">
                <button
                    className={`timeline-select-btn ${currentClass === 'Class10' ? 'active' : ''}`}
                    onClick={() => setCurrentClass('Class10')}
                >
                    Class 10
                </button>
                <button
                    className={`timeline-select-btn ${currentClass === 'Class12' ? 'active' : ''}`}
                    onClick={() => setCurrentClass('Class12')}
                >
                    Class 12
                </button>
            </div>

            <div className="timeline-container">
                <div className="timeline-group">
                    <h3 id="timelineTitle">
                        📘 {currentClass.replace('Class', 'Class ')} ({currentBoard} Board)
                    </h3>
                    <div id="timelineEvents" className="timeline-events">
                        {events.map(event => (
                            <div key={event.title} className={`timeline-card status-${event.status}`}>
                                <div className="timeline-status">
                                    <div className="status-dot"></div>
                                    <span>{event.status.toUpperCase()}</span>
                                </div>
                                <div className="timeline-content">
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                    <small><strong>Date:</strong> {event.date}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}