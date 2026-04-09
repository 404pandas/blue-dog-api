import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { getImageSrc } from "../utils/imageUtils";

export default function EpisodeRow({ episode }) {
  const imgSrc = getImageSrc(episode.img);

  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Typography variant="h5">{episode.episodeName}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {imgSrc && (
          <Box
            component="img"
            src={imgSrc}
            alt={episode.episodeName}
            sx={{
              width: "100%",
              maxHeight: 220,
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderRadius: "0 0 4px 4px",
              mb: 1.5,
            }}
          />
        )}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="body2">{episode.description}</Typography>
          <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
            <Typography variant="h6">Season: {episode.season}</Typography>
            <Typography variant="h6">Episode: {episode.episode}</Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
