import React, { useState } from "react";
import { PokemonList } from "./PokemonList";

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();

  return (
    <div className="pokedex">
      <PokemonList pokemonList={pokemonList} handleClick={() => {}} />
    </div>
  );
};

export default Pokedex;
