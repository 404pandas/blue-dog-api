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

export default function ShortRow({ short }) {
  console.log(short);
  return (
    <Accordion>
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h5'>{short.shortName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>{short.plot}</Typography>
        <Typography variant='h6'>Characters:</Typography>{" "}
        <Typography variant='body2'>{short.characters}</Typography>
        <Typography variant='h6'>Air Date:</Typography>{" "}
        <Typography variant='body2'>{short.premiereDate}</Typography>
        <Link to={"https://" + short.url}>
          <Typography variant='h6'>Watch!</Typography>
        </Link>
        <Accordion>
          <AccordionSummary>
            <Typography variant='h6'>Trivia:</Typography>{" "}
          </AccordionSummary>{" "}
          <AccordionDetails>
            <Typography variant='body2'>{short.trivia}</Typography>
          </AccordionDetails>{" "}
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
