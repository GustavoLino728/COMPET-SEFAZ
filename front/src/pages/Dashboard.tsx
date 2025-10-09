import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import QuickAccess from '../components/QuickAccess';
import SuggestedTracks from '../components/SuggestedTracks';
import Doubts from '../components/Doubts';

const DashboardWrapper = styled.div`
  background-color: #f8f9fa;
`;

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeHeader = styled.div`
  margin-bottom: 2.5rem;
  
  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 1.1rem;
    color: #6c757d;
    margin: 0;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <Header />
      <MainContainer>
        <WelcomeHeader>
          <h1>Bem vindo, Mário</h1>
          <p>Explore sua jornada de aprendizado e mantenha-se atualizado sobre incentivos fiscais.</p>
        </WelcomeHeader>
        <QuickAccess />
        <SuggestedTracks />
        <Doubts />
      </MainContainer>
    </DashboardWrapper>
  );
}

export default Dashboard;