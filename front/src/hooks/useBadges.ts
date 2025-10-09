import { useState, useEffect } from 'react';
import { getUserBadges, UserBadgesResponse } from '../api';

export const useBadges = () => {
  const [userBadges, setUserBadges] = useState<UserBadgesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Variável para evitar atualizações se componente foi desmontado
    let isMounted = true;
    
    const fetchUserBadges = async () => {
      try {
        console.log('🏆 Carregando badges únicos...');
        const data = await getUserBadges();
        
        // Só atualizar se componente ainda estiver montado
        if (isMounted) {
          console.log('✅ Badges carregados:', data.badges.length);
          setUserBadges(data);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('❌ Erro badges:', err);
        if (isMounted) {
          setUserBadges({
            badges: [],
            stats: {
              total_badges: 0, bronze_badges: 0, silver_badges: 0,
              gold_badges: 0, completion_percentage: 0, proind_badges: 0,
              prodepe_badges: 0, prodeauto_badges: 0
            }
          });
          setError('Erro ao carregar badges');
          setLoading(false);
        }
      }
    };

    fetchUserBadges();
    
    // Cleanup: marcar como desmontado quando componente sair
    return () => {
      isMounted = false;
    };
  }, []); // ARRAY VAZIO - só executa UMA vez

  return {
    userBadges,
    loading,
    error,
  };
};
