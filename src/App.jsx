import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './components/ui/ThemeContext';
import useTheme from './components/ui/useTheme';
import Squares from './components/ui/Squares';
import Navbar from './components/navbar/Navbar';

const ThemeUpdater = ({ setTheme }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark' : 'light';
    setTheme(isDarkMode);
  }, [isDarkMode, setTheme]);

  return null;
};

function App() {
  const [theme, setTheme] = useState(true);

  return (
    <ThemeProvider>
      <ThemeUpdater setTheme={setTheme} />
      <Squares
        speed={0.2}
        squareSize={54}
        direction="diagonal"
        borderColor={theme ? "#1b1b1b" : "#333333"}
        hoverBorderColor={theme ? "#ffffff" : "#000000"}
        hoverFillColor="#222"
        backgroundColor={theme ? "#0a0a0a" : "#ffffff"}
        className="background-canvas"
      />
      <Navbar />
      {/* Other sections go here */}
    </ThemeProvider>
  );
}

export default App;