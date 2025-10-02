import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { quizDesafio1 } from '../challenges/quizData';
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

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { id: challengeId } = useParams();

  const currentQuestion = quizDesafio1[currentQuestionIndex];
  
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
    } else {
      setIsCorrect(true); // Para discursivas, apenas mostramos a justificativa
    }
    setIsAnswered(true);
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
      const newIndex = direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
      
      if (newIndex >= 0 && newIndex < quizDesafio1.length) {
          setCurrentQuestionIndex(newIndex);
          setSelectedAnswer(null);
          setEssayAnswer('');
          setIsAnswered(false);
          setIsCorrect(null);
      } else if (newIndex === quizDesafio1.length) {
          navigate(`/quiz/resultado/${challengeId}`);
      }
  };

  return (
    <QuizContainer>
      <Logo>fiscolab</Logo>
      <QuizProgress
        totalSteps={quizDesafio1.length}
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
            {currentQuestionIndex === quizDesafio1.length - 1 ? 'Finalizar Quiz' : 'Próxima pergunta'}
          </PrimaryNavButton>
        </NavigationContainer>
      )}
    </QuizContainer>
  );
};

export default QuizPage;