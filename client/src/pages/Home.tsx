import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import GifCarousel from "../components/GifCarousel.js";

import linkedin from "../assets/images/presentation/linkedin.png";
import repo from "../assets/images/presentation/github.png";
import portfolio from "../assets/images/presentation/portfolio.png";

gsap.registerPlugin(ScrollTrigger);

const apiEndpoints = [
  { label: "Books",      emoji: "📚", path: "/book"      },
  { label: "Characters", emoji: "🐾", path: "/character" },
  { label: "Episodes",   emoji: "📺", path: "/episode"   },
  { label: "Items",      emoji: "🎈", path: "/item"      },
  { label: "Locations",  emoji: "🏠", path: "/location"  },
  { label: "Shorts",     emoji: "🎬", path: "/short"     },
];

const links = [
  {
    src: linkedin,
    alt: "QR code for LinkedIn",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/404pandas/",
  },
  {
    src: repo,
    alt: "QR code for GitHub repository",
    label: "GitHub",
    url: "https://github.com/404pandas/blue-dog-api",
  },
  {
    src: portfolio,
    alt: "QR code for portfolio",
    label: "Portfolio",
    url: "https://www.maryelenius.com",
  },
];

export default function Home() {
  const heroRef      = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const chipsRef     = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const rapidApiRef  = useRef<HTMLDivElement>(null);
  const qrSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ──
      gsap.from(heroRef.current, {
        y: -70,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.5)",
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        delay: 0.4,
        ease: "power2.out",
      });

      // ── API endpoint chips – staggered after subtitle ──
      if (chipsRef.current) {
        gsap.from(chipsRef.current.querySelectorAll(".feature-chip"), {
          y: 24,
          opacity: 0,
          scale: 0.85,
          stagger: 0.1,
          duration: 0.55,
          delay: 0.7,
          ease: "back.out(1.7)",
        });
      }

      // ── GIF carousel – subtle scale-up ──
      gsap.from(carouselRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.75,
        delay: 0.95,
        ease: "power2.out",
      });

      // ── RapidAPI section – ScrollTrigger ──
      gsap.from(rapidApiRef.current, {
        scrollTrigger: {
          trigger: rapidApiRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        scale: 0.93,
        duration: 0.8,
        ease: "back.out(1.5)",
      });

      // ── QR / connect cards – staggered ScrollTrigger ──
      if (qrSectionRef.current) {
        gsap.from(qrSectionRef.current.querySelectorAll(".qr-link-card"), {
          scrollTrigger: {
            trigger: qrSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          scale: 0.88,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.4)",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ pb: 10 }}>

        {/* ── HERO ── */}
        <Box className="hero-section" ref={heroRef}>
          <Typography className="hero-title" variant="h1">
            Blue Dog API
          </Typography>
        </Box>

        <Box ref={subtitleRef} sx={{ textAlign: "center", mb: 4 }}>
          <Typography className="hero-subtitle" variant="h5">
            Your open-source Bluey universe data source
          </Typography>

          {/* API endpoint chips */}
          <Box
            ref={chipsRef}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
              mt: 2,
            }}
          >
            {apiEndpoints.map(({ label, emoji, path }) => (
              <Link to={path} key={label}>
                <span className="feature-chip">
                  {emoji} {label}
                </span>
              </Link>
            ))}
          </Box>
        </Box>

        {/* ── GIF CAROUSEL ── */}
        <Box
          ref={carouselRef}
          sx={{ display: "flex", justifyContent: "center", mb: 8 }}
        >
          <GifCarousel />
        </Box>

        {/* ── RAPIDAPI FEATURE ── */}
        <Box ref={rapidApiRef} sx={{ textAlign: "center", mb: 8 }}>
          <div className="section-divider">
            <h2>Featured on RapidAPI</h2>
          </div>
          <Typography
            variant="body1"
            sx={{
              color: "var(--text-mid)",
              mb: 3.5,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: "1.05rem",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            Access all Bluey data through RapidAPI — built-in rate limiting,
            usage analytics, and dead-simple key management.
          </Typography>
          <a
            href="https://rapidapi.com/404pandas/api/bluey-tv"
            target="_blank"
            rel="noopener noreferrer"
            className="rapid-api-badge pulse-glow"
          >
            {/* RapidAPI lightning bolt icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Try it on RapidAPI
          </a>
        </Box>

        {/* ── CONNECT / QR ── */}
        <Box ref={qrSectionRef}>
          <div className="section-divider">
            <h2>Connect With Me</h2>
          </div>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "var(--text-mid)",
              mb: 4,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Looking for full-stack development work!
          </Typography>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {links.map(({ src, alt, label, url }) => (
              <Grid key={label} size={{ xs: 12, sm: 4 }}>
                <Link to={url}>
                  <Box className="qr-link-card">
                    <img className="qr-codes" src={src} alt={alt} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--bluey-dark)",
                        fontFamily: "'hello-headline', cursive",
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
