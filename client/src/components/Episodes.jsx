import { useQuery } from "@apollo/client";
import EpisodeRow from "./EpisodeRow";
import { GET_EPISODES } from "../queries/episodeQueries";

// MUI imports
import * as React from "react";

export default function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  console.log(data.episodes);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.episodes.map((episode) => (
            <EpisodeRow key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </>
  );
}
