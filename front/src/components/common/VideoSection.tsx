import React, { useState } from 'react';
import styles from './VideoSection.module.css';

interface VideoSectionProps {
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  duration
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Aqui você pode adicionar a lógica para abrir o player
    console.log('Playing video:', videoUrl);
  };

  return (
    <div className={styles.videoSection}>
      <h2 className={styles.sectionTitle}>Conteúdo</h2>
      
      <div className={styles.videoCard}>
        <div className={styles.imageContainer}>
          // Se houver URL do vídeo, mostrar o thumbnail com botão de play
          <h1>PROIND</h1>
          <h2>Trilha 1: Cálculo do Incentivo (PROIND)</h2>
          <p>1. Introdução e Contextualização do Tema: O Programa de Estímulo à 
            Indústria do Estado de Pernambuco, conhecido como PROIND, foi criado 
            com o propósito primordial de impulsionar o desenvolvimento econômico, 
            a geração de empregos e a competitividade do setor industrial 
            pernambucano. Seu principal mecanismo de fomento é a concessão de 
            crédito presumido de ICMS, que atua como um redutor direto do imposto 
            normal devido pelas empresas. Este incentivo se insere na realidade 
            fiscal como uma ferramenta estratégica para aliviar a carga tributária,
            incentivando a permanência, a expansão e a atração de novas indústrias 
            para o estado, promovendo assim o desenvolvimento regional equilibrado.
            O PROIND é regido principalmente pelo Decreto nº 44.650/2017, 
            especificamente em seu Anexo 33, que detalha as condições e a 
            metodologia de cálculo.
</p>
        </div>
        
        <div className={styles.videoInfo}>
          <h3 className={styles.videoTitle}>{title}</h3>
          {description && (
            <p className={styles.videoDescription}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;