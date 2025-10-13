import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { trilhas } from '../data/trilhasData';
import TrailCard from '../components/cards/TrailCard';
import styles from './ProgramaTrilhasPage.module.css';
// import { IoSearch } from 'react-icons/io5';

import proindBannerImg from '../assets/images/PROIND/PROIND-card-programa.png'; 
import prodepeBannerImg from '../assets/images/PRODEPE/PRODEPE-card-programa.png';
import prodeautoBannerImg from '../assets/images/PRODEAUTO/PRODEAUTO-card-programa.png';

import proindTrilha1Img from '../assets/images/PROIND/Cards das trilhas/PROIND-card-trilha01.png';
import proindTrilha2Img from '../assets/images/PROIND/Cards das trilhas/PROIND-card-trilha02.png';
import proindTrilha3Img from '../assets/images/PROIND/Cards das trilhas/PROIND-card-trilha03.png';
import proindTrilha4Img from '../assets/images/PROIND/Cards das trilhas/PROIND-card-trilha04.png'


const ProgramaTrilhasPage = () => {
  const { programaId } = useParams();
  const [termoDeBusca, setTermoDeBusca] = useState('');
  const navigate = useNavigate();

  const bannerImages: { [key: string]: string } = {
    proind: proindBannerImg,
    prodepe: prodepeBannerImg,
    prodeauto: prodeautoBannerImg,
  };

  const imagensDosCards: { [key: string]: string } = {
    'proind-calculo-incentivo': proindTrilha1Img,
    'proind-lançamentos-incentivo': proindTrilha2Img, // Use o ID correto da sua trilha 2
    'proind-controle-suplementar': proindTrilha3Img,
    'proind-concessao-incentivo': proindTrilha4Img,
  };

  const trilhasDoPrograma = trilhas
    .filter(trilha => trilha.programa.toLowerCase() === programaId?.toLowerCase())
    .filter(trilha => 
      trilha.titulo.toLowerCase().includes(termoDeBusca.toLowerCase())
    );

  const nomeDoPrograma = programaId ? programaId.toUpperCase() : '';
  const imagemDoBanner = bannerImages[programaId?.toLowerCase() || ''];

  return (
    <div className={styles.pageContainer}>
       <div className={styles.contentWrapper}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
          &larr;
        </button>

      <h1 className={styles.title}>Explore nossas Trilhas</h1>

      <div className={styles.searchBarContainer}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder={`Procurar em ${nomeDoPrograma}...`}
        className={styles.searchInput}
        value={termoDeBusca}
        onChange={e => setTermoDeBusca(e.target.value)}/>
        </div>

         {/* Banner específico do programa */}

        <div className={styles.programBanner}>
           <div className={styles.bannerText}>
            <h2>{nomeDoPrograma}</h2>
            <p>Conheça o {nomeDoPrograma} e aprofunde seu entendimento sobre esse programa de incentivo à indústria pernambucana. Desenvolva seu conhecimento tributário com conteúdos claros e focados na prática.
            </p>
            </div>
        
        {/* Usamos a imagem que selecionamos dinamicamente */}
        {imagemDoBanner && <img src={imagemDoBanner} alt={`Ilustração do ${nomeDoPrograma}`} className={styles.bannerImage} />}
        </div>

      <div className={styles.trailsGrid}>
        {trilhasDoPrograma.map(trilha => (
          <TrailCard
            key={trilha.id}
            link={`/trilha/${trilha.id}`}
            // 👇 3. USE O MAPA DE IMAGENS DOS CARDS AQUI 👇
            imageSrc={imagensDosCards[trilha.id] || 'https://via.placeholder.com/400x220'}
            title={trilha.titulo}
          />
        ))}
      </div>
    </div>
        
      
       {trilhasDoPrograma.length === 0 && (
        <p className={styles.noResults}>Nenhuma trilha encontrada para "{termoDeBusca}".</p>  
      )}

    </div>
  );
};

export default ProgramaTrilhasPage;