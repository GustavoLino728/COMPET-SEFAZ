import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { getCurrentUser } from '../api';

type DashboardCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isLarge?: boolean;
};

const DashboardCard = ({ title, description, buttonText, buttonLink, isLarge = false }: DashboardCardProps) => {
  const cardClasses = `${styles.card} ${isLarge ? styles.largeCard : ''}`;
  
  return (
    <div className={cardClasses}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <a href={buttonLink} className={styles.button}>
        {buttonText}
      </a>
    </div>
  );
};

type TrailCardProps = {
  imageSrc: string;
  title: string;
  description: string;
}

const TrailCard = ({ imageSrc, title, description }: TrailCardProps) => {
  return (
    <div className={styles.trailCard}>
      <div 
        className={styles.trailImage} 
        style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* A imagem é aplicada via CSS no background desta div */}
      </div>
      <div className={styles.trailContent}>
        <h4 className={styles.trailTitle}>{title}</h4>
        <p className={styles.trailDescription}>{description}</p>
      </div>
    </div>
  );
};

function HomePage() {
  const [userName, setUserName] = useState('Carregando...');

  useEffect(() => {
  async function fetchUser() {
    try {
      const user = await getCurrentUser();
      console.log('Dados do usuário:', user);

      if (user && user.full_name) {
        const firstName = user.full_name.split(' ')[0];
        setUserName(firstName);
      } else {
        setUserName('Usuário');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setUserName('Usuário');
    }
  }
  fetchUser();
}, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        
        {/* Seção de Boas-vindas (Já existente - NÃO MEXA) */}
        <section className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Bem vindo, {userName}</h1>
          <p className={styles.subtitle}>
            Explore sua jornada de aprendizado e mantenha-se atualizado sobre incentivos fiscais.
          </p>
        </section>

        {/* Seção de Acesso Rápido (Já existente - NÃO MEXA) */}
        <section className={styles.quickAccessSection}>
          <h2 className={styles.sectionTitle}>Acesso Rápido</h2>
          <div className={styles.cardGrid}>
            <DashboardCard
              isLarge={true}
              title="Explore as Trilhas de Aprendizado"
              description="Descubra trilhas de aprendizado estruturadas, personalizadas para o seu papel e interesses."
              buttonText="Visualizar Trilhas"
              buttonLink="/trilhas"
            />
            <DashboardCard
              title="Consiga Certificados"
              description="Valide sua expertise com certificações reconhecidas pelo setor."
              buttonText="Ver meus Certificados"
              buttonLink="/certificados"
            />
            <DashboardCard
              title="Teste de perfil"
              description="Nos ajude a identificar melhor o seu perfil para que possamos oferecer um conteúdo direcionado as suas necessidades."
              buttonText="Realizar teste"
              buttonLink="/teste-perfil"
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* lembrar de colocar as outras seções de trilhas sugeridas aqui      */}
        {/* ================================================================== */}
        <section className={styles.trailsSection}>
          <h2 className={styles.sectionTitle}>Trilhas Sugeridas</h2>
          <div className={styles.trailsGrid}>
            
            <TrailCard 
              imageSrc="https://via.placeholder.com/400x220/d1e7dd/8ea4bf?text=PRODEPE"
              title="PRODEPE"
              description="Descubra como o Programa de Desenvolvimento de Pernambuco estimula empresas com incentivos fiscais..."
            />
            <TrailCard 
              imageSrc="https://via.placeholder.com/400x220/dcd0e8/8ea4bf?text=PRODEAUTO"
              title="PRODEAUTO"
              description="Entenda os benefícios do programa voltado ao setor automotivo, que incentiva a instalação e expansão de indústrias..."
            />
            <TrailCard 
              imageSrc="https://via.placeholder.com/400x220/d1f2eb/8ea4bf?text=PROIND"
              title="PROIND"
              description="Aprenda como esse programa de incentivos apoia empreendimentos industriais, promovendo inovação..."
            />
            
          </div>
        </section>

      </div>
    </div>
  );
}

export default HomePage;