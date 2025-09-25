import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import UserList from './components/user/UserList';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserSetup from './pages/UserSetup';

import './App.css';
import './styles/global.css';


import FloatingButton from './components/FloatingButton';
import ChatWindow from './components/ChatWindow';
import TrailsPanel from './pages/TrailsPanel';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<UserSetup />} />
          <Route path="/trilhas/:trilhaId" element={<TrailsPanel />} />
        </Routes>
      </main>
      
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>

  );
}

export default App;
