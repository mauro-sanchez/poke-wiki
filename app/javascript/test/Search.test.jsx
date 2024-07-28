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
    const app = render(<App />, { wrapper: MemoryRouter });
    const input = app.container.querySelector("#search-input");
    return {
      input,
      app
    };
  };
  test("Search not existent pokemon", () => {
    const { input, app } = renderApp();
    fireEvent.change(input, { target: { value: "pokachu" } });
    fireEvent.click(app.container.querySelector("#search-button"));
    setTimeout(() => {
      expect(screen.getByText("Pokemon not found"));
    }, 1)
  });

  test("Search Suicune", () => {
    const { input, app } = renderApp();
    fireEvent.change(input, { target: { value: "suicune" } });
    fireEvent.click(app.container.querySelector("#search-button"));
    setTimeout(() => {
      expect(screen.getByText("187 kg"));
    }, 1)
  });
});
