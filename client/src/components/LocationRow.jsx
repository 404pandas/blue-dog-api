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

export default function LocationRow({ location }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  console.log(location);
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h4' className='h4'>
          {location.locationName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body1' className='body1'>
          {location.description}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.appearance}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.rooms}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.appearances}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.inhabitants}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.inconsistences}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.trivia}
        </Typography>
        <Typography variant='body1' className='body1'>
          {location.gallery}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}