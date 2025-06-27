// src/services/authService.ts
import axios from 'axios';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  shopName: string;
}

const API_URL = 'http://localhost:5000';

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response; // ✅ response.data.user ต้องมี name และ shopName
};

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response;
};
