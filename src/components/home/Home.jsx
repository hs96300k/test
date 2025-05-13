// src/components/home/Home.jsx
import React from 'react';
import './Home.css';
import useTheme from '../ui/useTheme';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`home-section ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="home-content">
        <h1>Hi, I'm Hashir</h1>
        <p className="subheading">A passionate developer building creative solutions.</p>
        <button className="cta-button">Explore My Work</button>
      </div>
    </section>
  );
};

export default Home;