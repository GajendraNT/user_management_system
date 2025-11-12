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

export const getEmployees = async (
  page = 1,
  limit = 10,
  search = "",
  sortBy = "first_name",
  sortOrder = "asc",
  bloodGroup = "all"
) => {
  const token = localStorage.getItem("access_token");
  const skip = (page - 1) * limit;

  const params: any = {
    skip,
    limit,
    search,
    sort_by: sortBy,
    sort_order: sortOrder,
  };
  if (bloodGroup !== "all") params.blood_group = bloodGroup;

  const { data } = await api.get("/admin/employees", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteEmployee = async (userId: number) => {
  const token = localStorage.getItem("access_token");
  const { data } = await api.delete(`/admin/employees/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
