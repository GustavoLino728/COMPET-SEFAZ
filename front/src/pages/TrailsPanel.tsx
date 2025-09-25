import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trilhas, type Trilha } from '../data/trilhasData';

import TrackDetailHeader from '../components/common/TrackDetailHeader';
// import VideoSection from '../components/common/VideoSection';
import DesafiosCard from '../components/common/DesafiosCard';
import TesteCertificacaoCard from '../components/common/TesteCertificacaoCard';
import styles from './TrailsPanel.module.css';

const TrailsPanel = () => {
  
  const { trilhaId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conteudo');

  const trilhaAtual = trilhas.find((trilha: Trilha) => trilha.id === trilhaId);

  if (!trilhaAtual) {
    return <div>Trilha não encontrada!</div>;
  }

  const handleChallengeClick = (challengeType: string) => {
    console.log(`Iniciando desafio: ${challengeType}`);
  };

  const handleTestClick = () => {
    console.log('Iniciando teste de certificação');
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>&larr;</button>
      
      <TrackDetailHeader
        title={trilhaAtual.titulo}
        description={trilhaAtual.descricaoHeader}
        programa={trilhaAtual.programa}
      />

      <div className={styles.layoutContainer}>
        <main className={styles.mainContent}>
          
          <div className={styles.contentBlock}>
            <h3 className={styles.contentTitle}>Sobre a trilha</h3>
            <p className={styles.contentText}>{trilhaAtual.sobreTrilha}</p>
          </div>

          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === 'conteudo' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('conteudo')}
            >
              Conteúdo
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'material' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('material')}
            >
              Material complementar
            </button>
          </div>
     
          {activeTab === 'conteudo' && (
            <div>
              {/* O vídeo agora é renderizado com base na URL do nosso arquivo de dados */}
              {/* <VideoSection videoUrl={trilhaAtual.urlVideo} /> */}
              
              {/* Loop inteligente para renderizar todos os blocos de conteúdo */}
              {trilhaAtual.blocosDeConteudo.map((bloco, index) => {

                  if (bloco.tipo === 'subtitulo') {
                    return <h3 key={index} className={styles.contentTitle}>{bloco.conteudo}</h3>;
                  }
                  
                  if (bloco.tipo === 'subtitulo-bold') { 
                    return <h3 key={index} className={styles.contentTitleBold}>{bloco.conteudo}</h3>; 
                  }
                  
                  if (bloco.tipo === 'paragrafo') {
                    return (
                      <p key={index} className={styles.contentText}>
                        {bloco.conteudo}
                      </p>
                    );
                  }
                  
                  if (bloco.tipo === 'lista-alfabetica') { // Se o tipo for o novo 'lista-alfabetica'
                    if (Array.isArray(bloco.conteudo)) {
                      return (
                        <ul key={index} className={styles.alphaList}>
                          {bloco.conteudo.map((item, itemIndex) => (
                            <li key={itemIndex} className={styles.alphaListItem}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                  }
                  
                  return null;
                })}
            </div>
          )}

          {activeTab === 'material' && (
            <div className={styles.contentBlock}>
              <h3 className={styles.contentTitle}>Material Complementar</h3>
              <p className={styles.contentText}>
                Aqui estarão os links e documentos para download.
              </p>
            </div>
          )}
          
        </main>

        <aside className={styles.sidebar}>
          <DesafiosCard 
            title="Desafios"
            number="2"
            description="Teste os seus conhecimentos da trilha com exercícios práticos!"
            buttonText="Fazer simulados"
            onButtonClick={() => handleChallengeClick('conhecimento')}
          />
          <TesteCertificacaoCard 
            title="Teste de certificação"
            description="Faça um avaliação final da trilha e obtenha o seu certificado."
            buttonText="Fazer teste"
            onButtonClick={handleTestClick}
          />
        </aside>
      </div>
      
    </div>
  );
};

export default TrailsPanel;