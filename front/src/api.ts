import axios from "axios";
import { BackendChallenge, Challenge, QuizQuestion } from './types';

const API_BASE_URL = "http://localhost:8000/api/auth";
const CHATBOT_API_BASE_URL = "http://localhost:8000/api/chatbot";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: {
  first_name: string;  
  last_name: string;     
  email: string;
  linkedin_url?: string;
  cpf: string;
  password: string;
  re_password: string;
}) => {
  try {
    const response = await api.post("/register/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data: {
  linkedin_url?: string;
  interest_area?: string;
  field_of_work?: string;
  is_auditor?: boolean;
}) => {
  try {
    const response = await api.patch('/users/me/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/jwt/create/", data);

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) throw new Error("No refresh token");
    
    const response = await api.post("/jwt/refresh/", { refresh });
    localStorage.setItem("accessToken", response.data.access);
    return response.data;
  } catch (error) {
    logoutUser();
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ✅ Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor para renovar token automaticamente quando expira
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const token = localStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `JWT ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();

        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export const resetPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("/users/reset_password/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmResetPassword = async (data: {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}) => {
  try {
    const response = await api.post("/users/reset_password_confirm/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
    
    await api.post("/jwt/verify/", { token });
    return true;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUser = () => api.get("users/me/");

export const changePassword = (data: { current_password: string; new_password: string }) =>
  api.post("/users/set_password/", data);

export const patchCurrentUser = (data: any) => api.patch("/users/me/", data);

export const fetchUserStats = () => api.get("/users/me/stats/");

export const fetchUserAchievements = () => api.get("/users/me/achievements/");

// === PROGRESS APIs ===
export interface TrackTrailData {
  trail_id: string;
  program: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  trail_number: number;
}

export interface ProgramProgress {
  program: string;
  last_accessed_trail: number;
  trails_accessed: number[];
  total_access_count: number;
  progress_percentage: number;
  is_completed: boolean;
  next_trail: number | null;
  created_at: string;
  updated_at: string;
}

export interface OverallProgress {
  total_trails_accessed: number;
  total_access_count: number;
  programs_started: string[];
  programs_completed: string[];
  overall_percentage: number;
  first_access: string | null;
  last_access: string | null;
}

export interface UserProgressResponse {
  program_progress: ProgramProgress[];
  overall_progress: OverallProgress;
  recent_accesses: any[];
  total_challenges_completed: number;
}

const progressApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
      "Content-Type": "application/json",
    },
})

progressApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log('🔍 progressApi interceptor: Token presente?', !!token);
    console.log('🔍 progressApi interceptor: URL:', config.url);
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
      console.log('🔍 progressApi interceptor: Token adicionado ao header');
    } else {
      console.log('🔍 progressApi interceptor: Nenhum token encontrado');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

progressApi.interceptors.response.use(
  (response) => {
    console.log('🔍 progressApi response interceptor - sucesso:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.log('🔍 progressApi response interceptor - erro:', error.config?.url, error.response?.status);
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🔍 progressApi response interceptor - tentando renovar token');
      originalRequest._retry = true;
      try {
        await refreshToken();
        const token = localStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `JWT ${token}`;
        return progressApi(originalRequest);
      } catch (refreshError) {
        console.log('🔍 progressApi response interceptor - erro ao renovar token');
        logoutUser();
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);
// Registrar acesso à trilha
export const trackTrailAccess = async (data: TrackTrailData) => {
  const response = await progressApi.post('/progress/track/', data);
  return response.data;
};

// Buscar progresso completo do usuário
export const getUserProgress = async (): Promise<UserProgressResponse> => {
  const response = await progressApi.get('/progress/user/');
  return response.data;
};

// Buscar progresso específico de um programa
export const getProgramProgress = async (program: string): Promise<ProgramProgress> => {
  const response = await progressApi.get(`/progress/program/${program.toLowerCase()}/`);
  return response.data;
};

// === BADGE APIs ===
export interface Badge {
  id: number;
  name: string;
  description: string;
  image_url: string;
  image_path: string;
  type: 'BRONZE' | 'SILVER' | 'GOLD';
  program: string;
  trail_number: number;
  difficulty: string;
  earned_at?: string;
  score?: number;
}

export interface BadgeStats {
  total_badges: number;
  bronze_badges: number;
  silver_badges: number;
  gold_badges: number;
  completion_percentage: number;
  proind_badges: number;
  prodepe_badges: number;
  prodeauto_badges: number;
  first_badge_earned?: string;
  last_badge_earned?: string;
}

export interface UserBadgesResponse {
  badges: Badge[];
  stats: BadgeStats;
}

// Buscar badges conquistados do usuário
export const getUserBadges = async (): Promise<UserBadgesResponse> => {
  const response = await progressApi.get('/progress/badges/');
  return response.data;
};

// Buscar badges disponíveis (não conquistados)
export const getAvailableBadges = async () => {
  const response = await progressApi.get('/progress/badges/available/');
  return response.data;
};

// Completar desafio e ganhar badge
export const completeChallengeAndEarnBadge = async (data: {
  program: string;
  trail_number: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  score: number;
  challenge_id?: number;
  completion_time_seconds?: number;
}) => {
  const response = await progressApi.post('/progress/challenges/complete/', data);
  return response.data;
};

// Buscar estatísticas detalhadas de badges
export const getBadgeStats = async () => {
  const response = await progressApi.get('/progress/badges/stats/');
  return response.data;
};

// Chatbot API functions
const chatbotApi = axios.create({
  baseURL: CHATBOT_API_BASE_URL, 
  headers: {
      "Content-Type": "application/json",
    },
});

export const generateQuestions = async (data: {
  program: string;
  track: string;
  topic: string;
  difficulty: string;
  type: string;
}) => {
  try {
    const response = await chatbotApi.post("/generate-question/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Questions/Challenges API (backend questions app)
const QUESTIONS_API_BASE_URL = "http://localhost:8000";
const questionsApi = axios.create({
  baseURL: QUESTIONS_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adicionar token automaticamente ao questionsApi
questionsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para renovar token automaticamente quando expira no questionsApi
questionsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const token = localStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `JWT ${token}`;
        return questionsApi(originalRequest);
      } catch (refreshError) {
        logoutUser();
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export const fetchChallenge = async (id: number) => {
  const response = await questionsApi.get(`/api/challenges/${id}/`);
  return response.data;
};

export const updateProblemQuestion = async (id: number, data: {
  statement?: string;
  correct_answer?: string | number;
  justification?: string | null;
}) => {
  const response = await questionsApi.patch(`/api/problem-questions/${id}/`, data);
  return response.data;
};

export const updateDiscursiveQuestion = async (id: number, data: {
  statement?: string;
  answer_text?: string;
  justification?: string | null;
}) => {
  const response = await questionsApi.patch(`/api/discursive-questions/${id}/`, data);
  return response.data;
};

export const updateMultipleChoiceQuestion = async (id: number, data: {
  statement?: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  option_e?: string;
  correct_option?: 'A'|'B'|'C'|'D'|'E';
  justification?: string | null;
}) => {
  const response = await questionsApi.patch(`/api/mc-questions/${id}/`, data);
  return response.data;
};

// Fetch pending challenges
export const fetchPendingChallenges = async () => {
  const response = await questionsApi.get('/api/challenges/pending/');
  return response.data;
};

// Fetch approved challenges
export const fetchApprovedChallenges = async () => {
  const response = await questionsApi.get('/api/challenges/');
  return response.data.filter((challenge: any) => challenge.status === 'APPROVED');
};

// Update challenge status
export const updateChallengeStatus = async (id: number, status: 'APPROVED' | 'PENDING') => {
  const response = await questionsApi.patch(`/api/challenges/${id}/`, { status });
  return response.data;
};

// Delete challenge
export const deleteChallenge = async (id: number) => {
  const response = await questionsApi.delete(`/api/challenges/${id}/`);
  return response.data;
};

// === CERTIFICATE APIs ===
export interface CertificateQuestion {
  id: number;
  statement: string;
  correct_answer: number;
  justification: string;
  challenge: {
    id: number;
    title: string;
    track: {
      name: string;
      program: {
        name: string;
      };
    };
  };
}

export interface CertificateQuestionsResponse {
  questions: CertificateQuestion[];
  total_questions: number;
  program: string;
  track: string;
}

// Get certificate questions for a specific program and track
export const getCertificateQuestions = async (program: string, track: string): Promise<CertificateQuestionsResponse> => {
  const response = await questionsApi.get('/api/certificate-questions/', {
    params: { program, track }
  });
  return response.data;
};

// Submit certificate test results
export const submitCertificateTest = async (data: {
  program: string;
  track: string;
  answers: { question_id: number; user_answer: number }[];
  score: number;
  passed: boolean;
}) => {
  const response = await progressApi.post('/progress/certificates/submit/', data);
  return response.data;
};

// Get completed certificates for the user
export interface CompletedCertificateData {
  program: string;
  track: string;
  score: number;
  completed_at: string;
  certificate_id: string;
}

export interface CompletedCertificatesResponse {
  completed_certificates: CompletedCertificateData[];
  total_completed: number;
}

export const getCompletedCertificates = async (): Promise<CompletedCertificatesResponse> => {
  console.log('🔍 API: Chamando getCompletedCertificates...');
  
  // Verificar se há token no localStorage
  const token = localStorage.getItem("accessToken");
  console.log('🔍 API: Token presente?', !!token);
  console.log('🔍 API: Token (primeiros 20 chars):', token ? token.substring(0, 20) + '...' : 'null');
  
  // Verificar se o usuário está logado
  if (!token) {
    console.error('🔍 API: Nenhum token encontrado - usuário não está logado');
    throw new Error('Usuário não está logado');
  }
  
  try {
    console.log('🔍 API: Fazendo requisição para /progress/certificates/completed/');
    const response = await progressApi.get('/progress/certificates/completed/');
    console.log('🔍 API: Resposta recebida:', response.data);
    console.log('🔍 API: Status da resposta:', response.status);
    console.log('🔍 API: Headers da resposta:', response.headers);
    return response.data;
  } catch (error) {
    console.error('🔍 API: Erro ao buscar certificados completados:', error);
    console.error('🔍 API: Status do erro:', error.response?.status);
    console.error('🔍 API: Dados do erro:', error.response?.data);
    console.error('🔍 API: Erro completo:', error);
    throw error;
  }
};

export const getPersistentCertificates = async (): Promise<any> => {
  console.log('🔍 API: Chamando getPersistentCertificates...');
  
  // Verificar se há token no localStorage
  const token = localStorage.getItem("accessToken");
  console.log('🔍 API: Token presente?', !!token);
  
  // Verificar se o usuário está logado
  if (!token) {
    console.error('🔍 API: Nenhum token encontrado - usuário não está logado');
    throw new Error('Usuário não está logado');
  }
  
  try {
    console.log('🔍 API: Fazendo requisição para /progress/certificates/persistent/');
    const response = await progressApi.get('/progress/certificates/persistent/');
    console.log('🔍 API: Resposta das certificações persistentes:', response.data);
    return response.data;
  } catch (error) {
    console.error('🔍 API: Erro ao buscar certificações persistentes:', error);
    console.error('🔍 API: Status do erro:', error.response?.status);
    console.error('🔍 API: Dados do erro:', error.response?.data);
    throw error;
  }
};

// Transformar BackendChallenge para o formato atual do frontend
export const transformChallengeForList = (backendChallenge: BackendChallenge): Challenge => {
  const totalQuestions = 
    (backendChallenge.multiple_choice_questions?.length || 0) +
    (backendChallenge.discursive_questions?.length || 0) +
    (backendChallenge.problem_questions?.length || 0);

  return {
    id: backendChallenge.id,
    title: backendChallenge.title || `Desafio ${backendChallenge.id}`,
    questions: totalQuestions,
    description: `${backendChallenge.program_name} - ${backendChallenge.track_name}`
  };
};

// Filtrar desafios por dificuldade
export const getChallengesByDifficulty = async (difficulty: 'EASY' | 'MEDIUM' | 'HARD'): Promise<Challenge[]> => {
  const approvedChallenges = await fetchApprovedChallenges();
  const filtered = approvedChallenges.filter(challenge => challenge.difficulty === difficulty);
  return filtered.map(transformChallengeForList);
};

export const transformQuestionsForQuiz = (backendChallenge: BackendChallenge): QuizQuestion[] => {
  const quizQuestions: QuizQuestion[] = [];

  // Múltipla escolha
  if (backendChallenge.multiple_choice_questions) {
    backendChallenge.multiple_choice_questions.forEach((mcq) => {
      const options = [mcq.option_a, mcq.option_b, mcq.option_c, mcq.option_d, mcq.option_e];
      const correctAnswerIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(mcq.correct_option);

      quizQuestions.push({
        id: mcq.id,
        type: 'multiple-choice',
        question: mcq.statement,
        options,
        correctAnswerIndex,
        justification: mcq.justification || 'Justificativa não disponível.'
      });
    });
  }
  
  if (backendChallenge.problem_questions) {
    backendChallenge.problem_questions.forEach((pq) => {
      quizQuestions.push({
        id: pq.id,
        type: 'problem', 
        question: pq.statement,
        correctAnswer: Number(pq.correct_answer),
        justification: pq.justification || 'Justificativa não disponível.'
      });
    });
  }

  if (backendChallenge.discursive_questions) {
    backendChallenge.discursive_questions.forEach((dq) => {
      quizQuestions.push({
        id: dq.id,
        type: 'essay',
        question: dq.statement,
        justification: dq.justification || dq.answer_text || 'Justificativa não disponível.'
      });
    });
  }

  return quizQuestions;
};

export const parseTrailId = (trailId: string): { program: string; trailNumber: number; trailName: string } => {
  const trailMappings = {
    // PROIND
    'proind-calculo-incentivo': { program: 'PROIND', trailNumber: 1, trailName: 'Cálculo do Incentivo' },
    'proind-lancamentos-incentivo': { program: 'PROIND', trailNumber: 2, trailName: 'Lançamentos do Incentivo' },
    'proind-controles-suplementares': { program: 'PROIND', trailNumber: 3, trailName: 'Controles Suplementares' },
    'proind-concessao-incentivo': { program: 'PROIND', trailNumber: 4, trailName: 'Concessão do Incentivo' },
    
    // PRODEPE
    'prodepe-calculo-incentivo': { program: 'PRODEPE', trailNumber: 1, trailName: 'Cálculo do Incentivo' },
    'prodepe-lancamentos-incentivo': { program: 'PRODEPE', trailNumber: 2, trailName: 'Lançamentos do Incentivo' },
    'prodepe-controles-suplementares': { program: 'PRODEPE', trailNumber: 3, trailName: 'Controles Suplementares' },
    'prodepe-concessao-incentivo': { program: 'PRODEPE', trailNumber: 4, trailName: 'Concessão do Incentivo' },
    
    // PRODEAUTO
    'prodeauto-calculo-incentivo': { program: 'PRODEAUTO', trailNumber: 1, trailName: 'Cálculo do Incentivo' },
    'prodeauto-lancamentos-incentivo': { program: 'PRODEAUTO', trailNumber: 2, trailName: 'Lançamentos do Incentivo' },
    'prodeauto-controles-suplementares': { program: 'PRODEAUTO', trailNumber: 3, trailName: 'Controles Suplementares' },
    'prodeauto-concessao-incentivo': { program: 'PRODEAUTO', trailNumber: 4, trailName: 'Concessão do Incentivo' },
  };

  const mapping = trailMappings[trailId as keyof typeof trailMappings];
  if (!mapping) {
    throw new Error(`Trail ID não encontrado: ${trailId}`);
  }

  return mapping;
};

export const getChallengesByTrailAndDifficulty = async (
  trailId: string, 
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
): Promise<Challenge[]> => {
  try {
    const { program, trailName } = parseTrailId(trailId);
    
    const approvedChallenges = await fetchApprovedChallenges();
    
    // Filtrar por programa e dificuldade
    const candidates = approvedChallenges.filter(challenge => 
      challenge.program_name === program &&
      challenge.difficulty === difficulty && 
      challenge.status === 'APPROVED'
    );
    
    // Filtrar por conteúdo da trilha (ignora numeração, usa palavras-chave)
    const filtered = candidates.filter(challenge => {
      const trackName = challenge.track_name?.toLowerCase() || '';
      const title = challenge.title?.toLowerCase() || '';
      
      // Verificar tipo de trilha baseado no conteúdo
      if (trailName.includes('Cálculo')) {
        return trackName.includes('cálculo') || title.includes('cálculo') ||
               trackName.includes('calculo') || title.includes('calculo');
      }
      
      if (trailName.includes('Lançamentos')) {
        return trackName.includes('lançamento') || title.includes('lançamento') ||
               trackName.includes('lancamento') || title.includes('lancamento');
      }
      
      if (trailName.includes('Controles')) {
        return trackName.includes('controle') || title.includes('controle') ||
               trackName.includes('suplementar') || title.includes('suplementar');
      }
      
      if (trailName.includes('Concessão')) {
        return trackName.includes('concessão') || title.includes('concessão') ||
               trackName.includes('concessao') || title.includes('concessao');
      }
      
      return false;
    });
    
    return filtered.map(transformChallengeForList);
    
  } catch (error) {
    console.error('Erro ao filtrar desafios por trilha:', error);
    return [];
  }
};