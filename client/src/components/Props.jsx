import { useQuery } from "@apollo/client";
import PropRow from "./PropRow";
import { GET_PROPS } from "../queries/propQueries";

// MUI imports
import * as React from "react";

export default function Props() {
  const { loading, error, data } = useQuery(GET_PROPS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.props);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.props.map((prop) => (
            <PropRow key={prop.id} prop={prop} />
          ))}
        </div>
      )}
    </>
  );
}
