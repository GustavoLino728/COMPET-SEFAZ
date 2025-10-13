import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const FeedbackBanner = styled.div<{ passed: boolean }>`
  background-color: #1e3a8a;
  width: 100%;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  border-radius: 0 0 20px 20px;
`;

const StatusIcon = styled.div<{ passed: boolean }>`
  width: 60px;
  height: 60px;
  background-color: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 24px;
  color: white;
`;

const BannerTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  line-height: 1.3;
`;

const BannerSubtitle = styled.p`
  font-size: 1rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const QuestionsSection = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const QuestionItem = styled.div`
  margin-bottom: 2rem;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const QuestionNumber = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-right: 0.5rem;
`;

const FeedbackText = styled.span<{ isCorrect: boolean }>`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.isCorrect ? '#059669' : '#dc2626'};
  margin-left: 0.5rem;
`;

const QuestionText = styled.p`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
  margin: 0;
`;

const ReturnButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 2rem auto;
  display: block;
  
  &:hover {
    background-color: #1e40af;
  }
`;

const CertificateResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { score, passed, correctAnswers, totalQuestions, answers, questions, program, track } = location.state || {};

  if (!location.state) {
    return (
      <ResultContainer>
        <FeedbackBanner passed={false}>
          <StatusIcon passed={false}>⚠️</StatusIcon>
          <BannerTitle>Erro</BannerTitle>
          <BannerSubtitle>Dados do resultado não encontrados.</BannerSubtitle>
          <ReturnButton onClick={() => navigate('/certificados')}>
            Voltar para a Certificações
          </ReturnButton>
        </FeedbackBanner>
      </ResultContainer>
    );
  }

  const getFeedbackMessage = () => {
    if (passed) {
      return {
        title: `Parabéns! Você atingiu a média necessária para o teste de certificação da ${program?.toUpperCase() || 'PROIND'}`,
        subtitle: "Você pode baixar seu certificado e continuar sua jornada de aprendizado!"
      };
    } else {
      return {
        title: `Infelizmente você não atingiu a média necessária para o teste de certificação`,
        subtitle: "Mas não se preocupe! Você pode tentar novamente depois."
      };
    }
  };

  const feedback = getFeedbackMessage();

  const handleReturnToTrack = () => {
    navigate('/certificados');
  };

  return (
    <ResultContainer>
      <FeedbackBanner passed={passed}>
        <StatusIcon passed={passed}>
          {passed ? '✓' : '⚠️'}
        </StatusIcon>
        <BannerTitle>{feedback.title}</BannerTitle>
        <BannerSubtitle>{feedback.subtitle}</BannerSubtitle>
        <ScoreDisplay>{correctAnswers}/{totalQuestions} acertos</ScoreDisplay>
      </FeedbackBanner>

      <QuestionsSection>
        {questions && answers && questions.map((question: any, index: number) => {
          const userAnswer = answers.find((a: any) => a.question_id === question.id);
          const isCorrect = userAnswer?.is_correct || false;
          
          return (
            <QuestionItem key={question.id}>
              <QuestionHeader>
                <QuestionNumber>{index + 1}. Questão</QuestionNumber>
                <FeedbackText isCorrect={isCorrect}>
                  {isCorrect ? 'Você acertou!' : 'Você errou!'}
                </FeedbackText>
              </QuestionHeader>
              <QuestionText>{question.statement}</QuestionText>
            </QuestionItem>
          );
        })}
      </QuestionsSection>

      <ReturnButton onClick={handleReturnToTrack}>
        Voltar para Certificações
      </ReturnButton>
    </ResultContainer>
  );
};

export default CertificateResultPage;
