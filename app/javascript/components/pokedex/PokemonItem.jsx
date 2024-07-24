import React from "react";
import { generateImageLink } from "../../functions/common";

export const PokemonItem = ({ pokemon, handleClick }) => {
  const pokemonId = pokemon.id;
  const pokemonImage = generateImageLink({ pokemonId });
  const pokemonName = pokemon.name;
  const pokemonTitle = `#${pokemonId} ${pokemonName}`;
  console.log(pokemon)
  return (
    <div className="pokemon-item" onClick={handleClick}>
      <img src={pokemonImage} alt={pokemonTitle} />
      <div className="pokemon-title">{pokemonTitle}</div>
    </div>
  );
};

export default PokemonItem;
