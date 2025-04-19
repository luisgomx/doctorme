import React, { useMemo } from "react";
import { useDoctorsStore } from "../../store/useDoctorsStore";
import Card from "../card/Card";

const List = () => {
  const doctors = useDoctorsStore((state) => state.doctors);
  const filters = useDoctorsStore((state) => state.filters);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = filters.specialty
        ? doctor.specialty
            .toLowerCase()
            .includes(filters.specialty.toLowerCase())
        : true;

      const matchesDay = filters.day
        ? doctor.availability.some((slot) =>
            slot.day.toLowerCase().includes(filters.day.toLowerCase())
          )
        : true;

      return matchesSpecialty && matchesDay;
    });
  }, [doctors, filters]);

  return (
    <div className="flex flex-wrap gap-6">
      {filteredDoctors.map((doctor) => (
        <Card key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default List;
