import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProgramasPage.module.css';
import { trilhas } from '../data/trilhasData'; 
import { AiOutlineSearch } from "react-icons/ai";

import prodepeImg from '../assets/images/PRODEPE/PRODEPE-card-programa.png';
import prodeautoImg from '../assets/images/PRODEAUTO/PRODEAUTO-card-programa.png';
import proindImg from '../assets/images/PROIND/PROIND-card-programa.png';

const ProgramasPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Explore nossas Trilhas</h1>
      
      <div className={styles.searchBarContainer}>
        <AiOutlineSearch className={styles.searchIcon} /> {/* O ícone como componente */}
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
