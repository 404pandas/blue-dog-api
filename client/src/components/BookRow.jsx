import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

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

export default function BookRow({ book }) {
  console.log(book);
  return (
    <Accordion>
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h5' className='h5'>
          {book.bookName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>{book.plot}</Typography>
        <Typography variant='h6'>Characters:</Typography>{" "}
        <Typography variant='body2'>{book.characters}</Typography>
        <Typography variant='h6'>Publisher:</Typography>{" "}
        <Typography variant='body2'>{book.publisher}</Typography>
        <Typography variant='body2'>{book.publish_date}</Typography>
        <Typography variant='h6'>Pages:</Typography>{" "}
        <Typography variant='body2'>{book.pages}</Typography>
        <Typography variant='h6'>ISBN:</Typography>{" "}
        <Typography variant='body2'>{book.isbn}</Typography>
        <Accordion>
          <AccordionSummary>
            <Typography variant='h6'>Trivia:</Typography>{" "}
          </AccordionSummary>{" "}
          <AccordionDetails>
            <Typography variant='body2'>{book.trivia}</Typography>
          </AccordionDetails>{" "}
        </Accordion>{" "}
      </AccordionDetails>
    </Accordion>
  );
}
