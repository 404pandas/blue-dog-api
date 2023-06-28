import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
  console.log(character);
  return (
    <Accordion>
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h5' className='h5'>
          {character.characterName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='h6'>"{character.catchphrase}"</Typography>
        <Typography variant='body2'>{character.description1}</Typography>
        <hr />
        <Typography variant='body2'>{character.description2}</Typography>
        <Typography variant='h6'>Appearance:</Typography>
        <Typography variant='body2'>{character.appearance}</Typography>
        <Typography variant='h6'>Personality:</Typography>{" "}
        <Typography variant='body2'>{character.personality}</Typography>
        <Typography variant='h6'>Nicknames:</Typography>{" "}
        <Typography variant='body2'>{character.nicknames}</Typography>
        <Typography variant='h6'>Breed:</Typography>{" "}
        <Typography variant='body2'>{character.breed}</Typography>
        <Typography variant='h6'>Gender:</Typography>{" "}
        <Typography variant='body2'>{character.gender}</Typography>
        <Typography variant='h6'>Age:</Typography>{" "}
        <Typography variant='body2'>{character.age}</Typography>
        <Typography variant='h6'>Eyes:</Typography>{" "}
        <Typography variant='body2'>{character.eyes}</Typography>
        <Typography variant='h6'>Fur:</Typography>{" "}
        <Typography variant='body2'>{character.fur}</Typography>
        <Typography variant='h6'>Relatives:</Typography>{" "}
        <Typography variant='body2'>{character.relatives}</Typography>
        <Typography variant='h6'>Friends:</Typography>
        <Typography variant='body2'>{character.friends}</Typography>
        <Typography variant='h6'>First Apperance:</Typography>{" "}
        <Typography variant='body2'>{character.firstAppearance}</Typography>
        <Accordion>
          <AccordionSummary>
            <Typography variant='h6'>Trivia:</Typography>{" "}
          </AccordionSummary>{" "}
          <AccordionDetails>
            <Typography variant='body2'>{character.trivia}</Typography>
          </AccordionDetails>{" "}
        </Accordion>
        <Typography variant='h6'>Absences:</Typography>{" "}
        <Typography variant='body2'>{character.absences}</Typography>
        <Typography variant='h6'>Gallery:</Typography>{" "}
        <Typography variant='body2'>{character.gallery}</Typography>
        <Typography variant='h6'>Animated:</Typography>{" "}
        <Typography variant='body2'>{character.animated}</Typography>
        <Typography variant='h6'>References:</Typography>{" "}
        <Link to={"https://" + character.references}>
          <Typography variant='body2'>{character.references}</Typography>
        </Link>{" "}
      </AccordionDetails>
    </Accordion>
  );
}
