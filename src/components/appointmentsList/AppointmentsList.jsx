import React from "react";
import { useDoctorsStore } from "../../store/useDoctorsStore";

const AppointmentsList = ({ onClose }) => {
  const appointments = useDoctorsStore((state) => state.appointments);
  const cancelAppointment = useDoctorsStore((state) => state.cancelAppointment);

  const handleCancel = (doctorId, slot) => {
    cancelAppointment(doctorId, slot);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Your Appointments
        </h2>
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">
            No appointments booked yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt, i) => (
              <li
                key={i}
                className="border rounded p-3 flex items-center gap-4 justify-between"
              >
                <img
                  src={appt.photo}
                  alt={appt.doctorName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 ml-2">
                  <p className="font-semibold">{appt.doctorName}</p>
                  <p className="text-sm text-gray-600">{appt.specialty}</p>
                  <p className="text-sm">
                    {appt.slot.day} at {appt.slot.time}
                  </p>
                  <p className="text-sm text-gray-500">{appt.location}</p>
                </div>
                <button
                  onClick={() => handleCancel(appt.doctorId, appt.slot)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
