import { useState, useEffect } from 'react';
import { getUserProgress, trackTrailAccess, UserProgressResponse, TrackTrailData } from '../api';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgressResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProgress();
      setProgress(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar progresso');
    } finally {
      setLoading(false);
    }
  };

  const trackAccess = async (data: TrackTrailData) => {
    try {
      const result = await trackTrailAccess(data);
      await fetchProgress();
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar acesso');
      throw err;
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return {
    progress,
    loading,
    error,
    fetchProgress,
    trackAccess,
  };
};
