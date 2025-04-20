import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar__logo">Map2Map</a>
      <div className="navbar__links">
        <a href="#services" className="navbar__link">Services</a>
        <a href="#contact" className="navbar__link">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
