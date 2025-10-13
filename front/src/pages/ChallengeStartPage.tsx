import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import ChallengeHero from '../components/user/ChallengeHero';
import StartInstructions from '../components/user/StartInstructions';
import { fetchChallenge } from '../api';
import { BackendChallenge } from '../types';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: #6c757d;
  
  .loading-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  h3 {
    color: #495057;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  
  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #dc3545;
  }
  
  h3 {
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  p {
    color: #6c757d;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  button {
    background-color: #495057;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #343a40;
    }
  }
`;

const ChallengeStartPage: React.FC = () => {
  const [challengeData, setChallengeData] = useState<BackendChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { id: challengeId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadChallengeData = async () => {
      if (!challengeId) {
        setError('ID do desafio não encontrado na URL');
        setLoading(false);
        return;
      }

      try {
        console.log(`🔄 Carregando dados do desafio ${challengeId}...`);
        
        const challenge = await fetchChallenge(parseInt(challengeId));
        
        if (challenge.status !== 'APPROVED') {
          setError('Este desafio não está aprovado para uso.');
          setLoading(false);
          return;
        }
        setChallengeData(challenge);
        
      } catch (err: any) {
        console.error('❌ Erro ao carregar desafio:', err);
        if (err.response?.status === 404) {
          setError('Desafio não encontrado.');
        } else {
          setError('Erro ao carregar dados do desafio. Verifique sua conexão.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadChallengeData();
  }, [challengeId]);

  const getDifficultyText = (difficulty: string): string => {
    const difficultyMap: Record<string, string> = {
      'EASY': 'BÁSICO',
      'MEDIUM': 'INTERMEDIÁRIO',
      'HARD': 'AVANÇADO'
    };
    return difficultyMap[difficulty] || difficulty;
  };

  const getTotalQuestions = (challenge: BackendChallenge): number => {
    return (
      (challenge.multiple_choice_questions?.length || 0) +
      (challenge.discursive_questions?.length || 0) +
      (challenge.problem_questions?.length || 0)
    );
  };

  const generateDescription = (challenge: BackendChallenge): string => {
    const questionTypes = [];
    if (challenge.multiple_choice_questions?.length > 0) {
      questionTypes.push(`${challenge.multiple_choice_questions.length} questões de múltipla escolha`);
    }
    if (challenge.discursive_questions?.length > 0) {
      questionTypes.push(`${challenge.discursive_questions.length} questões dissertativas`);
    }
    if (challenge.problem_questions?.length > 0) {
      questionTypes.push(`${challenge.problem_questions.length} questões de cálculo`);
    }

    const baseDescription = `Você será apresentado a situações práticas envolvendo ${challenge.program_name}. `;
    const questionDescription = questionTypes.length > 0 
      ? `Este desafio contém ${questionTypes.join(', ')}.`
      : 'Aplique os conceitos aprendidos para resolver os problemas apresentados.';
    
    return baseDescription + questionDescription;
  };

  if (loading) {
    return (
      <PageWrapper>
        <UserHeader />
        <LoadingContainer>
          <div className="loading-icon">📋</div>
          <h3>Carregando desafio...</h3>
          <p>Buscando informações do desafio selecionado</p>
        </LoadingContainer>
      </PageWrapper>
    );
  }

  if (error || !challengeData) {
    return (
      <PageWrapper>
        <UserHeader />
        <ErrorContainer>
          <div className="error-icon">⚠️</div>
          <h3>Erro ao carregar desafio</h3>
          <p>{error || 'Desafio não encontrado ou indisponível'}</p>
          <button onClick={() => navigate('/desafios')}>
            Voltar aos desafios
          </button>
        </ErrorContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ChallengeHero 
        title={`DESAFIO ${challengeData.id} (${getDifficultyText(challengeData.difficulty)})`}
        subtitle={`${challengeData.program_name} - ${challengeData.track_name}`}
      />
      <StartInstructions 
        description={generateDescription(challengeData)}
        questionCount={getTotalQuestions(challengeData)}
      />
    </PageWrapper>
  );
};

export default ChallengeStartPage;