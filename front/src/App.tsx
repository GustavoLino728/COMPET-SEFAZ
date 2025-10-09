import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import UserList from './components/user/UserList';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/userProfile/UserProfilePage'
import UserSetup from './pages/UserSetup';
import ResetPassword from './pages/ResetPasswordPage';
import ResetPasswordConfirm from './pages/ResetPasswordConfirmPage';
import ProgramasPage from './pages/ProgramasPage'; 
import ProgramaTrilhasPage from './pages/ProgramaTrilhasPage'; 
import TrailsPanel from './pages/TrailsPanel';

import './App.css';
import './styles/global.css';
import { createGlobalStyle } from 'styled-components';



import FloatingButton from './components/FloatingButton';
import ChatWindow from './components/ChatWindow';
import AdminSefaz from './pages/AdminSefaz';
import ApprovedChallenges from './pages/ApprovedChallenges';
import ChallengeSelectionPage from './pages/ChallengeSelectionPage';
import ChallengeStartPage from './pages/ChallengeStartPage';
import QuizPage from './pages/QuizPage';
import QuizCompletionPage from './pages/QuizCompletionPage';
import ProfilePage from './pages/ProfilePage';
import ProgressTab from './components/profile/tabs/ProgressTab';
import PersonalInfoTab from './components/profile/tabs/PersonalInfoTab';
import ProfessionalInfoTab from './components/profile/tabs/ProfessionalInfoTab';
import BadgesTab from './components/profile/tabs/BadgesTab';
import ChallengeGeneratorPage from './pages/ChallengeGeneratorPage';
import ChallengeGeneratedPage from './pages/ChallengeGeneratedPage';
import Dashboard from './pages/Dashboard';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
`;

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
   <div>
      <GlobalStyle />
      <Header />

      <main>
        <Routes>

          {/* Rotas Victor */}
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/admin" element={<AdminSefaz />} />
          <Route path="/admin/aprovados" element={<ApprovedChallenges />} />
          <Route path="/desafios" element={<ChallengeSelectionPage />} />
          <Route path="/desafio/:id" element={<ChallengeStartPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/quiz/resultado/:id" element={<QuizCompletionPage />} />
          <Route path="/admin/gerador" element={<ChallengeGeneratorPage />} />
          <Route path="/admin/desafio-gerado" element={<ChallengeGeneratedPage />} />
          {/* Fim rotas Victor */}

          <Route path="/" element={<HomePage />} />
          <Route path="/trilhas" element={<ProgramasPage />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<UserSetup />} />
          <Route path="/esqueci-senha" element={<ResetPassword/>}/>
          <Route path="/nova-senha" element={<ResetPasswordConfirm/>}/>
          <Route path="/trilhas/:programaId" element={<ProgramaTrilhasPage />} />
          <Route path="/trilha/:trilhaId" element={<TrailsPanel />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirm/>}/>
          <Route path="/perfil" element={<UserProfilePage/>}/>
          <Route path="/trilhas/:trilhaId" element={<TrailsPanel />} />

          {/* Add other routes as needed */}
        </Routes>
      </main>
      
      <FloatingButton onClick={handleChatToggle} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>

  );
}

export default App;