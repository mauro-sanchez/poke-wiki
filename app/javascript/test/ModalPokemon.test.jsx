import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonModal from "../components/pokedex/PokemonModal";

describe("Pokemon modal component", () => {
  const renderPokemonModal = (pokemon) => {
    render(<PokemonModal pokemon={pokemon} modalRef={null}/>, { wrapper: MemoryRouter });
  };
  test("render modal with null pokemon", () => {
    renderPokemonModal(null);
  });
  test("render modal with pokemon", () => {
    
  })
});
