import React from 'react';
import styled from 'styled-components';

interface ProgressProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Step = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${props => (props.isActive || props.isCompleted ? '#fff' : '#6c757d')};
  background-color: ${props => (props.isActive ? '#3b4a9f' : props.isCompleted ? '#5e60ce' : '#e9ecef')};
  border: 2px solid ${props => (props.isActive ? '#3b4a9f' : '#e9ecef')};
`;

const QuizProgress: React.FC<ProgressProps> = ({ totalSteps, currentStep }) => {
  return (
    <ProgressContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <Step
          key={index}
          isActive={index + 1 === currentStep}
          isCompleted={index + 1 < currentStep}
        >
          {index + 1}
        </Step>
      ))}
    </ProgressContainer>
  );
};

export default QuizProgress;