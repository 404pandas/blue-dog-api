import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { getImageSrc } from "../utils/imageUtils";

function LinkedCharacters({ characters }) {
  if (!characters) return null;
  const names = characters.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <Typography variant="body2">
      {names.map((name, i) => {
        const isGeneric = /various|background/i.test(name);
        return (
          <span key={name}>
            {isGeneric ? (
              name
            ) : (
              <Link to={`/character/${encodeURIComponent(name)}`} style={{ color: "var(--bluey-blue)" }}>
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
  const imgSrc = getImageSrc(book.img);

  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {imgSrc && (
            <Box
              component="img"
              src={imgSrc}
              alt={book.bookName}
              sx={{
                width: 36,
                height: 50,
                objectFit: "cover",
                borderRadius: "3px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            />
          )}
          <Typography variant="h5">{book.bookName}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 2.5, mb: 2 }}>
          {imgSrc && (
            <Box
              component="img"
              src={imgSrc}
              alt={book.bookName}
              sx={{
                width: 110,
                borderRadius: "6px",
                objectFit: "cover",
                boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
            />
          )}
          <Box>
            <Typography variant="body2">{book.plot}</Typography>
            {book.publisher && (
              <>
                <Typography variant="h6" sx={{ mt: 1 }}>Publisher:</Typography>
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
          </Box>
        </Box>

        {book.characters && (
          <>
            <Typography variant="h6">Characters:</Typography>
            <LinkedCharacters characters={book.characters} />
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
