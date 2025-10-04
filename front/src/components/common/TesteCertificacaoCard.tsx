import React from 'react';
import styles from './TesteCertificacaoCard.module.css';

// Vamos precisar de um ícone de "check" ou "certificado"
// Se você tiver um SVG ou PNG, importe-o aqui:
// import checkIcon from '../../assets/icons/check-circle.svg'; 

type TesteCertificacaoCardProps = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
};

const TesteCertificacaoCard: React.FC<TesteCertificacaoCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        {/* Usando um SVG simples de "check" ou um placeholder */}
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.59L19 8L10 17Z"/>
        </svg>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.descriptionBox}>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.button} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default TesteCertificacaoCard;