import Axios from "axios";
import { LIMIT } from "./common";
import { setupCache } from 'axios-cache-interceptor';

const instance = Axios.create();
const axios = setupCache(instance);

export const getPokemonList = ({ offset }) =>
  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPokemonData = ({ id }) =>
  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
