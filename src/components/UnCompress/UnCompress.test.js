import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import UnCompress from "./UnCompress";

describe("Uncompress Component", () => {
  it("Show input field and button", () => {
    render(<UnCompress />);

    const inputElement = screen.getByTestId("string-input-field");
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "Uncompress" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  it("uncompress input string", () => {
    render(<UnCompress />);

    const inputElement = screen.getByTestId("string-input-field");
    fireEvent.change(inputElement, { target: { value: "3(ab)" } });

    const buttonElement = screen.getByRole("button", { name: "Uncompress" });
    fireEvent.click(buttonElement);

    expect(screen.getByText("Output: ababab")).toBeInTheDocument();
  });
});
