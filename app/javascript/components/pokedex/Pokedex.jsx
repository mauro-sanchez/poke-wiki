import React, { useEffect, useRef, useState } from "react";
import {
  getPokemonEvolutions,
  getPokemonFlavorText,
  getPokemonList,
} from "../../functions/calls";
import {
  getPokemonDeepData,
  getPokemonListData,
  LIMIT,
} from "../../functions/common";
import PokemonItem from "./PokemonItem";
import Spinner from "../Spinner";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";
import axios from "axios";

export const Pokedex = () => {
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonItems, setPokemonItems] = useState([]);

  const pokemonModalRef = useRef();
  const searchModalRef = useRef();

  useEffect(() => {
    const modalPokemon = new bootstrap.Modal(pokemonModalRef.current);
    // const modalSearch = new bootstrap.Modal(searchModalRef.current);
  }, []);

  const getPokemons = ({ newOffset = 0 }) => {
    setIsLoading(true);
    let pokemonList = [];
    getPokemonList({ offset: newOffset })
      .then((response) => {
        const totalPokemons = response?.data?.count;
        setTotalPokemons(totalPokemons);
        return response?.data?.results;
      })
      .then((response) => getPokemonListData({ pokemonList: response }))
      .then((response) => {
        pokemonList = response.map((x) => x.data);
        return getPokemonDeepData({ pokemonList });
      })
      .then((results) => {
        pokemonList.forEach((pokemon) => {
          const pokemonData = results.find(
            (x) => x.data.name === pokemon.species.name
          ).data;
          const flavorTexts = pokemonData.flavor_text_entries.filter(
            (text) => text.language.name === "en"
          );
          pokemon.description = flavorTexts[flavorTexts.length - 1].flavor_text;
          pokemon.nationalPokedexNumber = pokemonData.pokedex_numbers.find(
            (x) => x.pokedex.name === "national"
          ).entry_number;
          pokemon.evolutionChainUrl = pokemonData.evolution_chain.url;
        });
        loadPokemonItems(pokemonList);
      })
      .catch((error) => console.error(error))
      .finally(() => setOffset(newOffset));
  };

  useEffect(() => {
    getPokemons({});
  }, []);

  const loadPokemonItems = (list) => {
    const pokemonItems = list.map((pokemon) => {
      return (
        <PokemonItem
          pokemon={pokemon}
          handleClick={(pokemon) => handlePokemonClick(pokemon)}
          key={pokemon.id}
        />
      );
    });
    setPokemonItems(pokemonItems);
    setIsLoading(false);
  };

  const handlePokemonClick = (pokemon) => {
    setIsLoading(true);
    getPokemonEvolutions({ url: pokemon.evolutionChainUrl })
      .then((response) => {
        pokemon.evolutionChain = response.data;
        setActivePokemon(pokemon);
      })
      .finally(() => {
        showPokemonModal();
        setIsLoading(false);
      });
  };

  const showPokemonModal = () =>
    bootstrap.Modal.getInstance(pokemonModalRef.current).show();

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
      <PokemonModal modalRef={pokemonModalRef} pokemon={activePokemon} />
    </div>
  );
};

export default Pokedex;
