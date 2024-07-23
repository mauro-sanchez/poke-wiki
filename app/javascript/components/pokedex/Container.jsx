import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="main-pokedex-tab">
        <div className="button-1"/>
        <div className="button-2"/>
        <div className="button-3"/>
      </div>
      <div className="main-pokedex-slop">

      </div>
      <div className="main-pokedex">{children}</div>
    </>
  );
};

export default Container;
