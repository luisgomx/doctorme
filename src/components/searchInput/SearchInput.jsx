import React from "react";
import { useDoctorsStore } from "../../store/useDoctorsStore";

const SearchInput = () => {
  const filters = useDoctorsStore((state) => state.filters);
  const setFilters = useDoctorsStore((state) => state.setFilters);

  const days = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4 pl-0 pr-0">
      <input
        type="text"
        name="specialty"
        value={filters.specialty}
        onChange={handleChange}
        placeholder="Search by specialty..."
        className="p-2 border rounded w-full md:w-1/2"
      />
      <select
        name="day"
        value={filters.day}
        onChange={handleChange}
        className="p-2 border rounded w-full md:w-1/3"
      >
        {days.map((d) => (
          <option key={d} value={d}>
            {d === "" ? "All days" : d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchInput;
