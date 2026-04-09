import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { getImageSrc } from "../utils/imageUtils";

const summaryProps = {
  expandIcon: <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />,
  sx: { flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } },
};

function LinkedList({ items, basePath }) {
  if (!items) return null;
  const names = items.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <Typography variant="body2">
      {names.map((name, i) => (
        <span key={name}>
          <Link
            to={`${basePath}/${encodeURIComponent(name)}`}
            style={{ color: "var(--bluey-blue)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
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
  const imgSrc = getImageSrc(location.img);

  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary {...summaryProps}>
        <Typography variant="h5">{location.locationName}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {imgSrc && (
          <Box
            component="img"
            src={imgSrc}
            alt={location.locationName}
            sx={{
              width: "100%",
              maxHeight: 240,
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderRadius: "0 0 4px 4px",
              mb: 1.5,
            }}
          />
        )}
        <Box sx={{ px: 2, pb: 2 }}>
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
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
