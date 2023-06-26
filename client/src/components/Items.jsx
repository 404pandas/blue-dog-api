import { useQuery } from "@apollo/client";
import ItemRow from "./ItemRow";
import { GET_ITEMS } from "../queries/itemQueries";

// MUI imports
import * as React from "react";

export default function Items() {
  const { loading, error, data } = useQuery(GET_ITEMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.items);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
