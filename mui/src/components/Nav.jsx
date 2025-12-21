import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import {
  useMediaQuery,
  useTheme,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";

const Navbar = () => {

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const toggleDrawer = (open) =>  {
  //   setDrawerOpen(open);
  // };

  // higher order function, which returns child function
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerLinks = [
    { title: "Home", link: "#home" },
    { title: "Tech", link: "#tech" },
  ];
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Container>
          <Toolbar>
            <DeveloperModeIcon />
            <Typography
              variant="h5"
              sx={{ flexGrow: 1, fontFamily: '"Eagle Lake", serif' }}
            >
              Tech Hub
            </Typography>
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer(true)} aria-label="open drawer">
                    <MenuIcon />
              </IconButton>
            )}

            {!isMobile && (
              <>
            <Button color="inherit" href="#home">
              Home
            </Button>
            <Button color="inherit" href="#tech">
              Tech
            </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onclose={toggleDrawer(false)}>
        <Box
          sx={{ width: 200 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <List>
            {drawerLinks.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton
                  component="a"
                  href={item.link}
                  onClick={toggleDrawer(false)}
                  aria-label={`Go to ${item.title}`}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
