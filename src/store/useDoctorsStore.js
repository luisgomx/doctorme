import create from "zustand";
import { doctors as initialDoctors } from "../mocks/doctors";

const useDoctorsStore = create((set, get) => ({
  doctors: initialDoctors,
  filters: { specialty: "", day: "" },

  setFilters: (specialty, day) => set({ filters: { specialty, day } }),

  bookAppointment: (doctorId, slotIndex) => {
    set((state) => ({
      doctors: state.doctors.map((doc) => {
        if (doc.id !== doctorId) return doc;
        return {
          ...doc,
          availability: doc.availability.filter((_, idx) => idx !== slotIndex),
        };
      }),
    }));
  },
}));

export default useDoctorsStore;
