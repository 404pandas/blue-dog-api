import { useQuery } from "@apollo/client";
import CharacterRow from "./CharacterRow";
import { GET_CHARACTERS } from "../queries/characterQueries";

// MUI imports
import * as React from "react";

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.characters);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.characters.map((character) => (
            <CharacterRow key={character.id} character={character} />
          ))}
        </div>
      )}
    </>
  );
}
