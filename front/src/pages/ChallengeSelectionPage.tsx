import React, { useState } from 'react';
import styled from 'styled-components';
import UserHeader from '../components/user/UserHeader';
import DifficultySelector from '../components/user/DifficultySelector';
import ChallengeList from '../components/user/ChallengeList';
import { IoArrowBack } from 'react-icons/io5';

import { type Challenge } from '../types';
import { basicChallenges, intermediateChallenges, advancedChallenges } from '../challenges/challenges';


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
    
    const getActiveChallenges = (): Challenge[] => {
        switch (difficulty) {
            case 'Básico':
                return basicChallenges; 
            case 'Intermediário':
                return intermediateChallenges; 
            case 'Avançado':
                return advancedChallenges; 
            default:
                return [];
        }
    };
    
    return (
        <PageWrapper>
            {/* ... */}
            <UserHeader />
            <MainContainer>
                {/* ... */}
                <ContentBox>
                    {/* ... */}
                    <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
                </ContentBox>

                <ChallengeList challenges={getActiveChallenges()} />
            </MainContainer>
        </PageWrapper>
    );
}

export default ChallengeSelectionPage;