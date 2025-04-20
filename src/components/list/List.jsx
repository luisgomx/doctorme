import React, { useMemo, useState } from "react";
import { useDoctorsStore } from "../../store/useDoctorsStore";
import Card from "../card/Card";

const List = () => {
  const doctors = useDoctorsStore((state) => state.doctors);
  const filters = useDoctorsStore((state) => state.filters);
  const bookAppointment = useDoctorsStore((state) => state.bookAppointment);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleBookAppointment = () => {
    if (selectedSlot && selectedDoctor) {
      bookAppointment(selectedDoctor.id, selectedSlot);
      setIsModalOpen(false);
      setSelectedSlot(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            doctor={doctor}
            onBookClick={() => handleBookClick(doctor)}
          />
        ))}
      </div>

      {isModalOpen && selectedDoctor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Select a slot for {selectedDoctor.name}
            </h2>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {selectedDoctor.availability.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded border ${
                    selectedSlot?.day === slot.day &&
                    selectedSlot?.time === slot.time
                      ? "bg-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {slot.day} at {slot.time}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedSlot(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!selectedSlot}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
