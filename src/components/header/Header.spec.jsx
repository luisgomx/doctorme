import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  test('renders the "Find a Doctor!" button', () => {
    render(<Header />);

    const buttonElement = screen.getByText(/Find a Doctor!/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("button triggers alert when clicked", () => {
    render(<Header />);

    window.alert = jest.fn();

    const buttonElement = screen.getByText(/Find a Doctor!/i);
    buttonElement.click();

    expect(window.alert).toHaveBeenCalledWith("Gotcha!");
  });
});
