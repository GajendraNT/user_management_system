import type { SortOption } from "../types";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  bloodGroupFilter: string;
  onBloodGroupChange: (value: string) => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
}: // bloodGroupFilter,
// onBloodGroupChange,
FilterBarProps) {
  // const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, or blood group..."
        className="flex-1 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Filter */}
      {/* <select
        value={bloodGroupFilter}
        onChange={(e) => onBloodGroupChange(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        <option value="all">All Blood Groups</option>
        {bloodGroups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select> */}

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        <option value="name_asc">Sort by Name (A-Z)</option>
        <option value="name_desc">Sort by Name (Z-A)</option>
        <option value="email_asc">Sort by Email (A-Z)</option>
        <option value="email_desc">Sort by Email (Z-A)</option>
        <option value="blood_asc">Sort by Blood Group (A-Z)</option>
        <option value="blood_desc">Sort by Blood Group (Z-A)</option>
      </select>
    </div>
  );
}
