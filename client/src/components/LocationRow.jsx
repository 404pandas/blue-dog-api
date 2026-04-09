import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const summaryProps = {
  expandIcon: <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />,
  sx: { flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } },
};

// Split a comma-separated string and link each name
function LinkedList({ items, basePath }) {
  if (!items) return null;
  const names = items.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <Typography variant="body2">
      {names.map((name, i) => (
        <span key={name}>
          <Link
            to={`${basePath}/${encodeURIComponent(name)}`}
            style={{
              color: "var(--bluey-blue)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            {name}
          </Link>
          {i < names.length - 1 ? ", " : ""}
        </span>
      ))}
    </Typography>
  );
}

export default function LocationRow({ location }) {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary {...summaryProps}>
        <Typography variant="h5">{location.locationName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {location.description && (
          <Typography variant="body2" sx={{ mb: 1 }}>{location.description}</Typography>
        )}
        {location.rooms && (
          <>
            <Typography variant="h6">Rooms:</Typography>
            <Typography variant="body2">{location.rooms}</Typography>
          </>
        )}
        {location.appearances && (
          <>
            <Typography variant="h6">Episode Appearances:</Typography>
            <LinkedList items={location.appearances} basePath="/episode" />
          </>
        )}
        {location.inhabitants && (
          <>
            <Typography variant="h6">Inhabitants:</Typography>
            <LinkedList items={location.inhabitants} basePath="/character" />
          </>
        )}
        {location.trivia && (
          <Accordion disableGutters elevation={0} id="trivia-accordion" sx={{ mt: 1 }}>
            <AccordionSummary {...summaryProps}>
              <Typography variant="h6">Trivia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{location.trivia}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
