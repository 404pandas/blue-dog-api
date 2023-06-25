import { useQuery } from "@apollo/client";
import ShortRow from "./ShortRow";
import { GET_SHORTS } from "../queries/shortQueries";

// MUI imports
import * as React from "react";

export default function Shorts() {
  const { loading, error, data } = useQuery(GET_SHORTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.shorts);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.shorts.map((short) => (
            <ShortRow key={short.id} short={short} />
          ))}
        </div>
      )}
    </>
  );
}
