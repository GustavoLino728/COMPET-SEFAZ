import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trilhas, type Trilha, type ItemDaListaAninhada } from '../data/trilhasData';
import { useProgress } from '../hooks/useProgress';
import TrackDetailHeader from '../components/common/TrackDetailHeader';
import VideoSection from '../components/common/VideoSection';
import videoDaTrilha from '../assets/images/PROIND/Video_Compet_Superior.mp4';
import DesafiosCard from '../components/common/DesafiosCard';
import TesteCertificacaoCard from '../components/common/TesteCertificacaoCard';
import styles from './TrailsPanel.module.css';

const RenderList = ({ items }: { items: ItemDaListaAninhada[] }) => {
  return (
    <ul className={styles.mainList}>
      {items.map((item, index) => {
        if (typeof item === 'string') {
          return <li key={index} className={styles.mainListItem}>{item}</li>;
        }
        return (
          <li key={index} className={styles.mainListItem}>
            {item.texto}
            {item.subItens && <RenderList items={item.subItens} />}
          </li>
        );
      })}
    </ul>
  );
};

const extractTrailNumber = (trailId: string): number => {
  const match = trailId.match(/t(\d+)/i);
  return match ? parseInt(match[1]) : 1;
};

const TrailsPanel = () => { 
  const { trilhaId } = useParams();

  console.log("ID que eu li da URL:", trilhaId);
  console.log("Estou a procurar por este ID na seguinte lista de trilhas:", trilhas);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conteudo');
  const { trackAccess } = useProgress();
  const [hasTracked, setHasTracked] = useState(false);

   const videosDasTrilhas: { [key: string]: string } = {
    'proind-calculo-incentivo': videoDaTrilha,
  };

  const trilhaAtual = trilhas.find((trilha: Trilha) => trilha.id === trilhaId);

  useEffect(() => {
    const registerAccess = async () => {
      if (!trilhaAtual || !trilhaId || hasTracked) {
        return;
      }

      try {
        setHasTracked(true); 
        
        const trailNumber = extractTrailNumber(trilhaId);
        
        await trackAccess({
          trail_id: trilhaId,
          program: trilhaAtual.programa,
          trail_number: trailNumber,
        });
        
        console.log(`✅ Acesso registrado: ${trilhaId} - T${trailNumber}`);
      } catch (error) {
        console.error('❌ Erro ao registrar acesso:', error);
        setHasTracked(false); 
      }
    };

    registerAccess();
  }, [trilhaId]);

  useEffect(() => {
    setHasTracked(false);
  }, [trilhaId]);

  if (!trilhaAtual) {
    return <div>Trilha não encontrada!</div>;
  }

  const videoAtual = videosDasTrilhas[trilhaAtual.id];

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

              {videoAtual && <VideoSection videoUrl={videoAtual} />}
              
              {/* --- Loop Inteligente para Renderizar o Conteúdo Dinâmico --- */}
              {trilhaAtual.blocosDeConteudo.map((bloco, index) => {
                if (bloco.tipo === 'subtitulo' || bloco.tipo === 'subtitulo-bold') {
                  const className = bloco.tipo === 'subtitulo-bold' ? styles.contentTitleBold : styles.contentTitle;
                  return <h3 key={index} className={className}>{bloco.conteudo as string}</h3>;
                }
                
                if (bloco.tipo === 'paragrafo') {
                  return <p key={index} className={styles.contentText}>{bloco.conteudo as string}</p>;
                }
                
                if (bloco.tipo === 'lista') {
                  return <RenderList key={index} items={bloco.conteudo} />;
                }

                if (bloco.tipo === 'lista-alfabetica' || bloco.tipo === 'lista-bullet') {
                  if (Array.isArray(bloco.conteudo)) {
                    const listClass = bloco.tipo === 'lista-alfabetica' ? styles.alphaList : styles.bulletList;
                    const itemClass = bloco.tipo === 'lista-alfabetica' ? styles.alphaListItem : styles.bulletListItem;
                    return (
                      <ul key={index} className={listClass}>
                        {bloco.conteudo.map((item, itemIndex) => (
                          <li key={itemIndex} className={itemClass}>{item}</li>
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
            
          {trilhaAtual.materiaisComplementares && trilhaAtual.materiaisComplementares.length > 0 ? (
            <div className={styles.materialList}>
              {trilhaAtual.materiaisComplementares.map((material, index) => (
                <a 
                  key={index} 
                  href={material.url} 
                  className={styles.materialLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  {material.texto}
                </a>
              ))}
            </div>
          ) : (
            <p className={styles.contentText}>
              Nenhum material complementar disponível para esta trilha.
            </p>
          )}
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