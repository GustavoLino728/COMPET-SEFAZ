import axios from "axios";

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
