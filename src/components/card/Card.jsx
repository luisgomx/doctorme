import React, { useState } from "react";
import {
  IoLocationOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";
import { useDoctorsStore } from "../../store/useDoctorsStore";

const Card = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const bookAppointment = useDoctorsStore((state) => state.bookAppointment);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={`full-${i}`} className="inline-block" />);
    }
    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half" className="inline-block" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoStarOutline key={`empty-${i}`} className="inline-block" />);
    }
    return stars;
  };

  const handleBook = () => {
    if (selectedSlot) {
      bookAppointment(doctor.id, selectedSlot);
      setIsModalOpen(false);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="bg-blue-100 p-5 rounded-lg text-black hover:scale-105 transition-transform">
      <img
        className="w-52 h-52 object-cover rounded-md"
        src={doctor.photo}
        alt={doctor.name}
      />
      <div className="text-center tracking-widest">
        <p className="font-bold">{doctor.name}</p>
        <p className="font-light">{doctor.specialty}</p>
        <div className="mt-1 flex justify-center gap-1 text-yellow-500">
          {renderStars(doctor.rating)}
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <IoLocationOutline />
          <p>{doctor.location}</p>
        </div>
        <div className="mt-5 text-left">
          <p className="text-sm font-extrabold">Availability</p>
          {doctor.availability.length === 0 ? (
            <p className="text-sm text-red-600">No slots available</p>
          ) : (
            doctor.availability.map((slot, i) => (
              <p className="text-sm" key={i}>
                {slot.day} at {slot.time}
              </p>
            ))
          )}
        </div>

        {doctor.availability.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-white text-black rounded hover:scale-105 transition"
          >
            Book now
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Select a slot</h2>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {doctor.availability.map((slot, i) => (
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
                onClick={handleBook}
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

export default Card;
