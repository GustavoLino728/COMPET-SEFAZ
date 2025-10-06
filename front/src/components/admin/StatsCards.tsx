import React from 'react';
import styled from 'styled-components';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface StatInfo {
  title: string;
  value: number;
  link: string;
}

const statsData: StatInfo[] = [
  { title: 'Desafios Gerados', value: 9, link: '/admin' },
  { title: 'Desafios Aprovados', value: 5, link: '/admin/aprovados' },
  { title: 'Desafios Editados', value: 16, link: '#' },
];

interface StatsCardsProps {
  activeStat: string;
}

interface CardProps {
  primary?: boolean;
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const StatsCards: React.FC<StatsCardsProps> = ({ activeStat }) => {
  return (
    <CardsContainer>
      {statsData.map(stat => (
        <CardLink to={stat.link} key={stat.title}>
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