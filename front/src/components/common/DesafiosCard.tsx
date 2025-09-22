import React from 'react';
import styles from './DesafiosCard.module.css';

interface DesafiosCardProps {
  title: string;
  number: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const DesafiosCard: React.FC<DesafiosCardProps> = ({
  title,
  number,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.number}>{number}</span>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <button className={styles.button} onClick={onButtonClick}>
        {buttonText}
      </button>
      
      {/* Ícone no canto inferior direito */}
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#70D6A2"/>
            <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" fill="white"/>
            <circle cx="16" cy="16" r="2" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DesafiosCard;