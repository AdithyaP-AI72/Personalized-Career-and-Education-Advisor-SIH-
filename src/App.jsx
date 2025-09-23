// src/App.jsx

import { useState, useEffect } from 'react';
import { collegeData } from './collegeData.js';
import { treeData } from './careerData.js';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import ProfilePanel from './components/ProfilePanel';
import TabNav from './components/TabNav';
import Quiz from './components/Quiz';
import NearbyColleges from './components/NearbyColleges';
import CareerPaths from './components/CareerPaths';
import Timeline from './components/Timeline';
import Modal from './components/Modal'; // Import the new Modal component
import './index.css';

// Helper function to get all users from our "temporary database"
const getAllUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : {};
};

// Helper function from original script
function findNodeByTitle(node, title) {
  if (node.t === title) return node;
  if (node.c) {
    for (const child of node.c) {
      const found = findNodeByTitle(child, title);
      if (found) return found;
    }
  }
  return null;
}

function App() {
  // User & UI State
  const [currentUser, setCurrentUser] = useState(null); // Changed from userProfile
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('quiz');
  const [isProfilePanelOpen, setProfilePanelOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // State for the modal

  // Career Path State
  const [selectedNode, setSelectedNode] = useState(null);

  // College Filtering State
  const [collegeState, setCollegeState] = useState({
    collegesWithDistance: [],
    userLocation: null,
    isCareerFilterActive: false,
    careerFilteredColleges: [],
  });

  // Load user session on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const allUsers = getAllUsers();
      if (allUsers[savedUser]) {
        setCurrentUser(allUsers[savedUser]);
      }
    }
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  // Handlers
  const handleLoginOrSignup = (username) => {
    const allUsers = getAllUsers();
    if (allUsers[username]) {
      // User exists, log them in
      localStorage.setItem('currentUser', username);
      setCurrentUser(allUsers[username]);
      return false; // Not a new user
    }
    // User does not exist
    return true; // Is a new user
  };

  const handleCompleteSignup = (username, details) => {
    const allUsers = getAllUsers();
    const newProfile = {
      name: username,
      ...details,
      profilePic: null,
    };
    allUsers[username] = newProfile;
    localStorage.setItem('users', JSON.stringify(allUsers));
    localStorage.setItem('currentUser', username);
    setCurrentUser(newProfile);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  const handleUpdateProfile = (updatedProfile) => {
    const allUsers = getAllUsers();
    allUsers[updatedProfile.name] = updatedProfile;
    localStorage.setItem('users', JSON.stringify(allUsers));
    setCurrentUser(updatedProfile);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const handleQuizComplete = (topCareer) => {
    const node = findNodeByTitle(treeData, topCareer);
    if (node) {
      setSelectedNode(node);
      setActiveTab('courses');
    }
  };

  const handleExploreColleges = (relevantColleges) => {
    setCollegeState(prev => ({ ...prev, careerFilteredColleges: relevantColleges, isCareerFilterActive: true }));
    setActiveTab('colleges');
  };

  if (!currentUser) {
    return <WelcomeScreen onLoginOrSignup={handleLoginOrSignup} onCompleteSignup={handleCompleteSignup} />;
  }

  return (
    <>
      <div id="appBody">
        <Header
          userProfile={currentUser}
          onProfileClick={() => setProfilePanelOpen(true)}
          onThemeToggle={toggleTheme}
          theme={theme}
        />
        <main>
          <TabNav activeTab={activeTab} onTabClick={setActiveTab} />
          
          {activeTab === 'quiz' && <Quiz onQuizComplete={handleQuizComplete} />}
          {activeTab === 'courses' && <CareerPaths selectedNode={selectedNode} setSelectedNode={setSelectedNode} onExplore={handleExploreColleges} />}
          {activeTab === 'colleges' && <NearbyColleges collegeState={collegeState} setCollegeState={setCollegeState} onTabSwitch={setActiveTab} onOpenModal={(title, content) => setModalData({ title, content })} />}
          {activeTab === 'timeline' && <Timeline />}
        </main>
      </div>
      <ProfilePanel isOpen={isProfilePanelOpen} onClose={() => setProfilePanelOpen(false)} userProfile={currentUser} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} title={modalData?.title}>
        {modalData?.content}
      </Modal>
    </>
  );
}

export default App;