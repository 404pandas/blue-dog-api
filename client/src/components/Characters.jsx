import { useQuery } from "@apollo/client";
import CharacterRow from "./CharacterRow";
import { GET_CHARACTERS } from "../queries/characterQueries";

// MUI imports
import * as React from "react";

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data);
  return (
    <>
      {!loading && !error && (
        <div>
          <CharacterRow key={data.id} character={data} />
        </div>
      )}
    </>
  );
}
