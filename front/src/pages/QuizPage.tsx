import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchChallenge, transformQuestionsForQuiz } from '../api';
import { QuizQuestion } from '../types';
import QuizProgress from '../components/quiz/QuizProgress';
import QuestionCard from '../components/quiz/QuestionCard';
import AnswerOptions from '../components/quiz/AnswerOptions';
import EssayAnswer from '../components/quiz/EssayAnswer';

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #212529;
  position: absolute;
  top: 2rem;
  left: 3rem;
`;

const QuizContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem 4rem 2rem;
  position: relative;
`;

const FeedbackCard = styled.div<{ isCorrect: boolean }>`
  background: #fff;
  border: 1px solid #e9ecef;
  border-left: 5px solid ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  text-align: left;
  h3 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  }
  p {
    margin: 0;
    color: #495057;
  }
`;

const ActionButton = styled.button`
  background-color: #495057;
  color: #fff;
  border: none;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.2s;
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  background-color: #fff;
  color: #495057;
  border: 1px solid #dee2e6;
  padding: 0.9rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background-color: #f1f3f5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const PrimaryNavButton = styled(NavButton)`
    background-color: #495057;
    color: #fff;
    border-color: #495057;
    &:hover { background-color: #343a40; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: #6c757d;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: #dc3545;
  max-width: 600px;
  
  h3 {
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  p {
    color: #6c757d;
    margin-bottom: 2rem;
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

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { id: challengeId } = useParams();

  useEffect(() => {
    const loadChallenge = async () => {
      if (!challengeId) {
        setError('ID do desafio não encontrado na URL');
        setLoading(false);
        return;
      }
      
      try {
        const challenge = await fetchChallenge(parseInt(challengeId));
        
        if (challenge.status !== 'APPROVED') {
          setError('Este desafio não está aprovado para uso.');
          setLoading(false);
          return;
        }
        
        const questions = transformQuestionsForQuiz(challenge);
        
        if (questions.length === 0) {
          setError('Este desafio não possui questões disponíveis.');
          setLoading(false);
          return;
        }
        
        setQuizData(questions);
      } catch (error: any) {
        console.error('❌ Erro ao carregar desafio:', error);
        if (error.response?.status === 404) {
          setError('Desafio não encontrado.');
        } else {
          setError('Erro ao carregar desafio. Verifique sua conexão.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId]);

  const currentQuestion = quizData[currentQuestionIndex];

    if (loading) {
    return (
      <QuizContainer>
        <LoadingContainer>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <h3>Carregando desafio...</h3>
          <p>Aguarde enquanto buscamos as questões</p>
        </LoadingContainer>
      </QuizContainer>
    );
  }

  if (error || quizData.length === 0) {
    return (
      <QuizContainer>
        <ErrorContainer>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3>Erro ao carregar desafio</h3>
          <p>{error || 'Desafio não encontrado ou sem questões disponíveis'}</p>
          <button onClick={() => navigate('/desafios')}>
            Voltar aos desafios
          </button>
        </ErrorContainer>
      </QuizContainer>
    );
  }

  if (!currentQuestion) {
    return (
      <QuizContainer>
        <ErrorContainer>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h3>Questão não encontrada</h3>
          <p>Índice da questão inválido</p>
          <button onClick={() => navigate('/desafios')}>
            Voltar aos desafios
          </button>
        </ErrorContainer>
      </QuizContainer>
    );
  }
  
  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };
  
  const handleConfirmAnswer = () => {
    if (currentQuestion.type === 'multiple-choice') {
      if (selectedAnswer === null) return;
      const correct = selectedAnswer === currentQuestion.correctAnswerIndex;
      setIsCorrect(correct);
    } else if (currentQuestion.type === 'problem') {
      if (essayAnswer.trim() === '') return;
      
      const userAnswer = parseFloat(essayAnswer.replace(',', '.'));
      const correctAnswer = currentQuestion.correctAnswer || 0;
      
      const tolerance = 0.01;
      const correct = Math.abs(userAnswer - correctAnswer) <= tolerance;
      
      setIsCorrect(correct);
    } else {
      setIsCorrect(true);
    }
    setIsAnswered(true);
  };

  {currentQuestion.type === 'multiple-choice' ? (
    <AnswerOptions
      options={currentQuestion.options!}
      selectedAnswer={selectedAnswer}
      onSelectAnswer={handleSelectAnswer}
      isAnswered={isAnswered}
      correctAnswerIndex={currentQuestion.correctAnswerIndex!}
    />
  ) : (
    <EssayAnswer
      userAnswer={essayAnswer}
      setUserAnswer={setEssayAnswer}
      isAnswered={isAnswered}
    />
  )}

  {isAnswered && (
    <FeedbackCard isCorrect={!!isCorrect}>
      <h3>
        {currentQuestion.type === 'multiple-choice' && (isCorrect ? '✅ Você acertou!' : '❌ Você errou!')}
        {currentQuestion.type === 'problem' && (isCorrect ? '✅ Resposta correta!' : '❌ Resposta incorreta!')}
        {currentQuestion.type === 'essay' && '📝 Justificativa'}
      </h3>
      <p>{currentQuestion.justification}</p>
      {/* Se quiser mostrar a resposta correta quando errar em cálculo */}
      {currentQuestion.type === 'problem' && !isCorrect && (
        <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
          Resposta correta: {currentQuestion.correctAnswer}
        </p>
      )}
    </FeedbackCard>
  )}

  
  const handleNavigation = (direction: 'next' | 'prev') => {
      const newIndex = direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
      
      if (newIndex >= 0 && newIndex < quizData.length) {
          setCurrentQuestionIndex(newIndex);
          setSelectedAnswer(null);
          setEssayAnswer('');
          setIsAnswered(false);
          setIsCorrect(null);
      } else if (newIndex === quizData.length) {
          navigate(`/quiz/resultado/${challengeId}`);
      }
  };

  if (loading) {
    return (
      <QuizContainer>
        <LoadingContainer>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <h3>Carregando desafio...</h3>
          <p>Aguarde enquanto buscamos as questões aprovadas</p>
        </LoadingContainer>
      </QuizContainer>
    );
  }

  if (error || quizData.length === 0) {
    return (
      <QuizContainer>
        <ErrorContainer>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3>Erro ao carregar desafio</h3>
          <p>{error || 'Desafio não encontrado ou sem questões disponíveis'}</p>
          <button onClick={() => navigate('/desafios')}>
            Voltar aos desafios
          </button>
        </ErrorContainer>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizProgress
        totalSteps={quizData.length}
        currentStep={currentQuestionIndex + 1}
      />
      
      <QuestionCard
        questionNumber={currentQuestionIndex + 1}
        questionText={currentQuestion.question}
      />
      
      {currentQuestion.type === 'multiple-choice' ? (
        <AnswerOptions
            options={currentQuestion.options!}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            isAnswered={isAnswered}
            correctAnswerIndex={currentQuestion.correctAnswerIndex!}
        />
      ) : (
        <EssayAnswer
            userAnswer={essayAnswer}
            setUserAnswer={setEssayAnswer}
            isAnswered={isAnswered}
        />
      )}
      
      {isAnswered && (
        <FeedbackCard isCorrect={!!isCorrect}>
            <h3>
                {currentQuestion.type === 'multiple-choice' && (isCorrect ? 'Você acertou!' : 'Você errou!')}
                {currentQuestion.type === 'essay' && 'Justificativa'}
            </h3>
            <p>{currentQuestion.justification}</p>
        </FeedbackCard>
      )}

      {!isAnswered ? (
        <ActionButton 
          onClick={handleConfirmAnswer}
          disabled={(currentQuestion.type === 'multiple-choice' && selectedAnswer === null) || (currentQuestion.type === 'essay' && essayAnswer.trim() === '')}
        >
          Confirmar resposta
        </ActionButton>
      ) : (
        <NavigationContainer>
          <NavButton 
            onClick={() => handleNavigation('prev')}
            disabled={currentQuestionIndex === 0}
          >
            Pergunta anterior
          </NavButton>
          <PrimaryNavButton onClick={() => handleNavigation('next')}>
            {currentQuestionIndex === quizData.length - 1 ? 'Finalizar Quiz' : 'Próxima pergunta'}
          </PrimaryNavButton>
        </NavigationContainer>
      )}
    </QuizContainer>
  );
};

export default QuizPage;