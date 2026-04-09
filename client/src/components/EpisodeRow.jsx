import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

export default function EpisodeRow({ episode }) {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Typography variant="h5">{episode.episodeName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{episode.description}</Typography>
        <div id="season-episode" className="flexbox-turn-on" style={{ marginTop: 8 }}>
          <Typography variant="h6">Season: {episode.season}</Typography>
          <Typography variant="h6">Episode: {episode.episode}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
