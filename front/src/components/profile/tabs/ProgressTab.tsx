import React from 'react';
import styled from 'styled-components';

const TabWrapper = styled.div`
  h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  p { color: #6c757d; margin-top: 0; }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;
const StatCard = styled.div`
  background-color: #eef2ff;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  p { font-size: 1.8rem; font-weight: 700; color: #5e60ce; margin: 0; }
  span { font-weight: 500; color: #495057; }
`;

const ProgressTab: React.FC = () => {
  return (
    <TabWrapper>
      <h2>Meu progresso</h2>
      <p>Continue aprendendo novas trilhas e treinando seus conhecimentos!</p>
      <CardsContainer>
        <StatCard><p>1</p><span>Trilhas concluídas</span></StatCard>
        <StatCard><p>2</p><span>Desafios feitos</span></StatCard>
        <StatCard><p>1</p><span>Certificados obtidos</span></StatCard>
      </CardsContainer>
    </TabWrapper>
  );
};
export default ProgressTab;