import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { getCurrentUser } from '../api';
import TrailCard from '../components/cards/TrailCard';

import prodepeImage from '../assets/images/PRODEPE/PRODEPE-card-programa.png'; 
import prodeautoImage from '../assets/images/PRODEAUTO/PRODEAUTO-card-programa.png'; 
import proindImage from '../assets/images/PROIND/PROIND-card-programa.png'; 

type DashboardCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isLarge?: boolean;
  customClass?: string;
};

const DashboardCard = ({ title, description, buttonText, buttonLink, isLarge = false, customClass }: DashboardCardProps) => {
  const cardClasses = `${styles.card} ${isLarge ? styles.largeCard : ''} ${customClass ? styles[customClass] : ''}`;
  
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

function HomePage() {
  const [userName, setUserName] = useState('Carregando...');
  const [isAdmin, setIsAdmin] = useState(false);

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

      // Verificar se o usuário é administrador
      if (user && (user.is_staff || user.is_superuser)) {
        setIsAdmin(true);
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
          <div className={isAdmin ? styles.cardGridWithAdmin : styles.cardGrid}>

            <DashboardCard
              isLarge={true}
              title="Explore as Trilhas de Aprendizado"
              description="Descubra trilhas de aprendizado estruturadas, personalizadas para o seu papel e interesses."
              buttonText="Visualizar Trilhas"
              buttonLink="/trilhas"
            />
            {isAdmin && (
              <DashboardCard
                title="Painel Administrativo"
                description="Gerencie desafios, usuários e configurações do sistema."
                buttonText="Acessar Admin"
                buttonLink="/admin"
                customClass="adminCard"
              />
            )}
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
        
        <section className={styles.trailsSection}>
          <h2 className={styles.sectionTitle}>Trilhas Sugeridas</h2>
          <div className={styles.trailsGrid}>
            
            <TrailCard 
              imageSrc={prodepeImage}
              title="PRODEPE"
              description="Descubra como o Programa de Desenvolvimento de Pernambuco estimula empresas com incentivos fiscais..."
              link="/trilhas/prodepe"
            />
            <TrailCard 
              imageSrc={prodeautoImage}
              title="PRODEAUTO"
              description="Entenda os benefícios do programa voltado ao setor automotivo, que incentiva a instalação e expansão de indústrias..."
              link="/trilhas/prodeauto"
            />
            <TrailCard 
              imageSrc={proindImage}
              title="PROIND"
              description="Aprenda como esse programa de incentivos apoia empreendimentos industriais, promovendo inovação..."
              link="/trilhas/proind"
            />
            
          </div>
        </section>

      </div>
    </div>
  );
}

export default HomePage;