import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { fetchChallenge, deleteChallenge } from '../../api';

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
  onDelete?: (challengeId: number) => void;
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
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    &:hover { background-color: #6c757d; }
  }
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

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  &:hover { background-color: #c82333; }
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
  onApprove,
  onDelete
}) => {
  const navigate = useNavigate();
  const [loadingChallenge, setLoadingChallenge] = useState<number | null>(null);

  const handleAccessChallenge = async (challenge: Challenge) => {
    setLoadingChallenge(challenge.id);
    try {
      // Buscar dados completos do desafio
      const fullChallengeData = await fetchChallenge(challenge.id);
      // Navegar para a página de detalhes do desafio com dados completos
      navigate('/admin/desafio-gerado', { 
        state: { challenge: fullChallengeData } 
      });
    } catch (error) {
      console.error('Erro ao carregar dados do desafio:', error);
      alert('Erro ao carregar dados do desafio. Tente novamente.');
    } finally {
      setLoadingChallenge(null);
    }
  };

  const handleApprove = (challengeId: number) => {
    if (onApprove) {
      onApprove(challengeId);
    }
  };

  const handleDelete = (challengeId: number) => {
    if (onDelete) {
      onDelete(challengeId);
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
              <AccessButton 
                onClick={() => handleAccessChallenge(challenge)}
                disabled={loadingChallenge === challenge.id}
              >
                {loadingChallenge === challenge.id ? 'Carregando...' : 'Acessar Desafio'} 
                {loadingChallenge !== challenge.id && <IoIosArrowForward />}
              </AccessButton>
              <DeleteButton onClick={() => handleDelete(challenge.id)}>
                Excluir
              </DeleteButton>
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