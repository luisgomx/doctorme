import React, { useState, useMemo } from "react";
import ContentContainer from "./components/containers/ContentContainer";
import HeaderContainer from "./components/containers/HeaderContainer";
import Header from "./components/header/Header";
import List from "./components/list/List";
import SearchInput from "./components/searchInput/SearchInput";
import AppointmentsList from "./components/appointmentsList/AppointmentsList";
import { useDoctorsStore } from "./store/useDoctorsStore";
import { doctors as allDoctors } from "./mocks/doctors";

function App() {
  const [filters, setFilters] = useState({ specialty: "", day: "" });
  const [showAppointments, setShowAppointments] = useState(false);
  const appointments = useDoctorsStore((state) => state.appointments);

  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((doc) => {
      const matchSpec = doc.specialty
        .toLowerCase()
        .includes(filters.specialty.toLowerCase());
      const matchDay = filters.day
        ? doc.availability.some((slot) => slot.day === filters.day)
        : true;
      return matchSpec && matchDay;
    });
  }, [filters]);

  return (
    <>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <ContentContainer>
        <SearchInput onSearch={setFilters} />
        <List doctors={filteredDoctors} />
      </ContentContainer>

      {appointments.length > 0 && (
        <button
          onClick={() => setShowAppointments(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-40"
        >
          View Appointments
        </button>
      )}

      {showAppointments && (
        <AppointmentsList onClose={() => setShowAppointments(false)} />
      )}
    </>
  );
}

export default App;
