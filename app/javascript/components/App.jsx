import React, { createContext, StrictMode } from "react";
import Container from "./pokedex/Container";
import Pokedex from "./pokedex/Pokedex";

export const fetchContext = createContext(null);

export const App = ({ fetchOrigin }) => {
  return (
    <StrictMode>
      <fetchContext.Provider value={fetchOrigin}>
        <main className="container overflow-hidden">
          <Container>
            <Pokedex />
          </Container>
        </main>
      </fetchContext.Provider>
    </StrictMode>
  );
};

export default App;
