import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: number;
  title: string;
  tags: string[];
  status?: string;
}

interface ChallengesGridProps {
  title: string;
  challenges: Challenge[];
  showApproveButton?: boolean;
  onApprove?: (challengeId: number) => void;
}

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ChallengeCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3` margin: 0; font-size: 1.2rem; `;

const TagsContainer = styled.div` display: flex; flex-wrap: wrap; gap: 0.5rem; `;

const Tag = styled.span`
  background-color: #f4f5fa;
  border: 1px solid #e0e2e8;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const AccessButton = styled.button`
  background-color: #495057;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  &:hover { background-color: #343a40; }
`;

const ApproveButton = styled.button`
  background-color: #2f3a7d;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  &:hover { background-color: #212529; }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ChallengesGrid: React.FC<ChallengesGridProps> = ({ 
  title, 
  challenges, 
  showApproveButton = false, 
  onApprove 
}) => {
  const navigate = useNavigate();

  const handleAccessChallenge = (challenge: Challenge) => {
    // Navegar para a página de detalhes do desafio
    navigate('/admin/desafio-gerado', { 
      state: { challenge } 
    });
  };

  const handleApprove = (challengeId: number) => {
    if (onApprove) {
      onApprove(challengeId);
    }
  };

  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <GridContainer>
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id}>
            <Title>{challenge.title}</Title>
            <TagsContainer>
              {challenge.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </TagsContainer>
            <ButtonContainer>
              <AccessButton onClick={() => handleAccessChallenge(challenge)}>
                Acessar Desafio <IoIosArrowForward />
              </AccessButton>
              {showApproveButton && (
                <ApproveButton onClick={() => handleApprove(challenge.id)}>
                  Aprovar
                </ApproveButton>
              )}
            </ButtonContainer>
          </ChallengeCard>
        ))}
      </GridContainer>
    </SectionContainer>
  );
};

export default ChallengesGrid;