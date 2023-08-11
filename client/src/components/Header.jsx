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

const pages = [
  "Books",
  "Characters",
  "Episodes",
  "Items",
  "Locations",
  "Shorts",
];
const settings = ["Account", "Login", "Logout", "Signup"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log(pages + settings);
  return (
    <AppBar position='static' id='header-padding'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <>
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
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={{ page } + 2} onClick={handleCloseNavMenu}>
                    <Link to={`/${page}`}>
                      <Typography className='menu-text' textAlign='center'>
                        {page}
                      </Typography>
                    </Link>{" "}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </>
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
            <Link to='/keepyuppy'>
              <img src={balloon} alt='logo' id='keepy-uppy-balloon' />
            </Link>
            <Link to='/drawingapp'>
              <img src={markers} alt='logo' id='drawing-app-marker' />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Yennefer' src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={{ setting } + "2"} onClick={handleCloseUserMenu}>
                  <Link to={`/${setting}`}>
                    <Typography textAlign='center' className='menu-text'>
                      {setting}
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
export default ResponsiveAppBar;
