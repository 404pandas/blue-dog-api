import { useQuery } from "@apollo/client";
import BookRow from "./BookRow";
import { GET_BOOKS } from "../queries/bookQueries";

// MUI imports
import * as React from "react";

export default function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.books);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.books.map((book) => (
            <BookRow key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
