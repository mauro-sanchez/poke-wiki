import React from "react";
import { generateImageLink } from "../../functions/common";

export const PokemonModal = ({ pokemon, modalRef }) => {
  const name = pokemon?.species?.name;
  const pokemonId = pokemon?.id;
  const pokemonImage = generateImageLink({ pokemonId });
  const pokemonName = pokemon?.species?.name;
  const types = pokemon?.types || [];
  const principalType = types.length > 0 ? types[0].type : "";
  const classNameType = `col-12 col-md-6 pokemon-bg color-type-${principalType.name}`;
  const typeBadges = types.map((type, i) => {
    const typeImage = require(`images/types/${type.type.name}.webp`);
    return (
      <div className="badge-type" key={i}>
        <img src={typeImage} alt={`type ${type.type.name}`} />
      </div>
    );
  });
  return (
    <div
      className="modal fade"
      id="PokemonModal"
      aria-hidden="true"
      aria-labelledby="PokemonModalLabel"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-m-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
            <h5 className="modal-title" id="PokemonModalLabel">
              {name}
            </h5>
          </div>
          <div className="modal-body mx-3">
            <div className="row">
              <div className={classNameType}>
                <div className="pokemon-number">#{pokemon?.id}</div>
                <div className="pokemon-types">{typeBadges}</div>
                <img
                  src={pokemonImage}
                  alt={`#${pokemon?.id} ${pokemonName}`}
                  className="pokemon-image"
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12 pokemon-title">{pokemonName}</div>
                  <div className="col-12">{pokemon?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokemonModal;
