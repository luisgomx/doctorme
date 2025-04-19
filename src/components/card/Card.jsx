import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const Card = ({ doctor }) => {
  return (
    <div className="bg-blue-100 p-5 rounded-lg text-black hover:scale-105">
      <img
        className="w-52 h-52 object-cover rounded-md"
        src={doctor.photo}
        alt={doctor.name}
      />
      <div className="text-center tracking-widest">
        <p className="font-bold">{doctor.name}</p>
        <p className="font-light">{doctor.specialty}</p>
        <div className="flex items-center justify-center gap-1 tracking-normal">
          <IoLocationOutline />
          <p>{doctor.location}</p>
        </div>
        <div className="mt-5">
          <p className="text-left text-sm font-extrabold">Availabily</p>
          <div className="text-left tracking-normal">
            {doctor.availability.map((slot, i) => (
              <p className="text-sm" key={i}>
                {slot.day} at {slot.time}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
