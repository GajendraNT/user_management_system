import { useEffect, useRef, useState } from "react";
import type { Employee, SortOption } from "../types";
import { addEmployee, deleteEmployee, getEmployees } from "../services/admin";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");

  const [fetching, setFetching] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchIdRef = useRef(0);

  const getSortConfig = () => {
    switch (sortOption) {
      case "name_asc":
        return ["first_name", "asc"];
      case "name_desc":
        return ["first_name", "desc"];
      case "email_asc":
        return ["email", "asc"];
      case "email_desc":
        return ["email", "desc"];
      default:
        return ["first_name", "asc"];
    }
  };

  const fetchEmployeesCore = async ({
    currentPage = page,
    currentSearch = searchTerm,
    currentBlood = bloodGroupFilter,
  } = {}) => {
    const fetchId = ++fetchIdRef.current;
    setFetching(true);

    const [sort_by, sort_order] = getSortConfig();

    try {
      const resp = await getEmployees(
        currentPage,
        limit,
        currentSearch,
        sort_by,
        sort_order,
        currentBlood
      );

      if (fetchId !== fetchIdRef.current) return;

      setEmployees(resp.employees);
      setTotalCount(resp.total_count);

      if (resp.employees.length === 0 && currentPage > 1) {
        setPage((p) => Math.max(1, p - 1));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      if (fetchId === fetchIdRef.current) setFetching(false);
    }
  };

  useEffect(() => {
    fetchEmployeesCore();
  }, [page, sortOption, bloodGroupFilter]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchEmployeesCore({ currentPage: 1 });
    }, 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const addNewEmployee = async (payload: any) => {
    setLoadingAdd(true);
    try {
      await addEmployee(payload);
      await fetchEmployeesCore();
    } finally {
      setLoadingAdd(false);
    }
  };

  const deleteOneEmployee = async (empId: number) => {
    setLoadingDelete(true);
    try {
      await deleteEmployee(empId);
      await fetchEmployeesCore();
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    employees,
    totalCount,
    page,
    limit,
    searchTerm,
    sortOption,
    fetching,
    loadingAdd,
    loadingDelete,
    bloodGroupFilter,

    setSearchTerm,
    setSortOption,
    setPage,
    setBloodGroupFilter,

    addNewEmployee,
    deleteOneEmployee,
  };
}
