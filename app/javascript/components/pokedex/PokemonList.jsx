import React from "react";
import PokemonItem from "./PokemonItem";

export const PokemonList = ({ pokemonList, handleClick }) => {
  const pokemons = pokemonList.map((pokemon) => (
    <PokemonItem pokemon={pokemon} handleClick={handleClick} key={pokemon.id} />
  ));
  return <div className="pokemon-list">{pokemons}</div>;
};

export default PokemonList;
