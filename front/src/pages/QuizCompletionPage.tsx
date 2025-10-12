import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck} from 'react-icons/fa';
import { completeChallengeAndEarnBadge, fetchChallenge } from '../api';

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CompletionCard = styled.div`
  background-color: #2f3a7d;
  color: #fff;
  border-radius: 20px;
  padding: 3rem 4rem;
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 700px;
`;

const BadgeToast = styled.div<{ isVisible: boolean; isClosing: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  z-index: 1000;
  max-width: 380px;
  width: calc(100% - 40px);
  
  animation: ${props => 
    props.isClosing ? slideOutRight : slideInRight
  } 0.4s ease-out forwards;
  
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
    max-width: none;
  }
`;

const BadgeToastIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
`;

const BadgeToastImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
`;

const BadgeToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const BadgeToastTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 700;
`;

const BadgeToastSubtitle = styled.p`
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BadgeToastType = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const IconCircle = styled.div`
  position: absolute; top: -30px; left: 50%;
  transform: translateX(-50%); width: 60px; height: 60px;
  border-radius: 50%; background-color: #6c63ff;
  display: flex; align-items: center; justify-content: center;
  border: 4px solid #f8f9fa;
`;

const Title = styled.h1` 
  margin: 1.5rem 0 0.5rem 0; 
  font-size: 2.5rem; 
`;

const Subtitle = styled.p` 
  margin: 0; 
  font-size: 1.2rem; 
  color: #e0d8ff; 
`;

const NextButton = styled.button`
  background-color: #495057; color: #fff; border: none;
  padding: 0.9rem 2.5rem; font-size: 1rem; font-weight: 600;
  border-radius: 6px; cursor: pointer; margin-top: 3rem;
  transition: background-color 0.2s;
  &:hover { background-color: #343a40; }
`;

const LoadingText = styled.p`
  color: #6c757d;
  font-size: 1rem;
  margin: 1rem 0;
`;

const ErrorContainer = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  text-align: center;
  max-width: 500px;
  margin: 1rem 0;

  h3 {
    color: #721c24;
    margin-top: 0;
  }
`;

// Interface para os dados recebidos via state ou params
interface QuizResults {
  challengeId: number;
  score: number;
  completionTime?: number;
  totalQuestions?: number;
  correctAnswers?: number;
}

const QuizCompletionPage: React.FC = () => {
  const [badgeEarned, setBadgeEarned] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [challengeData, setChallengeData] = useState<any>(null);

  const { id: challengeId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const quizResults = location.state as QuizResults | null;

  const difficultyMap: Record<string, 'EASY' | 'MEDIUM' | 'HARD'> = {
    'EASY': 'EASY',
    'MEDIUM': 'MEDIUM', 
    'HARD': 'HARD'
  };

  const programMap: Record<string, 'PROIND' | 'PRODEPE' | 'PRODEAUTO'> = {
    'PROIND': 'PROIND',
    'PRODEPE': 'PRODEPE',
    'PRODEAUTO': 'PRODEAUTO'
  };

  useEffect(() => {
    const processCompletion = async () => {
      if (!challengeId) {
        setError('ID do desafio não encontrado');
        setLoading(false);
        return;
      }

      try {
        console.log('🔄 Processando conclusão do desafio...', challengeId);

        const challenge = await fetchChallenge(parseInt(challengeId));
        setChallengeData(challenge);

        const finalScore = quizResults?.score || 75;
        const completionTime = quizResults?.completionTime || 300;

        const trailMatch = challenge.track_name?.match(/(\d+)/);
        const trailNumber = trailMatch ? parseInt(trailMatch[1]) : 1;

        const mappedProgram = programMap[challenge.program_name];
        const mappedDifficulty = difficultyMap[challenge.difficulty];

        console.log('📋 Dados para badge:', {
          program: mappedProgram,
          trail_number: trailNumber,
          difficulty: mappedDifficulty,
          score: finalScore,
          challenge_id: parseInt(challengeId),
          completion_time_seconds: completionTime
        });

        const result = await completeChallengeAndEarnBadge({
          program: mappedProgram,
          trail_number: trailNumber,
          difficulty: mappedDifficulty,
          score: finalScore,
          challenge_id: parseInt(challengeId),
          completion_time_seconds: completionTime
        });
        
        console.log('✅ Resultado da conclusão:', result);
        
        if (result.badge_earned) {
          setBadgeEarned(result.badge_earned);
          setShowToast(true);
          console.log('🏆 Badge conquistado!', result.badge_earned);
          
          setTimeout(() => {
            handleCloseToast();
          }, 8000);
        }
      } catch (err: any) {
        console.error('❌ Erro ao processar conclusão:', err);
        setError('Erro ao processar resultado do desafio. O desafio foi salvo, mas pode não ter gerado badge.');
      } finally {
        setLoading(false);
      }
    };

    setTimeout(processCompletion, 1000);
  }, [challengeId, quizResults]);

  const handleCloseToast = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowToast(false);
      setIsClosing(false);
    }, 400);
  };

  const getDifficultyText = (difficulty: string): string => {
    const textMap: Record<string, string> = {
      'EASY': 'Básico',
      'MEDIUM': 'Intermediário',
      'HARD': 'Avançado'
    };
    return textMap[difficulty] || difficulty;
  };

  const getBackLink = (): string => {
    if (!challengeData) return '/desafios';
    
    const program = challengeData.program_name?.toLowerCase();
    return `/trilhas/${program || 'proind'}`;
  };

  return (
    <PageWrapper>
      <CompletionCard>
        <IconCircle><FaCheck size={24} /></IconCircle>
        <Title>
          Parabéns, você concluiu o {challengeData?.title || 'desafio'} com sucesso!
        </Title>
        <Subtitle>
          {challengeData?.program_name} - {challengeData?.track_name}
        </Subtitle>
        {challengeData && (
          <Subtitle style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
            Nível: {getDifficultyText(challengeData.difficulty)}
          </Subtitle>
        )}
        {quizResults?.score && (
          <Subtitle style={{ marginTop: '1rem', fontSize: '1rem' }}>
            Score: {quizResults.score.toFixed(1)}%
          </Subtitle>
        )}
      </CompletionCard>

      {loading && (
        <LoadingText>🔄 Processando resultado e verificando badges...</LoadingText>
      )}

      {error && (
        <ErrorContainer>
          <h3>⚠️ Atenção</h3>
          <p>{error}</p>
        </ErrorContainer>
      )}

      {/* Toast de Badge */}
      <BadgeToast isVisible={showToast} isClosing={isClosing}>
        <CloseButton onClick={handleCloseToast}>
          ✕
        </CloseButton>
        
        {badgeEarned?.image_url ? (
          <BadgeToastImage 
            src={badgeEarned.image_url} 
            alt={badgeEarned.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <BadgeToastIcon>
            🏆
          </BadgeToastIcon>
        )}
        
        <BadgeToastContent>
          <BadgeToastTitle>🎉 Nova Badge!</BadgeToastTitle>
          <BadgeToastSubtitle>{badgeEarned?.name}</BadgeToastSubtitle>
          <BadgeToastType>{badgeEarned?.type}</BadgeToastType>
        </BadgeToastContent>
      </BadgeToast>

      {!loading && !badgeEarned && !error && (
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px',
          textAlign: 'center',
          color: '#6c757d',
          maxWidth: '400px',
          margin: '1rem 0'
        }}>
          <p>✅ Desafio registrado com sucesso!</p>
          <p>Continue praticando para conquistar mais badges!</p>
        </div>
      )}

      <Link to={getBackLink()}>
        <NextButton>Voltar para trilha</NextButton>
      </Link>
    </PageWrapper>
  );
};

export default QuizCompletionPage;