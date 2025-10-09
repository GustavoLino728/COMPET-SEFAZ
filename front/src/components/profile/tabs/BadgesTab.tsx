import React from 'react';
import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';

// Imagem de exemplo para a insígnia, coloque em src/assets
// import badgeIcon from '../../../assets/badge-icon.png';

const TabWrapper = styled.div`
  h2 { font-size: 1.5rem; margin-bottom: 2rem; }
`;
const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;
const Badge = styled.div`
  text-align: center;
  img {
    width: 100px;
    height: auto;
    margin-bottom: 0.5rem;
  }
  p { margin: 0; font-weight: 500; font-size: 0.9rem; }
`;
const RecentContainer = styled.div`
  h3 { font-size: 1.2rem; margin-bottom: 1.5rem; }
  text-align: center;
`;
const FeaturedBadge = styled.div`
  display: inline-block;
  text-align: center;
  img {
    width: 150px;
    height: auto;
    margin-bottom: 1rem;
  }
  p { margin: 0 0 0.5rem 0; font-weight: 600; }
  span { font-size: 0.9rem; color: #6c757d; }
`;
const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2f3a7d;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
`;

// Cria um array para simular as insígnias
const allBadges = Array(11).fill(null);

const BadgesTab: React.FC = () => {
  return (
    <TabWrapper>
      <h2>Insígnias</h2>
      <BadgesGrid>
        {allBadges.map((_, index) => (
          <Badge key={index}>
            {/* <img src={badgeIcon} alt="Insígnia" /> */}
            <p>Especialista em Incentivos</p>
          </Badge>
        ))}
      </BadgesGrid>
      
      <RecentContainer>
        <h3>Conquista recente</h3>
        <FeaturedBadge>
            {/* <img src={badgeIcon} alt="Insígnia" /> */}
            <p>Especialista em Incentivos</p>
            <span>Trilha 1: PROIND</span>
        </FeaturedBadge>
        <div>
            <ShareButton><FaLinkedin /> Compartilhar no LinkedIn</ShareButton>
        </div>
      </RecentContainer>
    </TabWrapper>
  );
};
export default BadgesTab;