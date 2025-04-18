import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      _id
      characterName
      species
      breed
      gender
      age
      catchphrase
      hobbies
      friends
      firstAppearance
      notableEpisodes
      characteristics
      traits
      personal_status
      trivia
      absences
      gallery
      animated
      references
      personality {
        traits
        likes
        dislikes
      }
      family {
        father
        mother
        sister
        uncle
        aunt
        cousins
        children
        grandparents {
          maternal
          paternal
        }
      }
      appearance {
        fur
        eyes
        nose
        markings {
          paws
          outerMuzzle
          eyebrows
          chest
          legs
          arms
          torso
          head
          muzzle
          tail {
            stem
            tip
          }
          ears {
            outer
            inner
          }
          furColor
          distinctiveFeatures
        }
      }
    }
  }
`;
