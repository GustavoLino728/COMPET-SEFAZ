import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchApprovedChallenges } from '../api';

export interface Certificate {
  id: string;
  title: string;
  program: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  level: string;
  status: 'completed' | 'available' | 'blocked';
  isCompleted: boolean;
  downloadUrl?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const useCertificates = () => {
  const { isLoggedIn } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true); // Volta para true para carregamento real
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar desafios aprovados da API
        const approvedChallenges = await fetchApprovedChallenges();

        // Filtrar apenas desafios com dificuldade HARD
        const hardChallenges = approvedChallenges.filter((challenge: any) => 
          challenge.difficulty === 'HARD'
        );

        // Mapear para o formato Certificate
        const certificates: Certificate[] = hardChallenges.map((challenge: any) => ({
          id: challenge.id.toString(),
          title: challenge.title,
          program: challenge.program_name || 'PROIND',
          level: challenge.track_name || 'T1',
          status: 'available',
          isCompleted: false,
          difficulty: 'HARD'
        }));

        setCertificates(certificates);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Erro ao carregar certificados');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const searchCertificates = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      return certificates;
    }

    return certificates.filter(cert =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.program.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getCompletedCertificates = () => {
    return certificates.filter(cert => cert.isCompleted);
  };

  const getAvailableCertificates = () => {
    return certificates.filter(cert => !cert.isCompleted);
  };

  const groupCertificatesByProgram = (certs: Certificate[]) => {
    const grouped: { [key: string]: Certificate[] } = {};
    certs.forEach(cert => {
      if (!grouped[cert.program]) {
        grouped[cert.program] = [];
      }
      grouped[cert.program].push(cert);
    });
    return grouped;
  };

  return {
    certificates,
    loading,
    error,
    searchCertificates,
    getCompletedCertificates,
    getAvailableCertificates,
    groupCertificatesByProgram
  };
};
