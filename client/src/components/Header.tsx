import * as React from "react";
import { Link } from "react-router-dom";
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

// Corrected route paths
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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Swipe Detection for Mobile
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // Swiped left
      console.log("Swiped left");
    } else if (diff < -50) {
      // Swiped right
      console.log("Swiped right");
    }
  };

  // Pause autoplay on hover (replace this with actual autoplay pause logic)
  const handleMouseEnter = () => {
    console.log("Pause autoplay");
    // e.g. pauseCarousel();
  };

  const handleMouseLeave = () => {
    console.log("Resume autoplay");
    // e.g. resumeCarousel();
  };

  return (
    <AppBar
      position='static'
      id='header-padding'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <IconButton
              size='large'
              aria-label='api pages'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
                    <Typography className='menu-text' textAlign='center'>
                      {label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo and links */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Link to='/'>
              <img src={logo} alt='logo' id='bluey-logo-small' />
            </Link>
            <Link id='heading-link' to='/'>
              <Typography
                id='header-title'
                variant='h5'
                noWrap
                component='a'
                href=''
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Bluey API
              </Typography>
            </Link>
            <Link to='/keepy-uppy'>
              <img src={balloon} alt='keepy-uppy' id='keepy-uppy-balloon' />
            </Link>
            <Link to='/drawing-app'>
              <img src={markers} alt='drawing-app' id='drawing-app-marker' />
            </Link>
          </Box>

          {/* Avatar/User Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Yennefer' src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-user-settings'
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
                    <Typography textAlign='center' className='menu-text'>
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
