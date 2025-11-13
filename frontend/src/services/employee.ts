import api from "./api";

export const updateEmployeeProfile = async (formData: any) => {
  const { data } = await api.put("/employee/setup-profile", formData);
  return data;
};
