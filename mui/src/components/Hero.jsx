import React from "react";
import Container from "@mui/material/Container";
import { Box, Stack, Typography, Button } from "@mui/material";

const Hero = () => {
  return (
    <Container id="home">
      <Stack
        direction={{ xs: "column", md: "row"}}
        spacing={2}
        sx={{
        
          width: "100%",
            minHeight: "30vh",
          justifyContent: "center",
          alignItems: "center",
          mt:4
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
        ><Typography
  variant="h1"
  sx={{ fontSize: { xs: "3rem", md: "3rem" } }}
>
  Empower Your Tech Skills
</Typography>
<Typography
  variant="h3"
  sx={{ fontSize: { xs: "1rem"} }}
>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis nulla ducimus deserunt consectetur, aliquid eligendi explicabo aliquam quis, expedita ad tenetur eius mandatory.
</Typography>

<Button variant="contained" color="secondary" href="#tech">
  Browse Courses
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
