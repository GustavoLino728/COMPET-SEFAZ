import React from 'react';
import styles from './TrackDetailHeader.module.css';
import calculatorImage from '../../assets/images/calculator.png'; 

type TrackDetailHeaderProps = {
  title: string;
  description: string;
  programa: string;
};

const TrackDetailHeader = ({ title, description, programa }: TrackDetailHeaderProps) => {  
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftContent}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.proindTag}>PROIND</button> 
      </div>

      <img 
        src={calculatorImage} 
        alt="Ilustração de calculadora e moedas" 
        className={styles.rightImage} 
      />
    </div>
  );
};

export default TrackDetailHeader;