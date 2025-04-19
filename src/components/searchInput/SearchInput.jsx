import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [specialtyQuery, setSpecialtyQuery] = useState("");
  const [dayFilter, setDayFilter] = useState("");

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
    const newSpecialty = name === "specialty" ? value : specialtyQuery;
    const newDay = name === "day" ? value : dayFilter;

    setSpecialtyQuery(newSpecialty);
    setDayFilter(newDay);

    onSearch({ specialty: newSpecialty, day: newDay });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4">
      <input
        type="text"
        name="specialty"
        value={specialtyQuery}
        onChange={handleChange}
        placeholder="Search by specialty..."
        className="p-2 border rounded w-full md:w-1/2"
      />
      <select
        name="day"
        value={dayFilter}
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
