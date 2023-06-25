import { useQuery } from "@apollo/client";
import LocationRow from "./LocationRow";
import { GET_LOCATIONS } from "../queries/locationQueries";

// MUI imports
import * as React from "react";

export default function Locations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.locations);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.locations.map((location) => (
            <LocationRow key={location.id} location={location} />
          ))}
        </div>
      )}
    </>
  );
}
