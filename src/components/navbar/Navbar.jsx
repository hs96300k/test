import React, { useEffect } from "react";
import "./Navbar.css";
import lightLogo from "../../assets/lightLogo.png";
import darkLogo from "../../assets/darkLogo.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Divide as Hamburger } from "hamburger-react";
import useTheme from "../ui/useTheme";
import {
  useModeAnimation,
  ThemeAnimationType,
} from "react-theme-switch-animation";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setOpen] = React.useState(false);

  const {
    ref: animationRef,
    toggleSwitchTheme: triggerThemeWithAnimation,
    isDarkMode: animDarkMode,
  } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 0.4, // Softer blur
    duration: 1500, // Slower, smoother animation
    zIndex: 2000, // Ensure it covers navbar
    color: isDarkMode ? "#000" : "#fff", // Optional: match theme color
  });

  // Sync theme toggle with context
  useEffect(() => {
    if (animDarkMode !== isDarkMode) {
      toggleDarkMode();
    }
    // Only runs when animation state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animDarkMode]);

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      {/* Logo */}
      <div className="logo">
        <img src={isDarkMode ? lightLogo : darkLogo} alt="Hashir Logo" />
      </div>

      {/* Right Side */}
      <div className="nav-content">
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setOpen(!isOpen)}>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={30}
            color={
              isOpen && !isDarkMode
                ? "#000000"
                : isDarkMode
                ? isOpen
                  ? "#ffffff"
                  : "#7d8087"
                : "#4a4a4a"
            }
          />
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setOpen(false)}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => setOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        {/* Theme Toggle with Animation */}
        <div className="nav-toggle" ref={animationRef}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={triggerThemeWithAnimation}
            size={30}
            sunColor="#ffffff"
            moonColor="#ffffff"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
