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
  const { data } = await api.get("/auth/users/me");
  return data;
};

export const setupPassword = async (data: {
  new_password: string;
  confirm_password: string;
}) => {
  const response = await api.put("/auth/setup-password", data);
  return response.data;
};
