import React, { useEffect, useRef, useState } from "react";
import { getPokemonFlavorText, getPokemonList } from "../../functions/calls";
import { getPokemonListData, LIMIT } from "../../functions/common";
import PokemonItem from "./PokemonItem";
import Spinner from "../Spinner";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";

export const Pokedex = () => {
  // const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonItems, setPokemonItems] = useState([]);

  const pokemonModalRef = useRef();
  const searchModalRef = useRef();

  useEffect(() => {
    const modalPokemon = new bootstrap.Modal(pokemonModalRef.current);
    console.log(modalPokemon);
    // const modalSearch = new bootstrap.Modal(searchModalRef.current);
  }, []);

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
    getPokemonFlavorText({ id: pokemon?.id })
      .then((response) => {
        let pk = pokemon;
        const flavorTexts = response.data.flavor_text_entries.filter(
          (text) => text.language.name === "en"
        );
        pk.description = flavorTexts[flavorTexts.length - 1].flavor_text;
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
