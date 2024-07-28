import React from "react";
import App from "../components/App";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");

describe("App component", () => {
  // window.ResizeObserver = ResizeObserver;
  const renderApp = () => {
    render(<App />, { wrapper: MemoryRouter });
  };
  test("Check Bulbasaur", () => {
    renderApp();
    setTimeout(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    }, 1);
  });
  test("Check for Pikachu", () => {
    renderApp();
    setTimeout(() => {
      fireEvent.click(screen.getByText("3"));
      setTimeout(() => {
        expect(screen.getByText("Pikachu")).toBeInTheDocument();
      }, 2)
    });
  });
});
