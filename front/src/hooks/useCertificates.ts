import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchApprovedChallenges, getCertificateQuestions } from '../api';

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

        // Agrupar por Program + Track para criar apenas um certificado por par
        const programTrackMap = new Map<string, any>();
        
        // Agrupar desafios por Program + Track
        const challengesByProgramTrack = new Map<string, any[]>();
        
        hardChallenges.forEach((challenge: any) => {
          const program = challenge.program_name || 'PROIND';
          const track = challenge.track_name || 'T1';
          const key = `${program}-${track}`;
          
          if (!challengesByProgramTrack.has(key)) {
            challengesByProgramTrack.set(key, []);
          }
          challengesByProgramTrack.get(key)!.push(challenge);
        });
        
        // Para cada grupo, verificar se tem questões suficientes fazendo uma chamada à API
        const certificatePromises = Array.from(challengesByProgramTrack.entries()).map(async ([key, challenges]) => {
          const [program, track] = key.split('-');
          
          try {
            // Fazer uma chamada de teste para verificar se há questões suficientes
            await getCertificateQuestions(program, track);
            
            // Se chegou até aqui, significa que há pelo menos 5 questões
            return {
              id: key,
              title: `${program} - ${track}`,
              program: program,
              level: track,
              status: 'available',
              isCompleted: false,
              difficulty: 'HARD'
            };
          } catch (error) {
            // Se a API retornou erro, significa que não há questões suficientes
            console.warn(`Not enough questions for ${program}-${track}:`, error);
            return null;
          }
        });
        
        // Aguardar todas as verificações
        const certificateResults = await Promise.all(certificatePromises);
        
        // Adicionar apenas os certificados válidos
        certificateResults.forEach(certificate => {
          if (certificate) {
            programTrackMap.set(certificate.id, certificate);
          }
        });

        // Converter Map para array de certificados
        const certificates: Certificate[] = Array.from(programTrackMap.values());

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
