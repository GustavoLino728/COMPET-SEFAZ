import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProgramasPage.module.css';
import { trilhas } from '../data/trilhasData'; 
// import { IoSearch } from "react-icons/io5";

import prodepeImg from '../assets/images/PRODEPE/PRODEPE-card-programa.png';
import prodeautoImg from '../assets/images/PRODEAUTO/PRODEAUTO-card-programa.png';
import proindImg from '../assets/images/PROIND/PROIND-card-programa.png';

const ProgramasPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Explore nossas Trilhas</h1>
      
      <div className={styles.searchBarContainer}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Procure Trilhas" className={styles.searchInput} />
      </div>

      <h2 className={styles.subtitle}>O que deseja aprender?</h2>
        <div className={styles.programsGrid}>
        {/* Card PRODEPE */}
        <Link to="/trilhas/prodepe" className={styles.cardLinkWrapper}>
            <div className={styles.visualCard}>
            <img src={prodepeImg} alt="Ilustração do programa PRODEPE" className={styles.cardImage} />
            </div>
            <span className={styles.cardTitle}>PRODEPE</span>
        </Link>

        {/* Card PRODEAUTO */}
        <Link to="/trilhas/prodeauto" className={styles.cardLinkWrapper}>
            <div className={styles.visualCard}>
            <img src={prodeautoImg} alt="Ilustração do programa PRODEAUTO" className={styles.cardImage} />
            </div>
            <span className={styles.cardTitle}>PRODEAUTO</span>
        </Link>

        {/* Card PROIND */}
        <Link to="/trilhas/proind" className={styles.cardLinkWrapper}>
            <div className={styles.visualCard}>
            <img src={proindImg} alt="Ilustração do programa PROIND" className={styles.cardImage} />
            </div>
            <span className={styles.cardTitle}>PROIND</span>
        </Link>
        </div>
    </div>
  );
};

export default ProgramasPage;
