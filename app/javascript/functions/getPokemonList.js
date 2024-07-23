import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { LIMIT } from "./common";

const instance = Axios.create();
const axios = setupCache(instance);

export const getPokemonList = ({ offset }) => {
  return axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
