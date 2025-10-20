import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { completeChallengeAndEarnBadge, fetchChallenge } from '../api';
import BadgeEarnedHandler from '../components/badges/BadgeEarnedHandler';
import { Badge } from '../components/badges/BadgeDisplay';

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

const IconCircle = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #6c63ff;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: #495057;
  color: #fff;
  border: none;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 3rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #343a40;
  }
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
  const [badgeEarned, setBadgeEarned] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [challengeData, setChallengeData] = useState<any>(null);

  const { id: challengeId } = useParams<{ id: string }>();
  const location = useLocation();

  const quizResults = location.state as QuizResults | null;

  const difficultyMap: Record<string, 'EASY' | 'MEDIUM' | 'HARD'> = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD',
  };

  const programMap: Record<string, 'PROIND' | 'PRODEPE' | 'PRODEAUTO'> = {
    PROIND: 'PROIND',
    PRODEPE: 'PRODEPE',
    PRODEAUTO: 'PRODEAUTO',
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
          completion_time_seconds: completionTime,
        });

        if (result.badge_earned) {
          setBadgeEarned(result.badge_earned);
        }
      } catch (err: any) {
        console.error('❌ Erro ao processar conclusão:', err);
        setError(
          'Erro ao processar resultado do desafio. O desafio foi salvo, mas pode não ter gerado badge.'
        );
      } finally {
        setLoading(false);
      }
    };

    setTimeout(processCompletion, 1000);
  }, [challengeId, quizResults]);

  const getDifficultyText = (difficulty: string): string => {
    const textMap: Record<string, string> = {
      EASY: 'Básico',
      MEDIUM: 'Intermediário',
      HARD: 'Avançado',
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
        <IconCircle>
          <FaCheck size={24} />
        </IconCircle>
        <Title>
          Parabéns, você concluiu o {challengeData?.title || 'desafio'} com
          sucesso!
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
        <LoadingText>
          🔄 Processando resultado e verificando badges...
        </LoadingText>
      )}

      {error && (
        <ErrorContainer>
          <h3>⚠️ Atenção</h3>
          <p>{error}</p>
        </ErrorContainer>
      )}

      {/* Exibição de badge e toast unificados */}
      <BadgeEarnedHandler badge={badgeEarned} />

      {!loading && !badgeEarned && !error && (
        <div
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#6c757d',
            maxWidth: '400px',
            margin: '1rem 0',
          }}
        >
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