import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import FloatingButton from './components/FloatingButton';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <HomePage />
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
