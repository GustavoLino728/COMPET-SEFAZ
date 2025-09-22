import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const registerUser = async (data: {
  name: string;
  email: string;
  linkedin?: string;
  cpf: string;
  password: string;
  re_password: string;
}) => {
  try {
    const response = await api.post("/users/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/token/login/", data);
    // Salvar token localmente
    localStorage.setItem("authToken", response.data.auth_token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    await api.post(
      "/token/logout/",
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    localStorage.removeItem("authToken");
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("/users/reset_password/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};