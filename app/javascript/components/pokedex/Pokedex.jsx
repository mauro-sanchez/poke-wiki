import React, { useEffect, useState } from "react";
import { getPokemonList } from "../../functions/calls";
import { getPokemonListData, LIMIT } from "../../functions/common";
import PokemonItem from "./PokemonItem";

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonItems, setPokemonItems] = useState([]);

  const getPokemons = ({ isBackwards = false }) => {
    setIsLoading(true);
    getPokemonList({ offset })
      .then((response) => {
        const totalPokemons = response?.data?.count;
        setTotalPokemons(totalPokemons);
        return response?.data?.results;
      })
      .then((results) => {
        const pokemonPromise = getPokemonListData({
          pokemonList: results,
        });
        pokemonPromise.then((values) => {
          const pokemonList = values.map((x) => x.data);
          setPokemonList(pokemonList);
          loadPokemonItems(pokemonList);
        });
        const offset = isBackwards ? offset - LIMIT : offset + LIMIT;
        setOffset(offset);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPokemons({});
  }, []);

  const loadPokemonItems = (list) => {
    const pokemonItems = list.map((pokemon) => {
      console.log(pokemon);
      return (
        <PokemonItem
          pokemon={pokemon}
          handleClick={(pokemon) => setActivePokemon(pokemon)}
          key={pokemon.id}
        />
      );
    });
    setPokemonItems(pokemonItems);
  };

  return (
    <div className="pokedex">
      <div className="pokedex-screen">
        <div className="pokemon-list">{pokemonItems}</div>
      </div>
    </div>
  );
};

export default Pokedex;
