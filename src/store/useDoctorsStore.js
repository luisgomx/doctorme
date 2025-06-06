import { create } from "zustand";

export const useDoctorsStore = create((set, get) => ({
  doctors: [
    {
      id: "doc1",
      name: "Dr. Laura Martínez",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      specialty: "Cardiologist",
      availability: [
        { day: "Monday", time: "10:00 AM" },
        { day: "Wednesday", time: "2:00 PM" },
      ],
      location: "Clinic San José",
      rating: 4.8,
    },
    {
      id: "doc2",
      name: "Dr. David Torres",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
      specialty: "Pediatrician",
      availability: [
        { day: "Tuesday", time: "1:00 PM" },
        { day: "Thursday", time: "9:00 AM" },
      ],
      location: "Hospital del Sol",
      rating: 4.3,
    },
    {
      id: "doc3",
      name: "Dra. Mariana Ruiz",
      photo: "https://randomuser.me/api/portraits/women/36.jpg",
      specialty: "Dermatologist",
      availability: [
        { day: "Friday", time: "11:00 AM" },
        { day: "Saturday", time: "4:00 PM" },
      ],
      location: "Centro Médico Norte",
      rating: 4.6,
    },
    {
      id: "doc4",
      name: "Dr. Javier Hernández",
      photo: "https://randomuser.me/api/portraits/men/48.jpg",
      specialty: "Neurologist",
      availability: [
        { day: "Monday", time: "9:00 AM" },
        { day: "Thursday", time: "3:00 PM" },
      ],
      location: "NeuroCentro MX",
      rating: 4.9,
    },
  ],
  filters: {
    specialty: "",
    day: "",
  },
  appointments: [],

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  bookAppointment: (doctorId, slotToRemove) => {
    const state = get();
    const doctor = state.doctors.find((doc) => doc.id === doctorId);
    if (!doctor) return;

    set({
      doctors: state.doctors.map((doc) =>
        doc.id === doctorId
          ? {
              ...doc,
              availability: doc.availability.filter(
                (slot) =>
                  !(
                    slot.day === slotToRemove.day &&
                    slot.time === slotToRemove.time
                  )
              ),
            }
          : doc
      ),
      appointments: [
        ...state.appointments,
        {
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          photo: doctor.photo,
          location: doctor.location,
          slot: slotToRemove,
        },
      ],
    });
  },
  cancelAppointment: (doctorId, slotToReturn) => {
    const state = get();

    set({
      doctors: state.doctors.map((doc) =>
        doc.id === doctorId
          ? {
              ...doc,
              availability: [...doc.availability, slotToReturn],
            }
          : doc
      ),
      appointments: state.appointments.filter(
        (appt) =>
          !(
            appt.doctorId === doctorId &&
            appt.slot.day === slotToReturn.day &&
            appt.slot.time === slotToReturn.time
          )
      ),
    });
  },
}));
