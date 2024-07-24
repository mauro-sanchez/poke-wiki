import React, { useEffect, useState } from "react";
import PokemonItem from "./PokemonItem";

export const PokemonList = ({ pokemonList, handleClick }) => {
  const [pokeData, setPokeData] = useState(pokemonList);

  useEffect(() => {
    setPokeData(pokemonList);
  }, [JSON.stringify(pokemonList)]);
  const pokemons = [...pokeData].map((pokemon) => (
    <PokemonItem pokemon={pokemon} handleClick={handleClick} key={pokemon.id} />
  ));
  console.log(pokemonList);
  return <div className="pokemon-list">{pokemons}</div>;
};

export default PokemonList;
