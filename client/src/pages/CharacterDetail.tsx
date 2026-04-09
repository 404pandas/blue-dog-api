import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_NAME } from "../queries/characterQueries";
import { getImageSrc } from "../utils/imageUtils";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function DetailSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: "var(--bluey-dark)",
          fontFamily: "'hello-headline', cursive",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "var(--text-dark)",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export default function CharacterDetail() {
  const { name } = useParams<{ name: string }>();
  const characterName = decodeURIComponent(name ?? "");

  const { loading, error, data } = useQuery(GET_CHARACTER_BY_NAME, {
    variables: { characterName },
    skip: !characterName,
  });

  if (loading)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "var(--bluey-blue)" }}>
          Loading…
        </Typography>
      </Container>
    );

  if (!data?.characterByName)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "var(--bingo-orange)" }}>
          Character not found
        </Typography>
        <Link to="/character">
          <Typography sx={{ color: "var(--bluey-blue)", mt: 2 }}>
            ← Back to Characters
          </Typography>
        </Link>
      </Container>
    );

  const c = data.characterByName;
  const imgSrc = getImageSrc(c.img);

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 10 }}>
      {/* Back link */}
      <Link to="/character">
        <Typography
          sx={{
            color: "var(--bluey-blue)",
            mb: 3,
            display: "inline-block",
            fontFamily: "'hello-headline', cursive",
            "&:hover": { color: "var(--bingo-orange)" },
          }}
        >
          ← Back to Characters
        </Typography>
      </Link>

      {/* Hero card */}
      <Box
        sx={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "22px",
          border: "1px solid var(--bluey-light)",
          boxShadow: "0 6px 32px var(--shadow-blue)",
          p: { xs: 3, sm: 5 },
        }}
      >
        {/* Name + portrait row */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'hello-headline', cursive",
                background:
                  "linear-gradient(135deg, var(--bluey-darker), var(--bluey-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
              }}
            >
              {c.characterName}
            </Typography>

            {c.catchphrase && (
              <Typography
                variant="h6"
                sx={{
                  color: "var(--bingo-orange)",
                  fontFamily: "'hello-headline', cursive",
                  mb: 2,
                }}
              >
                &ldquo;{c.catchphrase}&rdquo;
              </Typography>
            )}
          </Box>

          {imgSrc && (
            <Box
              component="img"
              src={imgSrc}
              alt={c.characterName}
              sx={{
                width: { xs: 120, sm: 180 },
                height: { xs: 120, sm: 180 },
                borderRadius: "16px",
                objectFit: "cover",
                objectPosition: "top",
                border: "2px solid var(--bluey-light)",
                boxShadow: "0 4px 20px var(--shadow-blue)",
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: "var(--bluey-light)" }} />

        {/* Basic info */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          {c.species && <DetailSection label="Species">{c.species}</DetailSection>}
          {c.breed && <DetailSection label="Breed">{c.breed}</DetailSection>}
          {c.gender && <DetailSection label="Gender">{c.gender}</DetailSection>}
          {c.age && <DetailSection label="Age">{c.age}</DetailSection>}
          {c.personal_status && (
            <DetailSection label="Status">{c.personal_status}</DetailSection>
          )}
          {c.firstAppearance && (
            <DetailSection label="First Appearance">
              <Link
                to={`/episode/${encodeURIComponent(c.firstAppearance)}`}
                style={{ color: "var(--bluey-blue)" }}
              >
                {c.firstAppearance}
              </Link>
            </DetailSection>
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: "var(--bluey-light)" }} />

        {/* Personality */}
        {c.personality?.traits?.length > 0 && (
          <DetailSection label="Personality Traits">
            {c.personality.traits.join(", ")}
          </DetailSection>
        )}
        {c.personality?.likes?.length > 0 && (
          <DetailSection label="Likes">
            {c.personality.likes.join(", ")}
          </DetailSection>
        )}
        {c.personality?.dislikes?.length > 0 && (
          <DetailSection label="Dislikes">
            {c.personality.dislikes.join(", ")}
          </DetailSection>
        )}

        {/* Hobbies / Friends */}
        {c.hobbies?.length > 0 && (
          <DetailSection label="Hobbies">{c.hobbies.join(", ")}</DetailSection>
        )}
        {c.friends?.length > 0 && (
          <DetailSection label="Friends">
            {c.friends.map((f: string, i: number) => (
              <span key={f}>
                <Link
                  to={`/character/${encodeURIComponent(f)}`}
                  style={{ color: "var(--bluey-blue)" }}
                >
                  {f}
                </Link>
                {i < c.friends.length - 1 ? ", " : ""}
              </span>
            ))}
          </DetailSection>
        )}

        {/* Family */}
        {c.family && (
          <>
            <Divider sx={{ my: 3, borderColor: "var(--bluey-light)" }} />
            <Typography
              variant="h6"
              sx={{
                color: "var(--bluey-dark)",
                fontFamily: "'hello-headline', cursive",
                mb: 1.5,
              }}
            >
              Family
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              {c.family.father && (
                <DetailSection label="Father">
                  <Link
                    to={`/character/${encodeURIComponent(c.family.father)}`}
                    style={{ color: "var(--bluey-blue)" }}
                  >
                    {c.family.father}
                  </Link>
                </DetailSection>
              )}
              {c.family.mother && (
                <DetailSection label="Mother">
                  <Link
                    to={`/character/${encodeURIComponent(c.family.mother)}`}
                    style={{ color: "var(--bluey-blue)" }}
                  >
                    {c.family.mother}
                  </Link>
                </DetailSection>
              )}
              {c.family.sister && (
                <DetailSection label="Sister">
                  <Link
                    to={`/character/${encodeURIComponent(c.family.sister)}`}
                    style={{ color: "var(--bluey-blue)" }}
                  >
                    {c.family.sister}
                  </Link>
                </DetailSection>
              )}
              {c.family.uncle && (
                <DetailSection label="Uncle">{c.family.uncle}</DetailSection>
              )}
              {c.family.aunt && (
                <DetailSection label="Aunt">{c.family.aunt}</DetailSection>
              )}
              {c.family.cousins?.length > 0 && (
                <DetailSection label="Cousins">
                  {c.family.cousins.join(", ")}
                </DetailSection>
              )}
              {c.family.children?.length > 0 && (
                <DetailSection label="Children">
                  {c.family.children.join(", ")}
                </DetailSection>
              )}
              {c.family.grandparents?.maternal?.length > 0 && (
                <DetailSection label="Maternal Grandparents">
                  {c.family.grandparents.maternal.join(", ")}
                </DetailSection>
              )}
              {c.family.grandparents?.paternal?.length > 0 && (
                <DetailSection label="Paternal Grandparents">
                  {c.family.grandparents.paternal.join(", ")}
                </DetailSection>
              )}
            </Box>
          </>
        )}

        {/* Notable episodes */}
        {c.notableEpisodes?.length > 0 && (
          <>
            <Divider sx={{ my: 3, borderColor: "var(--bluey-light)" }} />
            <DetailSection label="Notable Episodes">
              {c.notableEpisodes.map((ep: string, i: number) => (
                <span key={ep}>
                  <Link
                    to={`/episode/${encodeURIComponent(ep)}`}
                    style={{ color: "var(--bluey-blue)" }}
                  >
                    {ep}
                  </Link>
                  {i < c.notableEpisodes.length - 1 ? ", " : ""}
                </span>
              ))}
            </DetailSection>
          </>
        )}

        {/* Appearance */}
        {c.appearance && (
          <>
            <Divider sx={{ my: 3, borderColor: "var(--bluey-light)" }} />
            <Typography
              variant="h6"
              sx={{
                color: "var(--bluey-dark)",
                fontFamily: "'hello-headline', cursive",
                mb: 1.5,
              }}
            >
              Appearance
            </Typography>
            {c.appearance.fur?.length > 0 && (
              <DetailSection label="Fur">
                {c.appearance.fur.join(", ")}
              </DetailSection>
            )}
            {c.appearance.eyes && (
              <DetailSection label="Eyes">{c.appearance.eyes}</DetailSection>
            )}
            {c.appearance.markings?.furColor?.length > 0 && (
              <DetailSection label="Fur Colors">
                {c.appearance.markings.furColor.join(", ")}
              </DetailSection>
            )}
            {c.appearance.markings?.distinctiveFeatures?.length > 0 && (
              <DetailSection label="Distinctive Features">
                {c.appearance.markings.distinctiveFeatures.join(", ")}
              </DetailSection>
            )}
          </>
        )}

        {/* Trivia */}
        {(c.trivia || c.funfacts) && (
          <>
            <Divider sx={{ my: 3, borderColor: "var(--bluey-light)" }} />
            <Typography
              variant="h6"
              sx={{
                color: "var(--bluey-dark)",
                fontFamily: "'hello-headline', cursive",
                mb: 1.5,
              }}
            >
              Trivia
            </Typography>
            {c.trivia && (
              <Typography
                variant="body1"
                sx={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  mb: 2,
                }}
              >
                {c.trivia}
              </Typography>
            )}
            {c.funfacts?.favoriteAnimal && (
              <DetailSection label="Favorite Animal">
                {c.funfacts.favoriteAnimal}
              </DetailSection>
            )}
            {c.funfacts?.favoriteBreakfast && (
              <DetailSection label="Favorite Breakfast">
                {c.funfacts.favoriteBreakfast}
              </DetailSection>
            )}
            {c.funfacts?.school && (
              <DetailSection label="School">{c.funfacts.school}</DetailSection>
            )}
            {c.funfacts?.middleName && (
              <DetailSection label="Middle Name">
                {c.funfacts.middleName}
              </DetailSection>
            )}
            {c.funfacts?.instrument && (
              <DetailSection label="Instrument">
                {c.funfacts.instrument}
              </DetailSection>
            )}
          </>
        )}

        {/* References */}
        {c.references && (
          <>
            <Divider sx={{ my: 3, borderColor: "var(--bluey-light)" }} />
            <DetailSection label="References">
              <a
                href={`https://${c.references}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--bluey-blue)" }}
              >
                {c.references}
              </a>
            </DetailSection>
          </>
        )}
      </Box>
    </Container>
  );
}
