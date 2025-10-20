import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const BadgeSection = styled.div<{ isVisible: boolean }>`
  background: linear-gradient(135deg, #ffffff, #f8f9ff);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(108, 99, 255, 0.15);
  border: 1px solid rgba(108, 99, 255, 0.1);
  position: relative;
  overflow: hidden;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? slideInUp : 'none')} 0.6s ease-out;
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(30px)')};
  transition: all 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #2f3a7d;
    border-radius: 20px 20px 0 0;
  }
`;

const BadgeSectionTitle = styled.h2`
  color: #2f3a7d;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  position: relative;

  &::after {
    content: '🎉';
    position: absolute;
    right: -2rem;
    top: -0.2rem;
    font-size: 1.5rem;
  }
`;

const BadgeDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const BadgeImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const BadgeImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #6c63ff;
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  background: white;
  padding: 8px;
`;

const BadgeIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c63ff, #28a745);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  border: 4px solid white;
`;

const BadgeInfo = styled.div`
  flex: 1;
  text-align: left;
  min-width: 250px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const BadgeName = styled.h3`
  color: #2f3a7d;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const BadgeDescription = styled.p`
  color: #495057;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const BadgeType = styled.span`
  background: #2f3a7d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
`;

export interface Badge {
  name: string;
  description?: string;
  image_url?: string;
  type?: string;
}

interface BadgeDisplayProps {
  badge: Badge;
  isVisible?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, isVisible = true }) => {
  return (
    <BadgeSection isVisible={isVisible}>
      <BadgeSectionTitle>Nova Insígnia Obtida!</BadgeSectionTitle>

      <BadgeDisplayWrapper>
        <BadgeImageContainer>
          {badge.image_url ? (
            <BadgeImage
              src={badge.image_url}
              alt={badge.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <BadgeIcon>🏆</BadgeIcon>
          )}
        </BadgeImageContainer>

        <BadgeInfo>
          <BadgeName>{badge.name}</BadgeName>
          <BadgeDescription>{badge.description || 'Parabéns por completar este desafio!'}</BadgeDescription>
          {badge.type && <BadgeType>{badge.type}</BadgeType>}
        </BadgeInfo>
      </BadgeDisplayWrapper>
    </BadgeSection>
  );
};

export default BadgeDisplay;