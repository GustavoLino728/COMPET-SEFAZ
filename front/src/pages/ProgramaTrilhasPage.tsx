import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import proindTrilha4Img from '../assets/images/PROIND/Cards das trilhas/PROIND-card-trilha04.png';

import prodepeTrilha1Img from '../assets/images/PRODEPE/Cards das trilhas/PRODEPE-card-trilha01.png';
import prodepeTrilha2Img from '../assets/images/PRODEPE/Cards das trilhas/PRODEPE-card-trilha02.png';
import prodepeTrilha3Img from '../assets/images/PRODEPE/Cards das trilhas/PRODEPE-card-trilha03.png';
import prodepeTrilha4Img from '../assets/images/PRODEPE/Cards das trilhas/PRODEPE-card-trilha04.png';

import prodeautoTrilha1Img from '../assets/images/PRODEAUTO/Cards das trilhas/PRODEAUTO-card-trilha01.png';
import prodeautoTrilha2Img from '../assets/images/PRODEAUTO/Cards das trilhas/PRODEAUTO-card-trilha02.png';
import prodeautoTrilha3Img from '../assets/images/PRODEAUTO/Cards das trilhas/PRODEAUTO-card-trilha03.png';
import prodeautoTrilha4Img from '../assets/images/PRODEAUTO/Cards das trilhas/PRODEAUTO-card-trilha04.png';

const ProgramaTrilhasPage = () => {
  const { programaId } = useParams();
  const [termoDeBusca, setTermoDeBusca] = useState('');
  const navigate = useNavigate();

  const bannerImages: { [key: string]: string } = {
    proind: proindBannerImg,
    prodepe: prodepeBannerImg,
    prodeauto: prodeautoBannerImg,
  };

  const bannerColorClasses: { [key: string]: string } = {
      proind: styles.proindBanner,
      prodepe: styles.prodepeBanner,
      prodeauto: styles.prodeautoBanner,
  };
  
  const imagensDosCards: { [key: string]: string } = {
    'proind-calculo-incentivo': proindTrilha1Img,
    'proind-lançamentos-incentivo': proindTrilha2Img, 
    'proind-controle-suplementar': proindTrilha3Img,
    'proind-concessao-incentivo': proindTrilha4Img,

    'prodepe-calculo-incentivo': prodepeTrilha1Img,
    'prodepe-lancamentos-incentivo': prodepeTrilha2Img,
    'prodepe-controles-suplementares': prodepeTrilha3Img,
    'prodepe-concessao-incentivo': prodepeTrilha4Img,

    'prodeauto-calculo-incentivo': prodeautoTrilha1Img,
    'prodeauto-lancamentos-incentivo': prodeautoTrilha2Img,
    'prodeauto-controles-suplementares': prodeautoTrilha3Img,
    'prodeauto-concessao-incentivo': prodeautoTrilha4Img,
  };

  // Se não há programaId, mostrar todos os programas
  if (!programaId) {
    const programas = [
      {
        id: 'proind',
        nome: 'PROIND',
        descricao: 'Programa de Incentivo à Indústria',
        imagem: proindBannerImg,
        cor: styles.proindBanner
      },
      {
        id: 'prodepe',
        nome: 'PRODEPE',
        descricao: 'Programa de Desenvolvimento de Pernambuco',
        imagem: prodepeBannerImg,
        cor: styles.prodepeBanner
      },
      {
        id: 'prodeauto',
        nome: 'PRODEAUTO',
        descricao: 'Programa de Desenvolvimento do Setor Automotivo',
        imagem: prodeautoBannerImg,
        cor: styles.prodeautoBanner
      }
    ];

    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            &larr;
          </button>

          <h1 className={styles.title}>Explore nossas Trilhas</h1>
          <p className={styles.subtitle}>Escolha um programa para começar sua jornada de aprendizado</p>

          <div className={styles.programsGrid}>
            {programas.map(programa => (
              <div 
                key={programa.id} 
                className={`${styles.programCard} ${programa.cor}`}
                onClick={() => navigate(`/trilhas/${programa.id}`)}
              >
                <div className={styles.programCardContent}>
                  <h3>{programa.nome}</h3>
                  <p>{programa.descricao}</p>
                </div>
                {programa.imagem && (
                  <img 
                    src={programa.imagem} 
                    alt={`Ilustração do ${programa.nome}`} 
                    className={styles.programCardImage} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const trilhasDoPrograma = trilhas
    .filter(trilha => trilha.programa.toLowerCase() === programaId?.toLowerCase())
    .filter(trilha => 
      trilha.titulo.toLowerCase().includes(termoDeBusca.toLowerCase())
    );

  const nomeDoPrograma = programaId ? programaId.toUpperCase() : '';
  const imagemDoBanner = bannerImages[programaId?.toLowerCase() || ''];
  const corDoBanner = bannerColorClasses[programaId?.toLowerCase() || ''];

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

        <div className={`${styles.programBanner} ${corDoBanner}`}>
          <div className={styles.bannerText}>
            <h2>{nomeDoPrograma}</h2>
            <p>Conheça o {nomeDoPrograma} e aprofunde seu entendimento sobre esse programa de incentivo à indústria pernambucana. Desenvolva seu conhecimento tributário com conteúdos claros e focados na prática.
            </p>
            </div>
    
        {imagemDoBanner && <img src={imagemDoBanner} alt={`Ilustração do ${nomeDoPrograma}`} className={styles.bannerImage} />}
        </div>

      <div className={styles.trailsGrid}>
        {trilhasDoPrograma.map(trilha => (
          <TrailCard
            key={trilha.id}
            link={`/trilha/${trilha.id}`}
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