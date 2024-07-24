import React, { useEffect, useState } from "react";
import { PokemonList } from "./PokemonList";
import { getPokemonList } from "../../functions/calls";
import { getPokemonListData } from "../../functions/common";

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const getPokemons = async () => {
    setIsLoading(true);
    await getPokemonList({ offset })
      .then((response) => {
        const totalPokemons = response?.data?.count;
        setTotalPokemons(totalPokemons);
        const pokemonList = getPokemonListData({
          pokemonList: response?.data?.results,
        });
        setPokemonList(pokemonList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="pokedex">
      <div className="pokedex-screen">
        <PokemonList pokemonList={pokemonList} handleClick={() => {}} />
      </div>
    </div>
  );
};

export default Pokedex;
