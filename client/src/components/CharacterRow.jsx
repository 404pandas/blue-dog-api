import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// Styled Accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { borderBottom: 0 },
  "&:before": { display: "none" },
}));

// Styled Accordion Summary
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

// Styled Accordion Details
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CharacterRow({ character }) {
  const {
    characterName,
    species,
    breed,
    gender,
    age,
    catchphrase,
    hobbies,
    friends,
    nicknames,
    firstAppearance,
    notableEpisodes,
    characteristics,
    traits,
    personal_status,
    trivia,
    absences,
    gallery,
    animated,
    references,
    appearance,
    personality,
    family,
    funfacts,
  } = character;

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant='h5'>{characterName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='h6'>&quot;{catchphrase}&quot;</Typography>

        {species && <Typography>Species: {species}</Typography>}
        {breed && <Typography>Breed: {breed}</Typography>}
        {gender && <Typography>Gender: {gender}</Typography>}
        {age && <Typography>Age: {age}</Typography>}

        {nicknames && (
          <>
            <Typography variant='h6'>Nicknames:</Typography>
            <Typography>{nicknames}</Typography>
          </>
        )}

        {friends?.length > 0 && (
          <>
            <Typography variant='h6'>Friends:</Typography>
            <Typography>{friends.join(", ")}</Typography>
          </>
        )}

        {hobbies?.length > 0 && (
          <>
            <Typography variant='h6'>Hobbies:</Typography>
            <Typography>{hobbies.join(", ")}</Typography>
          </>
        )}

        {personality?.traits?.length > 0 && (
          <>
            <Typography variant='h6'>Personality Traits:</Typography>
            <Typography>{personality.traits.join(", ")}</Typography>
          </>
        )}

        {personality?.likes?.length > 0 && (
          <>
            <Typography variant='h6'>Likes:</Typography>
            <Typography>{personality.likes.join(", ")}</Typography>
          </>
        )}

        {personality?.dislikes?.length > 0 && (
          <>
            <Typography variant='h6'>Dislikes:</Typography>
            <Typography>{personality.dislikes.join(", ")}</Typography>
          </>
        )}

        {appearance && (
          <>
            <Typography variant='h6'>Appearance:</Typography>
            {appearance.fur?.length > 0 && (
              <Typography>Fur: {appearance.fur.join(", ")}</Typography>
            )}
            {appearance.eyes && (
              <Typography>Eyes: {appearance.eyes}</Typography>
            )}
            {appearance.nose && (
              <Typography>Nose: {appearance.nose}</Typography>
            )}
            {appearance.markings?.furColor?.length > 0 && (
              <Typography>
                Fur Colors: {appearance.markings.furColor.join(", ")}
              </Typography>
            )}
            {appearance.markings?.distinctiveFeatures?.length > 0 && (
              <Typography>
                Distinctive Features:{" "}
                {appearance.markings.distinctiveFeatures.join(", ")}
              </Typography>
            )}
          </>
        )}

        {family && (
          <>
            <Typography variant='h6'>Family:</Typography>
            {family.father && <Typography>Father: {family.father}</Typography>}
            {family.mother && <Typography>Mother: {family.mother}</Typography>}
            {family.sister && <Typography>Sister: {family.sister}</Typography>}
            {family.aunt && <Typography>Aunt: {family.aunt}</Typography>}
            {family.uncle && <Typography>Uncle: {family.uncle}</Typography>}
            {family.cousins?.length > 0 && (
              <Typography>Cousins: {family.cousins.join(", ")}</Typography>
            )}
            {family.children?.length > 0 && (
              <Typography>Children: {family.children.join(", ")}</Typography>
            )}
            {family.grandparents?.maternal?.length > 0 && (
              <Typography>
                Maternal Grandparents: {family.grandparents.maternal.join(", ")}
              </Typography>
            )}
            {family.grandparents?.paternal?.length > 0 && (
              <Typography>
                Paternal Grandparents: {family.grandparents.paternal.join(", ")}
              </Typography>
            )}
          </>
        )}

        {notableEpisodes?.length > 0 && (
          <>
            <Typography variant='h6'>Notable Episodes:</Typography>
            <Typography>{notableEpisodes.join(", ")}</Typography>
          </>
        )}

        {characteristics && (
          <>
            <Typography variant='h6'>Characteristics:</Typography>
            <Typography>{characteristics}</Typography>
          </>
        )}

        {traits && (
          <>
            <Typography variant='h6'>Traits:</Typography>
            <Typography>{traits}</Typography>
          </>
        )}

        {personal_status && (
          <>
            <Typography variant='h6'>Status:</Typography>
            <Typography>{personal_status}</Typography>
          </>
        )}

        {firstAppearance && (
          <>
            <Typography variant='h6'>First Appearance:</Typography>
            <Typography>{firstAppearance}</Typography>
          </>
        )}

        <Accordion>
          <AccordionSummary>
            <Typography variant='h6'>Trivia:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {trivia && <Typography>{trivia}</Typography>}
            {funfacts && (
              <>
                {funfacts.favoriteAnimal && (
                  <Typography>
                    Favorite Animal: {funfacts.favoriteAnimal}
                  </Typography>
                )}
                {funfacts.favoriteColorOfCapsicum && (
                  <Typography>
                    Favorite Capsicum Color: {funfacts.favoriteColorOfCapsicum}
                  </Typography>
                )}
                {funfacts.favoriteBreakfast && (
                  <Typography>
                    Favorite Breakfast: {funfacts.favoriteBreakfast}
                  </Typography>
                )}
                {funfacts.school && (
                  <Typography>School: {funfacts.school}</Typography>
                )}
                {funfacts.middleName && (
                  <Typography>Middle Name: {funfacts.middleName}</Typography>
                )}
                {funfacts.instrument && (
                  <Typography>Instrument: {funfacts.instrument}</Typography>
                )}
                {funfacts.canRead && (
                  <Typography>Can Read: {funfacts.canRead}</Typography>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>

        {absences && (
          <>
            <Typography variant='h6'>Absences:</Typography>
            <Typography>{absences}</Typography>
          </>
        )}

        {gallery && (
          <>
            <Typography variant='h6'>Gallery:</Typography>
            <Typography>{gallery}</Typography>
          </>
        )}

        {animated && (
          <>
            <Typography variant='h6'>Animated:</Typography>
            <Typography>{animated}</Typography>
          </>
        )}

        {references && (
          <>
            <Typography variant='h6'>References:</Typography>
            <Link to={`https://${references}`}>
              <Typography>{references}</Typography>
            </Link>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
