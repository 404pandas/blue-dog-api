import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

export default function ShortRow({ short }) {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Typography variant="h5">{short.shortName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{short.plot}</Typography>
        {short.characters && (
          <>
            <Typography variant="h6">Characters:</Typography>
            <Typography variant="body2">{short.characters}</Typography>
          </>
        )}
        {short.premiereDate && (
          <>
            <Typography variant="h6">Air Date:</Typography>
            <Typography variant="body2">{short.premiereDate}</Typography>
          </>
        )}
        {short.url && (
          <Link
            to={`https://${short.url}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 8,
              color: "var(--bluey-blue)",
              fontFamily: "'hello-headline', cursive",
            }}
          >
            ▶ Watch
          </Link>
        )}
        {short.trivia && (
          <Accordion disableGutters elevation={0} sx={{ mt: 1 }}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
              sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
            >
              <Typography variant="h6">Trivia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{short.trivia}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
