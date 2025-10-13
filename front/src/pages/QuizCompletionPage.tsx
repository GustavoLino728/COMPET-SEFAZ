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

const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
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

const BadgeSection = styled.div<{ isVisible: boolean }>`
  background: linear-gradient(135deg, #ffffff, #f8f9ff);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(108, 99, 255, 0.15);
  border: 1px solid rgba(108, 99, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? slideInUp : 'none'} 0.6s ease-out;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #2f3a7d;
    border-radius: 20px 20px 0 0;
  }
`;

const BadgeSectionTitle = styled.h2`
  color: #2f3a7d;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  position: relative;
  
  &::after {
    content: '🎉';
    position: absolute;
    right: -2rem;
    top: -0.2rem;
    font-size: 1.5rem;
  }
`;

const BadgeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const BadgeImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const BadgeImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #6c63ff;
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  background: white;
  padding: 8px;
`;

const BadgeIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c63ff, #28a745);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  border: 4px solid white;
`;

const BadgeInfo = styled.div`
  flex: 1;
  text-align: left;
  min-width: 250px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const BadgeName = styled.h3`
  color: #2f3a7d;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const BadgeDescription = styled.p`
  color: #495057;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const BadgeType = styled.span`
  background: #2f3a7d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
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
  const [showBadgeSection, setShowBadgeSection] = useState(false);
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

        const challenge = await fetchChallenge(parseInt(challengeId));
        setChallengeData(challenge);

        const finalScore = quizResults?.score || 75;
        const completionTime = quizResults?.completionTime || 300;

        const trailMatch = challenge.track_name?.match(/(\d+)/);
        const trailNumber = trailMatch ? parseInt(trailMatch[1]) : 1;

        const mappedProgram = programMap[challenge.program_name];
        const mappedDifficulty = difficultyMap[challenge.difficulty];

        const result = await completeChallengeAndEarnBadge({
          program: mappedProgram,
          trail_number: trailNumber,
          difficulty: mappedDifficulty,
          score: finalScore,
          challenge_id: parseInt(challengeId),
          completion_time_seconds: completionTime
        });
        
        if (result.badge_earned) {
          setBadgeEarned(result.badge_earned);
          setShowToast(true);
          
          setTimeout(() => {
            setShowBadgeSection(true);
          }, 1000);
          
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

      {badgeEarned && (
        <BadgeSection isVisible={showBadgeSection}>
          <BadgeSectionTitle>Nova Insígnia Obtida!</BadgeSectionTitle>
          
          <BadgeDisplay>
            <BadgeImageContainer>
              {badgeEarned.image_url ? (
                <BadgeImage 
                  src={badgeEarned.image_url} 
                  alt={badgeEarned.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <BadgeIcon>
                  🏆
                </BadgeIcon>
              )}
            </BadgeImageContainer>
            
            <BadgeInfo>
              <BadgeName>{badgeEarned.name}</BadgeName>
              <BadgeDescription>
                {badgeEarned.description || 'Parabéns por completar este desafio com sucesso!'}
              </BadgeDescription>
              <BadgeType>{badgeEarned.type}</BadgeType>
            </BadgeInfo>
          </BadgeDisplay>
        </BadgeSection>
      )}

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