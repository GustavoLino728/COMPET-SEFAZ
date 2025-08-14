import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import RegisterPage from './pages/RegisterPage';

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
        <Link to="/">Home</Link>
        <Link to="/users">User List</Link>
        <Link to="cadrastro">Cadrastro</Link>
      </nav>
      <hr />

      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/cadrastro" element={<RegisterPage />} />
        </Routes>
      </main>
      
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
