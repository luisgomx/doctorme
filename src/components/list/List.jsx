import React from "react";
import Card from "../card/Card";

const List = ({ doctors }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {doctors.map((doctor) => {
        return <Card doctor={doctor} />;
      })}
    </div>
  );
};

export default List;
