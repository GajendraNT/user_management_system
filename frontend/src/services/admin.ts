import api from "./api";

interface NewEmployeePayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const addEmployee = async (employee: NewEmployeePayload) => {
  const token = localStorage.getItem("access_token");

  const { data } = await api.post("/admin/add-employee", employee, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
