import React from 'react';
import styled from 'styled-components';
import UserHeader from '../components/user/UserHeader';
import ChallengeHero from '../components/user/ChallengeHero';
import StartInstructions from '../components/user/StartInstructions';

// Mock de dados para um desafio específico. Em uma aplicação real,
// você usaria o ID da URL para buscar esses dados de uma API.
const challengeData = {
  id: 1,
  level: 'BÁSICO',
  title: 'PROIND T1: Cálculo do Incentivo',
  description: 'Você será apresentado a uma situação prática envolvendo o cálculo do incentivo do PROIND. O objetivo é aplicar os conceitos aprendidos, realizando contas simples e analisando regras básicas do programa.',
  questionCount: 5,
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ChallengeStartPage: React.FC = () => {
  return (
    <PageWrapper>
      <UserHeader />
      <ChallengeHero 
        title={`DESAFIO ${challengeData.id} (${challengeData.level})`}
        subtitle={challengeData.title}
      />
      <StartInstructions 
        description={challengeData.description}
        questionCount={challengeData.questionCount}
      />
    </PageWrapper>
  );
};

export default ChallengeStartPage;