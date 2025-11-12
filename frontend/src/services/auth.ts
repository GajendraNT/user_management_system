// src/services/auth.ts
import api from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/users/me",);
  return data;
};
