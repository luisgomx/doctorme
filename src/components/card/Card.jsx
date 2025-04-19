import React from "react";
import {
  IoLocationOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";

const Card = ({ doctor }) => {
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
        <div className="mt-1 flex justify-center gap-1 text-yellow-500">
          {renderStars(doctor.rating)}
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <IoLocationOutline />
          <p>{doctor.location}</p>
        </div>
        <div className="mt-5 text-left">
          <p className="text-sm font-extrabold">Availability</p>
          {doctor.availability.map((slot, i) => (
            <p className="text-sm" key={i}>
              {slot.day} at {slot.time}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
