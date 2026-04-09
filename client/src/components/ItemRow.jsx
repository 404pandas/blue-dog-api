import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

export default function ItemRow({ item }) {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { ml: 1 } }}
      >
        <Typography variant="h5">{item.itemName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {item.img && (
          <img
            src={item.img}
            alt={item.itemName}
            style={{ maxWidth: "100%", borderRadius: 12 }}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
