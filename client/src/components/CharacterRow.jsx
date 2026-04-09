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

export default function CharacterRow({ character }) {
  const {
    characterName, species, breed, gender, age, catchphrase,
    hobbies, friends, nicknames, firstAppearance, notableEpisodes,
    characteristics, traits, personal_status, trivia, absences,
    gallery, animated, references, appearance, personality, family, funfacts,
  } = character;

  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary {...summaryProps}>
        <Typography variant="h5">{characterName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {catchphrase && (
          <Typography variant="h6">&ldquo;{catchphrase}&rdquo;</Typography>
        )}
        {species && <Typography>Species: {species}</Typography>}
        {breed && <Typography>Breed: {breed}</Typography>}
        {gender && <Typography>Gender: {gender}</Typography>}
        {age && <Typography>Age: {age}</Typography>}

        {nicknames && (
          <>
            <Typography variant="h6">Nicknames:</Typography>
            <Typography>{nicknames}</Typography>
          </>
        )}

        {friends?.length > 0 && (
          <>
            <Typography variant="h6">Friends:</Typography>
            <Typography>
              {friends.map((f, i) => (
                <span key={f}>
                  <Link to={`/character/${encodeURIComponent(f)}`} style={{ color: "var(--bluey-blue)" }}>{f}</Link>
                  {i < friends.length - 1 ? ", " : ""}
                </span>
              ))}
            </Typography>
          </>
        )}

        {hobbies?.length > 0 && (
          <>
            <Typography variant="h6">Hobbies:</Typography>
            <Typography>{hobbies.join(", ")}</Typography>
          </>
        )}

        {personality?.traits?.length > 0 && (
          <>
            <Typography variant="h6">Personality Traits:</Typography>
            <Typography>{personality.traits.join(", ")}</Typography>
          </>
        )}
        {personality?.likes?.length > 0 && (
          <>
            <Typography variant="h6">Likes:</Typography>
            <Typography>{personality.likes.join(", ")}</Typography>
          </>
        )}
        {personality?.dislikes?.length > 0 && (
          <>
            <Typography variant="h6">Dislikes:</Typography>
            <Typography>{personality.dislikes.join(", ")}</Typography>
          </>
        )}

        {appearance && (
          <>
            <Typography variant="h6">Appearance:</Typography>
            {appearance.fur?.length > 0 && (
              <Typography>Fur: {appearance.fur.join(", ")}</Typography>
            )}
            {appearance.eyes && <Typography>Eyes: {appearance.eyes}</Typography>}
            {appearance.nose && <Typography>Nose: {appearance.nose}</Typography>}
            {appearance.markings?.furColor?.length > 0 && (
              <Typography>Fur Colors: {appearance.markings.furColor.join(", ")}</Typography>
            )}
            {appearance.markings?.distinctiveFeatures?.length > 0 && (
              <Typography>Distinctive Features: {appearance.markings.distinctiveFeatures.join(", ")}</Typography>
            )}
          </>
        )}

        {family && (
          <>
            <Typography variant="h6">Family:</Typography>
            {family.father && (
              <Typography>Father: <Link to={`/character/${encodeURIComponent(family.father)}`} style={{ color: "var(--bluey-blue)" }}>{family.father}</Link></Typography>
            )}
            {family.mother && (
              <Typography>Mother: <Link to={`/character/${encodeURIComponent(family.mother)}`} style={{ color: "var(--bluey-blue)" }}>{family.mother}</Link></Typography>
            )}
            {family.sister && (
              <Typography>Sister: <Link to={`/character/${encodeURIComponent(family.sister)}`} style={{ color: "var(--bluey-blue)" }}>{family.sister}</Link></Typography>
            )}
            {family.uncle && <Typography>Uncle: {family.uncle}</Typography>}
            {family.aunt && <Typography>Aunt: {family.aunt}</Typography>}
            {family.cousins?.length > 0 && (
              <Typography>Cousins: {family.cousins.join(", ")}</Typography>
            )}
            {family.children?.length > 0 && (
              <Typography>Children: {family.children.join(", ")}</Typography>
            )}
            {family.grandparents?.maternal?.length > 0 && (
              <Typography>Maternal Grandparents: {family.grandparents.maternal.join(", ")}</Typography>
            )}
            {family.grandparents?.paternal?.length > 0 && (
              <Typography>Paternal Grandparents: {family.grandparents.paternal.join(", ")}</Typography>
            )}
          </>
        )}

        {notableEpisodes?.length > 0 && (
          <>
            <Typography variant="h6">Notable Episodes:</Typography>
            <Typography>
              {notableEpisodes.map((ep, i) => (
                <span key={ep}>
                  <Link to={`/episode/${encodeURIComponent(ep)}`} style={{ color: "var(--bluey-blue)" }}>{ep}</Link>
                  {i < notableEpisodes.length - 1 ? ", " : ""}
                </span>
              ))}
            </Typography>
          </>
        )}

        {characteristics && (
          <>
            <Typography variant="h6">Characteristics:</Typography>
            <Typography>{characteristics}</Typography>
          </>
        )}
        {traits && (
          <>
            <Typography variant="h6">Traits:</Typography>
            <Typography>{traits}</Typography>
          </>
        )}
        {personal_status && (
          <>
            <Typography variant="h6">Status:</Typography>
            <Typography>{personal_status}</Typography>
          </>
        )}
        {firstAppearance && (
          <>
            <Typography variant="h6">First Appearance:</Typography>
            <Typography>
              <Link
                to={`/episode/${encodeURIComponent(firstAppearance)}`}
                style={{ color: "var(--bluey-blue)" }}
              >
                {firstAppearance}
              </Link>
            </Typography>
          </>
        )}

        {(trivia || funfacts) && (
          <Accordion disableGutters elevation={0} id="trivia-accordion" sx={{ mt: 1 }}>
            <AccordionSummary {...summaryProps}>
              <Typography variant="h6">Trivia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {trivia && <Typography>{trivia}</Typography>}
              {funfacts?.favoriteAnimal && <Typography>Favorite Animal: {funfacts.favoriteAnimal}</Typography>}
              {funfacts?.favoriteColorOfCapsicum && <Typography>Favorite Capsicum Color: {funfacts.favoriteColorOfCapsicum}</Typography>}
              {funfacts?.favoriteBreakfast && <Typography>Favorite Breakfast: {funfacts.favoriteBreakfast}</Typography>}
              {funfacts?.school && <Typography>School: {funfacts.school}</Typography>}
              {funfacts?.middleName && <Typography>Middle Name: {funfacts.middleName}</Typography>}
              {funfacts?.instrument && <Typography>Instrument: {funfacts.instrument}</Typography>}
              {funfacts?.canRead && <Typography>Can Read: {funfacts.canRead}</Typography>}
            </AccordionDetails>
          </Accordion>
        )}

        {absences && (
          <>
            <Typography variant="h6">Absences:</Typography>
            <Typography>{absences}</Typography>
          </>
        )}
        {gallery && (
          <>
            <Typography variant="h6">Gallery:</Typography>
            <Typography>{gallery}</Typography>
          </>
        )}
        {animated && (
          <>
            <Typography variant="h6">Animated:</Typography>
            <Typography>{animated}</Typography>
          </>
        )}
        {references && (
          <>
            <Typography variant="h6">References:</Typography>
            <Link to={`https://${references}`} target="_blank" rel="noopener noreferrer">
              <Typography>{references}</Typography>
            </Link>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
