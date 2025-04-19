import React from "react";
import { doctors } from "../../mocks/doctors";
import Card from "../card/Card";

const List = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {doctors.map((doctor) => {
        return <Card doctor={doctor} />;
      })}
    </div>
  );
};

export default List;
