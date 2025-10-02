import React from 'react';
import styled from 'styled-components';
// Importe a imagem que você salvou
// import backgroundImage from '../../assets/hero-background.jpg';

interface HeroProps {
  title: string;
  subtitle: string;
}

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 40, 90, 0.7); // Overlay azul escuro
    z-index: 1;
  }
`;

const TextContent = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  letter-spacing: 1.5px;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1.2rem;
  font-weight: 300;
`;

const ChallengeHero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <HeroContainer>
      <TextContent>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContent>
    </HeroContainer>
  );
};

export default ChallengeHero;