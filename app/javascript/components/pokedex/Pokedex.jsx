import React, { useEffect, useState } from "react";
import { getPokemonList } from "../../functions/calls";
import { getPokemonListData, LIMIT } from "../../functions/common";
import PokemonItem from "./PokemonItem";
import Spinner from "../Spinner";
import Pagination from "./Pagination";

export const Pokedex = () => {
  // const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonItems, setPokemonItems] = useState([]);

  const getPokemons = ({ newOffset = 0 }) => {
    setIsLoading(true);
    getPokemonList({ offset: newOffset })
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
          // setPokemonList(pokemonList);
          loadPokemonItems(pokemonList);
        });
        setOffset(newOffset);
      })
      .catch((error) => console.error(error));
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
    setIsLoading(false);
  };

  const handlePageClick = (page) => {
    const newOffset = page * LIMIT - LIMIT;
    getPokemons({ newOffset });
  };

  return (
    <div className="pokedex">
      <Spinner isLoading={isLoading} />
      <div className="pokedex-screen">
        <div className="pokemon-list">{pokemonItems}</div>
        <Pagination
          currentOffset={offset}
          totalCount={totalPokemons}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default Pokedex;
