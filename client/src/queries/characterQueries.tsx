import { gql } from "@apollo/client";

export const GET_CHARACTER_BY_NAME = gql`
  query getCharacterByName($characterName: String!) {
    characterByName(characterName: $characterName) {
      _id
      characterName
      species
      breed
      gender
      age
      catchphrase
      hobbies
      friends
      nicknames
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
          furColor
          distinctiveFeatures
        }
      }
      funfacts {
        favoriteAnimal
        favoriteColorOfCapsicum
        favoriteBreakfast
        school
        middleName
        instrument
        canRead
      }
    }
  }
`;

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
