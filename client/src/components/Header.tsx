import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import avatar from "../assets/bandit-pat.jpeg";
import logo from "../assets/Bluey_Wave.webp";
import balloon from "../assets/images/items/balloon-start-kitchen.png";
import markers from "../assets/images/items/markers.png";

const pages = [
  { label: "Books", path: "/book" },
  { label: "Characters", path: "/character" },
  { label: "Episodes", path: "/episode" },
  { label: "Items", path: "/item" },
  { label: "Locations", path: "/location" },
  { label: "Shorts", path: "/short" },
];

const settings = [
  { label: "Account", path: "/account" },
  { label: "Login", path: "/login" },
  { label: "Logout", path: "/logout" },
  { label: "Signup", path: "/signup" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const appBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // AppBar slides down
      tl.from(appBarRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.7,
      });

      // Logo bounces in
      tl.from(
        logoRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -30,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.3"
      );

      // Title slides in from left
      tl.from(
        titleRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.35"
      );

      // Game icons pop in
      tl.from(
        navItemsRef.current,
        {
          x: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Avatar fades in
      tl.from(
        avatarRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.25"
      );
    });

    return () => ctx.revert();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Swipe detection
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  return (
    <AppBar
      position="sticky"
      id="header-padding"
      ref={appBarRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{ top: 0, zIndex: 1100 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Hamburger menu */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex" }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="api pages"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                "&:hover": {
                  background: "rgba(255,255,255,0.15)",
                  transform: "rotate(90deg)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block" } }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem key={path} onClick={handleCloseNavMenu}>
                  <Link to={path}>
                    <Typography className="menu-text" textAlign="center">
                      {label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo + title + game shortcuts */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                ref={logoRef}
                src={logo}
                alt="Bluey logo"
                id="bluey-logo-small"
              />
            </Link>
            <Link id="heading-link" to="/">
              <Typography
                id="header-title"
                variant="h5"
                noWrap
                component="span"
                ref={titleRef}
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".25rem",
                  textDecoration: "none",
                }}
              >
                Bluey API
              </Typography>
            </Link>
            <Box ref={navItemsRef} sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/keepy-uppy">
                <img src={balloon} alt="keepy-uppy" id="keepy-uppy-balloon" />
              </Link>
              <Link to="/drawing-app">
                <img src={markers} alt="drawing-app" id="drawing-app-marker" />
              </Link>
            </Box>
          </Box>

          {/* Avatar / user settings */}
          <Box sx={{ flexGrow: 0 }} ref={avatarRef}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                <Avatar
                  alt="Bandit and Pat"
                  src={avatar}
                  sx={{
                    border: "3px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "48px" }}
              id="menu-user-settings"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ label, path }) => (
                <MenuItem key={path} onClick={handleCloseUserMenu}>
                  <Link to={path}>
                    <Typography textAlign="center" className="menu-text">
                      {label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
