import React, { createContext } from "react";
import pokeball from "images/pokeball_icon.svg";
import Container from "./pokedex/Container";
import Pokedex from "./pokedex/Pokedex";

export const fetchContext = createContext(null);

export const App = ({ fetchOrigin }) => {
  return (
    <fetchContext.Provider value={fetchOrigin}>
      <main className="container overflow-hidden">
        <Container>
          <Pokedex />
        </Container>
      </main>
    </fetchContext.Provider>
  );
};

export default App;
