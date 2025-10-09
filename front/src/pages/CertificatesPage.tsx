import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CertificateCard from '../components/certificates/CertificateCard';
import { useCertificates, Certificate } from '../hooks/useCertificates';
import styles from './CertificatesPage.module.css';

const CertificatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    certificates,
    loading,
    error,
    searchCertificates,
    getCompletedCertificates,
    getAvailableCertificates,
    groupCertificatesByProgram
  } = useCertificates();


  const filteredCertificates = searchCertificates(searchTerm);
  const completedCertificates = getCompletedCertificates().filter(cert =>
    filteredCertificates.some(f => f.id === cert.id)
  );
  const availableCertificates = getAvailableCertificates().filter(cert =>
    filteredCertificates.some(f => f.id === cert.id)
  );

  const handleDownload = (certificateId: string) => {
    // Implementar download do certificado
    console.log('Downloading certificate:', certificateId);
  };

  const handleTakeTest = (certificateId: string) => {
    // Implementar navegação para o teste
    console.log('Taking test for certificate:', certificateId);
  };

  const availableByProgram = groupCertificatesByProgram(availableCertificates);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Carregando certificados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Erro ao carregar certificados: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Acesse os seus certificados</h1>
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Procure certificado"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
            />
          </div>
        </div>
      </div>

      {/* Seção de Certificados Concluídos */}
      {completedCertificates.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Concluídos</h2>
          <div className={styles.cardsGrid}>
            {completedCertificates.map(cert => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onDownload={handleDownload}
                onTakeTest={handleTakeTest}
              />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Certificações Disponíveis */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Certificações disponíveis ({availableCertificates.length})
        </h2>
        
        {Object.entries(availableByProgram).map(([program, certs]) => (
          <div key={program} className={styles.programSection}>
            <h3 className={styles.programTitle}>{program}</h3>
            <div className={styles.cardsGrid}>
              {certs.map(cert => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  onDownload={handleDownload}
                  onTakeTest={handleTakeTest}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CertificatesPage;
