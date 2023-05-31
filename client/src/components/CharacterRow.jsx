import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { GET_CHARACTERS } from "../utils/queries";
import { DELETE_CHARACTER } from "../utils/mutations";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

// Accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

// Accordion Summary
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

// Accordion Details
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CharacterRow({ character }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
    variables: { id: character.id },
    refetchQueries: { query: GET_CHARACTERS },
    update(cache, { data: { deleteCharacter } }) {
      const { characters } = cache.readQuery({ query: GET_CHARACTERS });
      cache.writeQuery({
        query: GET_CHARACTERS,
        data: {
          characters: characters.filter(
            (character) => character.id !== deleteCharacter.id
          ),
        },
      });
    },
  });

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h4' className='h4'>
          Character Name
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body1' className='body1'>
          {character.characterName}
        </Typography>
        <IconButton
          edge='end'
          aria-label='delete'
          value={character._id}
          onClick={(e) => [deleteCharacter](e.currentTarget.value)}
        >
          <DeleteIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
}
