import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import './App.css';

import HomePage from './components/HomePage';
import FloatingButton from './components/FloatingButton';
import ChatWindow from './components/ChatWindow';

import UserList from './components/user/UserList';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <nav style={{ padding: '10px', backgroundColor: '#282c34' }}>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>User List</Link>
      </nav>
      <hr />

      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
      
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
