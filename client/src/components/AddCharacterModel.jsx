import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHARACTER } from "../utils/mutations";
import { GET_CHARACTERS } from "../utils/queries";
// MUI Imports
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ImageIcon from "@mui/icons-material/Image";
import BackupIcon from "@mui/icons-material/Backup";
import BlockIcon from "@mui/icons-material/Block";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddCharacterModel() {
  const [breedOpen, setBreedOpen] = React.useState(false);
  const [genderOpen, setGenderOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [friendsOpen, setFriendsOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [characterName, setCharacterName] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [appearance, setAppearance] = useState("");
  const [personality, setPersonality] = useState("");
  const [nicknames, setNicknames] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [traits, setTraits] = useState("");
  const [firstAppearance, setFirstAppearance] = useState("");
  const [trivia, setTrivia] = useState("");
  const [appearances, setAppearances] = useState("");
  const [absences, setAbsences] = useState("");
  const [images, setImages] = useState("");
  const [animations, setAnimations] = useState("");
  const [references, setReferences] = useState("");
  const characterArray = [
    "Bluey",
    "Bingo",
    "Calypso",
    "Rusty",
    "Lucky",
    "Jack",
    "Winton",
    "Chloe",
    "Snickers",
  ];
  const [checked, setChecked] = React.useState([true, false]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const [open, setOpen] = React.useState(true);

  const handleFriendsClick = () => {
    setFriendsOpen(!friendsOpen);
  };
  const handleBreedClick = () => {
    setBreedOpen(!breedOpen);
  };
  const handleGenderClick = () => {
    setGenderOpen(!genderOpen);
  };
  const handleAgeClick = () => {
    setAgeOpen(!ageOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      characterName === "" ||
      description1 === "" ||
      appearance === "" ||
      absences === ""
    ) {
      return alert("Please fill in all fields");
    }
    addCharacter(characterName, description1, appearance, absences);
    setCharacterName("");
    setDescription1("");
    setAppearance("");
    setAbsences("");
  };

  const [addCharacter] = useMutation(ADD_CHARACTER, {
    variables: { characterName, description1, appearance, absences },
    update(cache, { data: { addCharacter } }) {
      const { characters } = cache.readQuery({ query: GET_CHARACTERS });
      cache.writeQuery({
        query: GET_CHARACTERS,
        data: { characters: [...characters, addCharacter] },
      });
    },
  });
  return (
    <div>
      <Button onClick={handleOpen}>Add Character</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} id='add-character-modal' onSubmit={onSubmit}>
          <form></form>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-simple' margin='dense'>
              Name
            </InputLabel>
            <Input
              id='component-simple characterName'
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Description
            </InputLabel>
            <Input
              id='component-helper description1'
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Additional Description
            </InputLabel>
            <Input
              id='component-helper description2'
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Catchphrase
            </InputLabel>
            <Input
              id='component-helper catchphrase'
              value={catchphrase}
              onChange={(e) => setCatchphrase(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Appearance
            </InputLabel>
            <Input
              id='component-helper appearance'
              value={appearance}
              onChange={(e) => setAppearance(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Personality
            </InputLabel>
            <Input
              id='component-helper personality'
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Nicknames
            </InputLabel>
            <Input
              id='component-helper nicknames'
              value={nicknames}
              onChange={(e) => setNicknames(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <ListSubheader component='div' id='nested-list-subheader'>
              Characteristics
            </ListSubheader>
            <ListItemButton onClick={handleBreedClick}>
              <ListItemText primary='Breed' />
              {breedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={breedOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Input
                    id='component-helper breed'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    aria-describedby='component-helper-text'
                  />{" "}
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleGenderClick}>
              <ListItemText primary='Gender' />
              {genderOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={genderOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Input
                    id='component-helper gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    aria-describedby='component-helper-text'
                  />{" "}
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleAgeClick}>
              <ListItemText primary='Age' />
              {ageOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ageOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Input
                    id='component-helper age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    aria-describedby='component-helper-text'
                  />{" "}
                </ListItemButton>
              </List>
            </Collapse>
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Traits
            </InputLabel>
            <Input
              id='component-helper traits'
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={characterArray}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label='Relatives' />
              )}
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <ListSubheader component='div' id='nested-list-subheader'>
              Friends
            </ListSubheader>
            <ListItemButton onClick={handleFriendsClick}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary='Possible Friends' />
              {friendsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={friendsOpen} timeout='auto' unmountOnExit>
              <List
                component='div'
                disablePadding
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {characterArray.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <IconButton edge='end' aria-label='comments'>
                          <ImageIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge='start'
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              First Appearance
            </InputLabel>
            <Input
              id='component-helper firstAppearance'
              value={firstAppearance}
              onChange={(e) => setFirstAppearance(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Trivia
            </InputLabel>
            <Input
              id='component-helper trivia'
              value={trivia}
              onChange={(e) => setTrivia(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Appearances
            </InputLabel>
            <Input
              id='component-helper appearances'
              value={appearances}
              onChange={(e) => setAppearances(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Absences
            </InputLabel>
            <Input
              id='component-helper absences'
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Images
            </InputLabel>
            <Input
              id='component-helper images'
              value={images}
              onChange={(e) => setImages(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              Animations
            </InputLabel>
            <Input
              id='component-helper animations'
              value={animations}
              onChange={(e) => setAnimations(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <FormControl onSubmit={onSubmit} variant='standard' margin='dense'>
            <InputLabel htmlFor='component-helper' margin='dense'>
              References
            </InputLabel>
            <Input
              id='component-helper references'
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              defaultValue='Bluey is a seven-year-old Blue Heeler pup who loves to play.'
              aria-describedby='component-helper-text'
            />
          </FormControl>
          <div id='fab-buttons'>
            <Button
              color='secondary'
              type='submit'
              data
              variant='extended'
              aria-label='submit'
            >
              <BackupIcon sx={{ mr: 1 }} />
              Submit
            </Button>
            <Button color='primary' variant='extended' aria-label='cancel'>
              <BlockIcon sx={{ mr: 1 }} />
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
