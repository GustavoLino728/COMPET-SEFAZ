import React from 'react';
import styled from 'styled-components';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface StatInfo {
  title: string;
  value: number;
  link: string;
  isActive?: boolean;
}

interface StatsCardsProps {
  activeStat: string;
  pendingCount?: number;
  approvedCount?: number;
}

interface CardProps {
  primary?: boolean;
}

const CardsContainer = styled.div<{ activeCardsCount: number }>`
  display: grid;
  grid-template-columns: ${props => 
    props.activeCardsCount === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
  };
  gap: 1.5rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const CardLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div<CardProps>`
  background-color: ${props => props.primary ? '#7e6be9' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#333'};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-in-out;
  &:hover { transform: translateY(-5px); }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    h3 {
      margin: 0; font-size: 1rem; font-weight: 500;
      color: ${props => props.primary ? '#e0d8ff' : '#888'};
    }
    svg { color: ${props => props.primary ? '#e0d8ff' : '#aaa'}; }
  }
  p { margin: 0; font-size: 2rem; font-weight: 600; }
`;

const StatsCards: React.FC<StatsCardsProps> = ({ 
  activeStat, 
  pendingCount = 0, 
  approvedCount = 0 
}) => {
  // Dados dos cards - "Desafios Editados" comentado mas mantido para layout
  const statsData: StatInfo[] = [
    { 
      title: 'Desafios Gerados', 
      value: pendingCount, 
      link: '/admin',
      isActive: true
    },
    { 
      title: 'Desafios Aprovados', 
      value: approvedCount, 
      link: '/admin/aprovados',
      isActive: true
    },
    // Comentado mas mantido para não quebrar o layout
    { 
      title: 'Desafios Editados', 
      value: 0, 
      link: '#',
      isActive: false // Não ativo, mas ainda renderiza
    },
  ];

  // Filtra apenas os cards ativos para contagem
  const activeCards = statsData.filter(stat => stat.isActive);
  const activeCardsCount = activeCards.length;

  return (
    <CardsContainer activeCardsCount={activeCardsCount}>
      {statsData.map(stat => (
        <CardLink 
          to={stat.link} 
          key={stat.title}
          style={{ 
            display: stat.isActive ? 'block' : 'none' // Esconde o card comentado
          }}
        >
          <Card primary={stat.title === activeStat}>
            <header>
              <h3>{stat.title}</h3>
              <IoIosInformationCircleOutline size={20}/>
            </header>
            <p>{stat.value} Desafios</p>
          </Card>
        </CardLink>
      ))}
    </CardsContainer>
  );
}

export default StatsCards;