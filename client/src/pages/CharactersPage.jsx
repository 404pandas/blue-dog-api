import React from "react";
import AddCharacterModel from "../components/AddCharacterModel";
import Characters from "../components/Characters";
import Header from "../components/Header";

export default function CharactersPage() {
  return (
    <>
      <Header />
      <AddCharacterModel />
      <Characters />
    </>
  );
}
