import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

function LinkedCharacters({ characters }) {
  if (!characters) return null;
  const names = characters.split(",").map((s) => s.trim()).filter(Boolean);
  // Don't try to link generic "various friends" type entries
  return (
    <Typography variant="body2">
      {names.map((name, i) => {
        const isGeneric = /various|background/i.test(name);
        return (
          <span key={name}>
            {isGeneric ? (
              name
            ) : (
              <Link
                to={`/character/${encodeURIComponent(name)}`}
                style={{ color: "var(--bluey-blue)" }}
              >
                {name}
              </Link>
            )}
            {i < names.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </Typography>
  );
}

export default function BookRow({ book }) {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Typography variant="h5">{book.bookName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{book.plot}</Typography>
        {book.characters && (
          <>
            <Typography variant="h6">Characters:</Typography>
            <LinkedCharacters characters={book.characters} />
          </>
        )}
        {book.publisher && (
          <>
            <Typography variant="h6">Publisher:</Typography>
            <Typography variant="body2">{book.publisher}</Typography>
          </>
        )}
        {book.publish_date && (
          <Typography variant="body2">{book.publish_date}</Typography>
        )}
        {book.pages && (
          <>
            <Typography variant="h6">Pages:</Typography>
            <Typography variant="body2">{book.pages}</Typography>
          </>
        )}
        {book.isbn && (
          <>
            <Typography variant="h6">ISBN:</Typography>
            <Typography variant="body2">{book.isbn}</Typography>
          </>
        )}
        {book.trivia && (
          <Accordion disableGutters elevation={0} sx={{ mt: 1 }}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
              sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
            >
              <Typography variant="h6">Trivia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{book.trivia}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
