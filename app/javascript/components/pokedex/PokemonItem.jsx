import React from "react";
import { generateImageLink } from "../../functions/common";
import PropTypes from "prop-types";

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
  const abilities = pokemon.abilities
    .map((ab) => ab.ability.name.replaceAll("-", " "))
    .join(", ");
  return (
    <div className="pokemon-item" onClick={() => handleClick(pokemon)}>
      <div className="card">
        <div className={classNameType}>
          <div className="pokemon-number">#{pokemon.id}</div>
          <div className="pokemon-types">{typeBadges}</div>
          <img
            src={pokemonImage}
            alt={`#${pokemon.id} ${pokemonName}`}
            className="pokemon-image "
          />
        </div>
        <div className="card-body">
          <div className="card-title d-flex flex-column">
            <div className="pokemon-title">{pokemonName}</div>
            <div className="pokemon-weight">{pokemon.weight / 10} kg</div>
            <div className="row">
              <div className="col-12 fw-bold">Abilities</div>
              <div className="col-12 text-capitalize">{abilities}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    weight: PropTypes.number,
    species: PropTypes.shape({
      name: PropTypes.string,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
    nationalPokedexNumber: PropTypes.number,
  }),
  handleClick: PropTypes.func,
};

export default PokemonItem;
