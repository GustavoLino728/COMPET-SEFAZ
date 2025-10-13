import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import DifficultySelector from '../components/user/DifficultySelector';
import ChallengeList from '../components/user/ChallengeList';
import { IoArrowBack } from 'react-icons/io5';

import { type Challenge } from '../types';
import { getChallengesByTrailAndDifficulty, parseTrailId } from '../api';

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

const TrailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProgramLogo = styled.div`
  background: #6c63ff;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
`;

const TrailInfo = styled.div`
  flex: 1;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #6c757d;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Title = styled.h1`
  margin: 0.25rem 0 0 0;
  font-size: 2rem;
  color: #212529;
`;

const TrailDescription = styled.p`
  color: #495057;
  margin: 1rem 0;
  line-height: 1.6;
  font-size: 1rem;
`;

const Question = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #495057;
  margin: 1.5rem 0 1rem 0;
`;

const LoadingContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e2e8;
  padding: 3rem 2rem;
  margin-top: 2rem;
  text-align: center;
  color: #6c757d;
`;

const ErrorContainer = styled.div`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
`;

const EmptyContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e2e8;
  padding: 3rem 2rem;
  margin-top: 2rem;
  text-align: center;
  color: #6c757d;
`;

const TrailChallengesPage: React.FC = () => {
  const [difficulty, setDifficulty] = useState('Básico');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trailInfo, setTrailInfo] = useState<{
    program: string;
    trailNumber: number;
    trailName: string;
  } | null>(null);

  const { trailId } = useParams<{ trailId: string }>();
  const navigate = useNavigate();

  const difficultyMap = {
    'Básico': 'EASY' as const,
    'Intermediário': 'MEDIUM' as const,  
    'Avançado': 'HARD' as const
  };

  // Carregar informações da trilha
  useEffect(() => {
    if (trailId) {
      try {
        const info = parseTrailId(trailId);
        setTrailInfo(info);
      } catch (err) {
        setError('ID da trilha inválido');
      }
    }
  }, [trailId]);

  const loadChallenges = async (selectedDifficulty: string) => {
    if (!trailId || !trailInfo) return;

    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔄 Carregando desafios para trilha ${trailId}, dificuldade: ${selectedDifficulty}`);
      
      const backendDifficulty = difficultyMap[selectedDifficulty as keyof typeof difficultyMap];
      const challengesList = await getChallengesByTrailAndDifficulty(trailId, backendDifficulty);
      
      console.log(`✅ ${challengesList.length} desafios carregados para ${trailInfo.program} - ${trailInfo.trailName}`);
      
      setChallenges(challengesList);
    } catch (err: any) {
      console.error('❌ Erro ao carregar desafios da trilha:', err);
      setError('Erro ao carregar desafios desta trilha. Tente novamente.');
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trailInfo) {
      loadChallenges(difficulty);
    }
  }, [difficulty, trailInfo]);

  const getTrailDescription = () => {
    if (!trailInfo) return '';
    
    const descriptions = {
      1: 'Aprenda os conceitos fundamentais e como calcular o incentivo corretamente.',
      2: 'Domine os procedimentos de lançamento e contabilização dos incentivos.',
      3: 'Entenda os controles adicionais e procedimentos suplementares necessários.',
      4: 'Compreenda todo o processo de concessão e aprovação dos incentivos.'
    };
    
    return descriptions[trailInfo.trailNumber as keyof typeof descriptions] || '';
  };

  if (error && !trailInfo) {
    return (
      <PageWrapper>
        <MainContainer>
          <ErrorContainer>
            <h3>❌ Trilha não encontrada</h3>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/desafios')}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#495057',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Voltar aos desafios
            </button>
          </ErrorContainer>
        </MainContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MainContainer>
        <BackButton onClick={() => navigate(`/trilhas/${trailInfo?.program.toLowerCase()}`)}>
          {IoArrowBack({ size: 20 }) as React.ReactElement}
        </BackButton>

        <ContentBox>
          {trailInfo && (
            <>
              <TrailHeader>
                <ProgramLogo>{trailInfo.program}</ProgramLogo>
                <TrailInfo>
                  <Subtitle>Trilha {trailInfo.trailNumber} • Desafios Práticos</Subtitle>
                  <Title>{trailInfo.trailName}</Title>
                </TrailInfo>
              </TrailHeader>

              <TrailDescription>
                {getTrailDescription()}
              </TrailDescription>

              <Question>Selecione o nível de dificuldade:</Question>
              <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
            </>
          )}
        </ContentBox>

        {loading && (
          <LoadingContainer>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <h3>Carregando desafios</h3>
            <p>Buscando desafios de {difficulty.toLowerCase()} para {trailInfo?.trailName}...</p>
          </LoadingContainer>
        )}

        {error && trailInfo && (
          <ErrorContainer>
            <h3>⚠️ Erro ao carregar</h3>
            <p>{error}</p>
            <button 
              onClick={() => loadChallenges(difficulty)}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#495057',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Tentar novamente
            </button>
          </ErrorContainer>
        )}

        {!loading && !error && challenges.length === 0 && trailInfo && (
          <EmptyContainer>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
            <h3>Nenhum desafio disponível</h3>
            <p>
              Não há desafios de nível {difficulty.toLowerCase()} para a trilha "{trailInfo.trailName}" no momento.
              <br />
              Tente outro nível de dificuldade.
            </p>
          </EmptyContainer>
        )}

        {!loading && !error && challenges.length > 0 && (
          <ChallengeList challenges={challenges} />
        )}
      </MainContainer>
    </PageWrapper>
  );
};

export default TrailChallengesPage;