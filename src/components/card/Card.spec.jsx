import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card"; // Adjust the import path accordingly
import "@testing-library/jest-dom"; // Ensure jest-dom is imported

describe("Card component", () => {
  const doctorMock = {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    photo: "https://via.placeholder.com/150",
    rating: 4.5,
    location: "New York, NY",
    availability: [
      { day: "Monday", time: "10:00 AM" },
      { day: "Wednesday", time: "2:00 PM" },
    ],
  };

  const onBookClickMock = jest.fn();

  test("renders doctor's name, specialty, and location", () => {
    render(<Card doctor={doctorMock} onBookClick={onBookClickMock} />);

    const nameElement = screen.getByText(/Dr\. John Doe/i);
    expect(nameElement).toBeInTheDocument();

    const specialtyElement = screen.getByText(/Cardiologist/i);
    expect(specialtyElement).toBeInTheDocument();

    const locationElement = screen.getByText(/New York, NY/i);
    expect(locationElement).toBeInTheDocument();
  });

  test("renders doctor's photo with correct alt text", () => {
    render(<Card doctor={doctorMock} onBookClick={onBookClickMock} />);

    const photoElement = screen.getByAltText("Dr. John Doe");
    expect(photoElement).toBeInTheDocument();
    expect(photoElement).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test("renders availability slots correctly", () => {
    render(<Card doctor={doctorMock} onBookClick={onBookClickMock} />);

    const slotElements = screen.getAllByText(/at/i);
    expect(slotElements.length).toBe(2);
    expect(slotElements[0]).toHaveTextContent("Monday at 10:00 AM");
    expect(slotElements[1]).toHaveTextContent("Wednesday at 2:00 PM");
  });

  test("renders 'No slots available' message if no availability", () => {
    const doctorNoAvailabilityMock = { ...doctorMock, availability: [] };
    render(
      <Card doctor={doctorNoAvailabilityMock} onBookClick={onBookClickMock} />
    );

    const noAvailabilityMessage = screen.getByText(/No slots available/i);
    expect(noAvailabilityMessage).toBeInTheDocument();
  });

  test("renders 'Book now' button when availability is present", () => {
    render(<Card doctor={doctorMock} onBookClick={onBookClickMock} />);

    const bookButton = screen.getByText(/Book now/i);
    expect(bookButton).toBeInTheDocument();
  });

  test("does not render 'Book now' button if no availability", () => {
    const doctorNoAvailabilityMock = { ...doctorMock, availability: [] };
    render(
      <Card doctor={doctorNoAvailabilityMock} onBookClick={onBookClickMock} />
    );

    const bookButton = screen.queryByText(/Book now/i);
    expect(bookButton).not.toBeInTheDocument();
  });

  test("calls onBookClick when 'Book now' button is clicked", () => {
    render(<Card doctor={doctorMock} onBookClick={onBookClickMock} />);

    const bookButton = screen.getByText(/Book now/i);

    fireEvent.click(bookButton);

    expect(onBookClickMock).toHaveBeenCalledTimes(1);
  });
});
