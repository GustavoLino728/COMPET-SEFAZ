import React from 'react';
import styles from './DesafiosCard.module.css';

type DesafiosCardProps = {
  title: string;
  number: string; 
  description: string;
  buttonText: string;
  onButtonClick: () => void;
};

const DesafiosCard: React.FC<DesafiosCardProps> = ({
  title,
  number,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.numberTag}>{number}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <button className={styles.button} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default DesafiosCard;