import React from 'react';
import Navbar from './components/Navbar'; 
import Services from './components/Services'; 
import BottomCTA from './components/BottomCTA'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <Navbar />  
      <Services />  
      <BottomCTA />  
    </div>
  );
};

export default App;
