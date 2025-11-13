export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  blood_group?: string;
  first_login: boolean;
  role: "admin" | "employee";
}

export type SortOption =
  | "name_asc"
  | "name_desc"
  | "blood_asc"
  | "blood_desc"
  | "email_asc"
  | "email_desc";
