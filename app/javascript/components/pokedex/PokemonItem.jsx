import React from "react";
import { generateImageLink } from "../../functions/common";

export const PokemonItem = ({ pokemon, handleClick }) => {
  const pokemonId = pokemon.id;
  const pokemonImage = generateImageLink({ pokemonId });
  const pokemonName = pokemon.species.name;
  const types = pokemon.types;
  const principalType = types[0].type;
  const classNameType = `card-img-top color-type-${principalType.name}`;
  const typeBadges = types.map((type, i) => {
    const typeImage = require(`images/types/${type.type.name}.webp`);
    return (
      <div className="badge-type" key={i}>
        <img src={typeImage} alt={`type ${type.type.name}`} />
      </div>
    );
  });
  console.log(pokemon);
  return (
    <div className="pokemon-item" onClick={handleClick}>
      <div className="card">
        <div className={classNameType}>
          <div className="pokemon-number">#{pokemon.order}</div>
          <img
            src={pokemonImage}
            alt={`#${pokemon.order} ${pokemonName}`}
            className="pokemon-image "
          />
        </div>
        <div className="card-body">
          <div className="card-title d-flex flex-column">
            <div className="pokemon-title">{pokemonName}</div>
            <div className="pokemon-types">{typeBadges}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
