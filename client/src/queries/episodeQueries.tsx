import { gql } from "@apollo/client";

export const GET_EPISODE_BY_NAME = gql`
  query getEpisodeByName($episodeName: String!) {
    episodeByName(episodeName: $episodeName) {
      _id
      episodeName
      description
      season
      episode
    }
  }
`;

export const GET_EPISODES = gql`
  query getEpisodes {
    episodes {
      _id
      episodeName
      description
      season
      episode
    }
  }
`;
