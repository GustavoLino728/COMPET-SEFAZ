import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Badge } from './BadgeDisplay';

const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOutRight = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`;

const Toast = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  z-index: 1000;
  max-width: 380px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${(props) => (props.isClosing ? slideOutRight : slideInRight)} 0.4s ease-out forwards;

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
    max-width: none;
  }
`;

const ToastImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
`;

const ToastIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.5rem;
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 700;
`;

const ToastSubtitle = styled.p`
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ToastType = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

interface BadgeToastProps {
  badge: Badge;
  isVisible: boolean;
  isClosing: boolean;
  onClose: () => void;
}

const BadgeToast: React.FC<BadgeToastProps> = ({ badge, isVisible, isClosing, onClose }) => {
  if (!isVisible) return null;

  return (
    <Toast isClosing={isClosing}>
      <CloseButton onClick={onClose}>✕</CloseButton>

      {badge.image_url ? (
        <ToastImage src={badge.image_url} alt={badge.name} />
      ) : (
        <ToastIcon>🏆</ToastIcon>
      )}

      <ToastContent>
        <ToastTitle>🎉 Nova Badge!</ToastTitle>
        <ToastSubtitle>{badge.name}</ToastSubtitle>
        {badge.type && <ToastType>{badge.type}</ToastType>}
      </ToastContent>
    </Toast>
  );
};

export default BadgeToast;
