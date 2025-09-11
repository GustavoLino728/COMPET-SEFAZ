import React from 'react';
import TrackDetailHeader from '../components/common/TrackDetailHeader';
import VideoSection from '../components/common/VideoSection';
import DesafiosCard from '../components/common/DesafiosCard';
import TesteCertificacaoCard from '../components/common/TesteCertificacaoCard';
import styles from './TrailsPanel.module.css';

const TrailsPanel: React.FC = () => {
  const handleChallengeClick = (challengeType: string) => {
    console.log(`Iniciando desafio: ${challengeType}`);
    
  };

  const handleTestClick = () => {
    console.log('Iniciando teste de certificação');
  };

  return (
    <div className={styles.container}>
      
      <TrackDetailHeader
        title="T1: Cálculo do Incentivo"
        description="Aprenda a calcular incentivos de forma precisa e eficiente utilizando as melhores práticas do mercado."
        iconUrl="/path/to/your/icon.png" 
      />

   
      <VideoSection
        title="CÁLCULO DO INCENTIVO"
        description="Material explicativo sobre como realizar cálculos de incentivo de forma correta."
        imageUrl="/path/to/your/image.jpg" 
      />

      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Desafios</h2>
        <div className={styles.challengesGrid}>
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
        </div>
      </div>

    
      <div className={styles.chatBot}>
        <div className={styles.chatBotIcon}>
          <span>💬</span>
        </div>
        <span className={styles.chatBotText}>Fale com Susy</span>
      </div>
    </div>
  );
};

export default TrailsPanel;