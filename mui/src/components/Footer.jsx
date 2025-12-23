import { Box, Container, Typography, Stack, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        mt: 5,
        py: 3,
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left Side */}
          <Typography variant="body1">
            © {new Date().getFullYear()} Tech World. All rights reserved.
          </Typography>

          {/* Right Side */}
          <Stack direction="row" sx={{fontFamily:"sans-serif"}} spacing={2}>
            <Link href="#home"  color="inherit" underline="hover">
              Home
            </Link>
            <Link href="#tech" color="inherit" underline="hover">
              Courses
            </Link>
            <Link href="#contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
