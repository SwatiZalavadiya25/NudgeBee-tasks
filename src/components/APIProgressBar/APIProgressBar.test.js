import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ProgressBar from "./APIProgressBar";

global.fetch = jest.fn();

describe("ProgressBar Component", () => {

  it("displays message on successful response", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: "mocked data" }),
      })
    );

    render(<ProgressBar />);

    await waitFor(() => {
      expect(screen.getByText("All requests successful")).toBeInTheDocument();
    });

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "100%" });
    expect(progressBar).toHaveClass("progress-bar-fill");
  });

  it("Show error message on failure response", async () => {
    fetch
      .mockImplementationOnce(() => Promise.resolve({ ok: true }))
      .mockImplementationOnce(() => Promise.resolve({ ok: true }))
      .mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(<ProgressBar />);

    await waitFor(() => {
      expect(screen.getByText("Request failed")).toBeInTheDocument();
    });

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveClass("progress-bar-error");
  });
});
