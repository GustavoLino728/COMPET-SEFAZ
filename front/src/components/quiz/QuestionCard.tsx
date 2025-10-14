import React from 'react';
import styled from 'styled-components';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
}

const CardContainer = styled.div`
  background-color: #2f3a7d;
  color: #fff;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
`;

const QuestionNumberCircle = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #6c63ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  border: 4px solid #f8f9fa;
`;


const Title = styled.h2`
  margin: 1rem 0;
  font-size: 1.8rem;
`;

const QuestionText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 300;
`;

const QuestionCard: React.FC<QuestionCardProps> = ({ questionNumber, questionText }) => {
  return (
    <CardContainer>
      <QuestionNumberCircle>{questionNumber}</QuestionNumberCircle>
      <Title>Pergunta {questionNumber}</Title>
      <QuestionText>{questionText}</QuestionText>
    </CardContainer>
  );
};

export default QuestionCard;