import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserHeader from '../components/user/UserHeader';
import DifficultySelector from '../components/user/DifficultySelector';
import ChallengeList from '../components/user/ChallengeList';
import { IoArrowBack } from 'react-icons/io5';

import { type Challenge } from '../types';
import { getChallengesByDifficulty } from '../api';


const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const MainContainer = styled.main`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  background: #fff;
  border: 1px solid #e0e2e8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 2rem;
  color: #333;

  &:hover {
    background: #f1f3f5;
  }
`;

const ContentBox = styled.div`
  background: linear-gradient(180deg, #eaf0ff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e0e2e8;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #6c757d;
  font-weight: 500;
`;

const Title = styled.h1`
  margin: 0.5rem 0 2rem 0;
  font-size: 2.5rem;
  color: #212529;
`;

const Question = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #495057;
  margin: 0 0 1rem 0;
`;


const ChallengeSelectionPage: React.FC = () => {
  const [difficulty, setDifficulty] = useState('Básico');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  const difficultyMap = {
    'Básico': 'EASY' as const,
    'Intermediário': 'MEDIUM' as const,  
    'Avançado': 'HARD' as const
  };

  const loadChallenges = async (selectedDifficulty: string) => {
    setLoading(true);
    try {
      const backendDifficulty = difficultyMap[selectedDifficulty as keyof typeof difficultyMap];
      const challengesList = await getChallengesByDifficulty(backendDifficulty);
      setChallenges(challengesList);
    } catch (error) {
      console.error('Erro ao carregar desafios:', error);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges(difficulty);
  }, [difficulty]);

  return (
    <PageWrapper>
      <MainContainer>
        <ContentBox>
          <Subtitle>Selecione o nível de dificuldade</Subtitle>
          <Title>Desafios Disponíveis</Title>
          <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
        </ContentBox>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
            Carregando desafios...
          </div>
        ) : (
          <ChallengeList challenges={challenges} />
        )}
      </MainContainer>
    </PageWrapper>
  );
};

export default ChallengeSelectionPage;