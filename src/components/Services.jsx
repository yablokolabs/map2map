import React from 'react';
import bgImage from '../assets/citynight.jpg';
import FeatureGrid from './FeatureGrid';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Services = () => {
  useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);
  return (
    <section className="services" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="services__content">
        <h1 className="services__heading">Google Maps Management Service</h1>
        <p className="services__paragraph">
          Boost your visibility with expert management and optimization of your Google Maps listing.
        </p>
        <button className="services__button">
          FIX MY LISTING NOW
        </button>
      </div>
      
      <div className="feature-grid-container">
        <FeatureGrid />
      </div>
    </section>
  );
};

export default Services;
