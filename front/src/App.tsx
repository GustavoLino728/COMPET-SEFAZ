import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './components/HomePage';
import UserList from './components/user/UserList';
import RegisterPage from './pages/RegisterPage';
import './App.css';

import FloatingButton from './components/FloatingButton';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
   <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/cadastro" element={<RegisterPage />} />
        </Routes>
      </main>
      
      
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
