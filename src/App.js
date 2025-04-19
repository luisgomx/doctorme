import React, { useState, useMemo } from "react";
import ContentContainer from "./components/containers/ContentContainer";
import HeaderContainer from "./components/containers/HeaderContainer";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { doctors as allDoctors } from "./mocks/doctors";
import SearchInput from "./components/searchInput/SearchInput";

function App() {
  const [filters, setFilters] = useState({ specialty: "", day: "" });

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
    </>
  );
}

export default App;
