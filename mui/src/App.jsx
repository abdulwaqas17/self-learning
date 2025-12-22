import { useState } from "react";
import "@fontsource/roboto";
import "./App.css";
import Navbar from "./components/Nav";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import Hero from "./components/Hero";
import Courses from "./components/Courses";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Hero/>
        <Courses/>
      </ThemeProvider>
    </>
  );
}

export default App;
