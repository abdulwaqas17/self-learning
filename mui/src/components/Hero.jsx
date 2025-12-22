import React from "react";
import Container from "@mui/material/Container";
import { Box, Stack, Typography, Button } from "@mui/material";

const Hero = () => {
  return (
    <Container id="home">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
        
          width: "100%",
            minHeight: "55vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "3rem", md: "4rem" } }}
          >
            Tech for Everyone
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            The Tech revolution strated since 2021
          </Typography>

          <Button variant="contained" color="secondary" href="#tech">
            Explore Now
          </Button>
        </Box>
        <Box
        sx={{width:"50%",padding:2,textAlign:"center"}}
        >
           <img src="https://i.pinimg.com/474x/34/55/6f/34556f72160acd374c86379015c32a6a.jpg" alt="tech image" style={{width:"100%",borderRadius:"20px"}} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Hero;
