import React from 'react';
import styles from './CertificateCard.module.css';

interface Certificate {
  id: string;
  title: string;
  program: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  level: string;
  status: 'completed' | 'available' | 'blocked';
  isCompleted: boolean;
  downloadUrl?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  onDownload: (certificateId: string) => void;
  onTakeTest: (certificateId: string) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onDownload,
  onTakeTest
}) => {
  const getStatusIcon = () => {
    if (certificate.isCompleted) {
      return (
        <svg className={styles.statusIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    } else {
      return (
        <svg className={styles.statusIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      );
    }
  };

  const getStatusText = () => {
    if (certificate.isCompleted) {
      return 'Aprovado';
    } else {
      return 'Disponível';
    }
  };

  const getStatusClass = () => {
    if (certificate.isCompleted) {
      return styles.statusApproved;
    } else {
      return styles.statusAvailable;
    }
  };

  const getCardClass = () => {
    if (certificate.isCompleted) {
      return styles.cardCompleted;
    } else {
      return styles.cardAvailable;
    }
  };

  const getButtonIcon = () => {
    if (certificate.isCompleted) {
      return (
        <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      );
    } else {
      return (
        <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      );
    }
  };

  const handleButtonClick = () => {
    if (certificate.isCompleted) {
      onDownload(certificate.id);
    } else {
      onTakeTest(certificate.id);
    }
  };

  return (
    <div className={`${styles.card} ${getCardClass()}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{certificate.title}</h3>
        <div className={`${styles.status} ${getStatusClass()}`}>
          {getStatusIcon()}
          <span className={styles.statusText}>{getStatusText()}</span>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.programTag}>
          {certificate.program}
        </div>
        <div className={styles.trackTag}>
          {certificate.level}
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <button 
          className={styles.actionButton}
          onClick={handleButtonClick}
        >
          {getButtonIcon()}
          {certificate.isCompleted ? 'Baixar certificado' : 'Realizar teste'}
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;
