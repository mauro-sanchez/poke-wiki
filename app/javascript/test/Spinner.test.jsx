import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Spinner from "../components/Spinner";

describe("Spinner component", () => {
  const renderSpinner = () => {
    render(<Spinner isLoading={true} />, { wrapper: MemoryRouter });
  };
  test("render Spinner", () => {
    renderSpinner();
  });
});
