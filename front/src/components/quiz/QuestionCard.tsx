import React from 'react';
import styled from 'styled-components';
import { FaRegLightbulb } from 'react-icons/fa';

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

const HintButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
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
      <HintButton>DICA <FaRegLightbulb /></HintButton>
      <Title>Pergunta {questionNumber}</Title>
      <QuestionText>{questionText}</QuestionText>
    </CardContainer>
  );
};

export default QuestionCard;