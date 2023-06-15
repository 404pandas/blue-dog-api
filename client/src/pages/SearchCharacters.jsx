import React, { useState } from "react";
import Header from "../components/Header";

// TODO- import MUI stuff and style
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

const SearchCharacters = () => {
  // create state for holding returned Bluey api data
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create method to search for characters and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch();
      //   todo - api call to local db?

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const characterData = items.map((character) => ({
        characterId: character.id,
        characterName: character.characterName,
        description1: character.description1,
        description2: character.description2,
        catchphrase: character.catchphrase,
        appearance: character.appearance,
        personality: character.personality,
        nicknames: character.nicknames,
        characteristics: character.characteristics,
        traits: character.traits,
        personal_status: character.personal_status,
        firstAppearance: character.firstAppearance,
        trivia: character.trivia,
        absences: character.absences,
        gallery: character.gallery,
        animated: character.animated,
        references: character.references,
      }));

      setSearchedCharacters(characterData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Search for Characters!</h1>
        <FormGroup onSubmit={handleFormSubmit}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <FormControl
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a character'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Submit Search
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      </Container>

      <Container>
        <h2>
          {searchedCharacters.length
            ? `Viewing ${searchedCharacters.length} results:`
            : "Search for a character to begin"}
        </h2>
        <CardContent>
          {searchedCharacters.map((character) => {
            return (
              <Card key={character.characterName} border='dark'>
                {character.gallery ? (
                  <Card.Img
                    src={character.gallery}
                    alt={`T${character.characterName}`}
                    variant='top'
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{character.characterName}</Card.Title>
                  <Card.Text>{character.description1}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardContent>
      </Container>
    </>
  );
};

export default SearchCharacters;
