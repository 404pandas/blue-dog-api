import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_NAME } from "../queries/episodeQueries";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export default function EpisodeDetail() {
  const { name } = useParams<{ name: string }>();
  const episodeName = decodeURIComponent(name ?? "");

  const { loading, error, data } = useQuery(GET_EPISODE_BY_NAME, {
    variables: { episodeName },
    skip: !episodeName,
  });

  if (loading)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "var(--bluey-blue)" }}>
          Loading…
        </Typography>
      </Container>
    );

  if (error || !data?.episodeByName)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "var(--bingo-orange)" }}>
          Episode not found
        </Typography>
        <Link to="/episode">
          <Typography sx={{ color: "var(--bluey-blue)", mt: 2 }}>
            ← Back to Episodes
          </Typography>
        </Link>
      </Container>
    );

  const ep = data.episodeByName;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 10 }}>
      {/* Back link */}
      <Link to="/episode">
        <Typography
          sx={{
            color: "var(--bluey-blue)",
            mb: 3,
            display: "inline-block",
            fontFamily: "'hello-headline', cursive",
            "&:hover": { color: "var(--bingo-orange)" },
          }}
        >
          ← Back to Episodes
        </Typography>
      </Link>

      {/* Episode card */}
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
        {/* Season / Episode badges */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
          {ep.season != null && (
            <Chip
              label={`Season ${ep.season}`}
              sx={{
                background: "var(--bluey-blue)",
                color: "white",
                fontFamily: "'hello-headline', cursive",
                fontSize: "0.9rem",
              }}
            />
          )}
          {ep.episode != null && (
            <Chip
              label={`Episode ${ep.episode}`}
              sx={{
                background: "var(--bingo-orange)",
                color: "white",
                fontFamily: "'hello-headline', cursive",
                fontSize: "0.9rem",
              }}
            />
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontFamily: "'hello-headline', cursive",
            background:
              "linear-gradient(135deg, var(--bluey-darker), var(--bluey-blue))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 3,
          }}
        >
          {ep.episodeName}
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "var(--bluey-light)" }} />

        {ep.description && (
          <Typography
            variant="body1"
            sx={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: "var(--text-dark)",
              lineHeight: 1.75,
              fontSize: "1.05rem",
            }}
          >
            {ep.description}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
