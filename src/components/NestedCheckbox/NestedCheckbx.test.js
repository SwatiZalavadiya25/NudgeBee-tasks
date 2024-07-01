import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import NestedCheckbx from "./NestedCheckbox";
describe("NestedCheckbx Component", () => {
  it("render component", () => {
    render(<NestedCheckbx />);
    expect(screen.getByTestId("parent-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("child-checkbox-1")).toBeInTheDocument();
  });

  it("toggle parent checkbox and all the child checkboxes", () => {
    render(<NestedCheckbx />);
    const parentCheckbox = screen.getByTestId(`parent-checkbox`);
    const childCheckboxes = screen
      .getAllByRole("checkbox")
      .filter((checkbox) => checkbox !== parentCheckbox);

    fireEvent.click(parentCheckbox);

    expect(parentCheckbox).toBeChecked();
    expect(childCheckboxes.length).toBe(5);
    childCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(parentCheckbox);

    expect(parentCheckbox).not.toBeChecked();
    childCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("toggle child checkboxes and update the parent checkboxe value", () => {
    render(<NestedCheckbx />);

    const parentCheckbox = screen.getByTestId("parent-checkbox");
    const childCheckboxes = screen
      .getAllByRole("checkbox")
      .filter((checkbox) => checkbox !== parentCheckbox);

    //scenario - When all child checkbox checked parent checkbox will also check
    childCheckboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    expect(parentCheckbox).toBeChecked();

    //scenario - Uncheck any one checkbox
    fireEvent.click(childCheckboxes[1]);
    expect(childCheckboxes[1]).not.toBeChecked();
    expect(parentCheckbox).not.toBeChecked();
  });

  it("Show the count of checked child checkboxes", () => {
    render(<NestedCheckbx />);

    const parentCheckbox = screen.getByTestId("parent-checkbox");
    const childCheckboxes = screen
      .getAllByRole("checkbox")
      .filter((checkbox) => checkbox !== parentCheckbox);

    fireEvent.click(childCheckboxes[1]);
    expect(
      screen.getByText("Checked count: 1 child is selected")
    ).toBeInTheDocument();

    fireEvent.click(childCheckboxes[4]);
    expect(
      screen.getByText("Checked count: 2 child is selected")
    ).toBeInTheDocument();
  });
});
