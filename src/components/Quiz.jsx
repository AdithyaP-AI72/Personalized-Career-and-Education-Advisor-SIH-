import { useState } from 'react';
import { treeData } from '../careerData.js'; // Assuming quiz data is inside this file or another one

const quizQuestions = [{ question: "1. Which activity sounds most appealing to you?", options: [{ text: "Building and fixing machines or electronics.", target: ["Mechanical", "Automobile", "Electrical", "Electronics & Communication"] }, { text: "Designing buildings, bridges, or cities.", target: ["Civil", "Architecture (B.Arch)"] }, { text: "Writing code, creating apps, or working with data.", target: ["Computer Science", "Information Technology"] }, { text: "Helping people with their health and well-being.", target: ["MBBS / BDS", "B.Sc Nursing", "Pharmacy (B.Pharm)"] }, { text: "Managing a business, finances, or a team.", target: ["BBA / BBM", "CA (Chartered Accountancy)", "CS (Company Secretary)"] }] }, { question: "2. What is your favorite type of problem to solve?", options: [{ text: "Logical puzzles and software bugs.", target: ["Computer Science", "Information Technology"] }, { text: "How to make a physical object work better or more efficiently.", target: ["Mechanical", "Automobile"] }, { text: "Understanding how the human body works to diagnose issues.", target: ["MBBS / BDS", "General Medicine"] }, { text: "Legal or ethical dilemmas.", target: ["LLB (Law)", "CS (Company Secretary)"] }, { text: "How to organize a project or an event successfully.", target: ["BBA / BBM", "Hotel Management"] }] }, { question: "3. Which work environment do you prefer?", options: [{ text: "A workshop, lab, or on-site at a construction project.", target: ["Mechanical", "Civil", "Automobile"] }, { text: "A hospital, clinic, or pharmacy.", target: ["MBBS / BDS", "B.Sc Nursing", "Pharmacy (B.Pharm)"] }, { text: "An office, collaborating with a team on software or business strategy.", target: ["Computer Science", "BBA / BBM", "CA (Chartered Accountancy)"] }, { text: "A creative studio or a newsroom.", target: ["Fine Arts / Commercial Arts Diploma", "Journalism / Mass Communication"] }, { text: "A courtroom or a corporate legal department.", target: ["LLB (Law)"] }] }, { question: "4. When working on a project, you are the one who...", options: [{ text: "Comes up with the creative vision and design.", target: ["Architecture (B.Arch)", "Fine Arts / Commercial Arts Diploma"] }, { text: "Builds the functional prototype and makes it work.", target: ["Mechanical", "Computer Engineering", "Electrical"] }, { text: "Analyzes the data and finds patterns.", target: ["Information Technology", "CA (Chartered Accountancy)"] }, { text: "Communicates the idea to others and presents the results.", target: ["Journalism / Mass Communication", "BBA / BBM"] }, { text: "Ensures all the rules and requirements are met.", target: ["LLB (Law)", "CS (Company Secretary)"] }] }, { question: "5. What long-term impact do you want to have?", options: [{ text: "Create technology that changes how people live and work.", target: ["Computer Science", "Electronics & Communication"] }, { text: "Build lasting physical structures for communities.", target: ["Civil", "Architecture (B.Arch)"] }, { text: "Improve people's health and quality of life directly.", target: ["MBBS / BDS", "B.Sc Nursing", "Pharmacy (B.Pharm)"] }, { text: "Ensure fairness and justice in society.", target: ["LLB (Law)"] }, { text: "Drive economic growth and innovation in business.", target: ["BBA / BBM", "CA (Chartered Accountancy)"] }] }, { question: "6. What subjects did you enjoy most in school?", options: [{ text: "Physics and Mathematics.", target: ["Mechanical", "Civil", "Electrical", "Computer Science", "Architecture (B.Arch)"] }, { text: "Biology and Chemistry.", target: ["MBBS / BDS", "Pharmacy (B.Pharm)", "B.Sc Nursing"] }, { text: "Business Studies and Economics.", target: ["B.Com", "BBA / BBM", "CA (Chartered Accountancy)"] }, { text: "History, Civics, and Literature.", target: ["B.A. (Bachelor of Arts)", "LLB (Law)", "Journalism / Mass Communication"] }, { text: "Art, Design or Computer Applications.", target: ["Fine Arts / Commercial Arts Diploma", "Information Technology"] }] },];

function findNodePath(node, title, path = []) {
    const currentPath = [...path, node.t];
    if (node.t === title) return currentPath;
    if (node.c) {
        for (const child of node.c) {
            const result = findNodePath(child, title, currentPath);
            if (result) return result;
        }
    }
    return null;
}


export default function Quiz({ onQuizComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({});
    const [finished, setFinished] = useState(false);

    const handleOptionSelect = (option) => {
        const newScores = { ...scores };
        option.target?.forEach(career => {
            newScores[career] = (newScores[career] || 0) + 1;
        });
        setScores(newScores);

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScores({});
        setFinished(false);
    };

    const getTopCareer = () => {
        if (Object.keys(scores).length === 0) return null;
        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        return sortedScores[0][0];
    };

    const topCareer = getTopCareer();
    const careerPath = topCareer ? findNodePath(treeData, topCareer) : null;

    return (
        <section id="quiz" className="tab-content active">
            <h2>Aptitude Quiz</h2>
            <div id="quizProgressContainer">
                <div
                    id="progressFill"
                    style={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
                ></div>
            </div>
            <div id="quizBox">
                {!finished ? (
                    <>
                        <h3>{quizQuestions[currentQuestion].question}</h3>
                        <div className="options">
                            {quizQuestions[currentQuestion].options.map((opt, index) => (
                                <button key={index} onClick={() => handleOptionSelect(opt)}>
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="quiz-results">
                        <h3>Your Recommended Career</h3>
                        {topCareer ? (
                            <>
                                <div className="recommendation">
                                    <h4>{topCareer}</h4>
                                    {careerPath && <p><strong>Path:</strong> {careerPath.join(' → ')}</p>}
                                </div>
                                <div className="result-buttons">
                                    <button onClick={() => onQuizComplete(topCareer)}>Explore Path</button>
                                    <button onClick={restartQuiz}>Retake Quiz</button>
                                </div>
                            </>
                        ) : (
                            <p>Could not determine a recommendation. Please try again!</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}