import React from 'react';
import styles from './TesteCertificacaoCard.module.css';

interface TesteCertificacaoCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const TesteCertificacaoCard: React.FC<TesteCertificacaoCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <div className={styles.iconTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        
        <div className={styles.descriptionBox}>
          <p className={styles.description}>{description}</p>
        </div>
        
        <button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
      
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
            <path d="M12 16l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </div>
      </div>
    </div>
  );
};

export default TesteCertificacaoCard;