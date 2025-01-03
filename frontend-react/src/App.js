import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/contactUs';
import SahilMangla from './pages/sahilMangla';
import AdityaVashistha from './pages/adityaVashistha';
import ArmourDisplaySystem from './pages/armourDisplaySystem';
import RelianceBroadcastNetwork from './pages/relianceBroadcastNetwork';
import ScrollToTop from './components/topToScroll';
import GalleryPage from './pages/gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sahil-mangla" element={<SahilMangla />} />
        <Route path="/aditya-vashistha" element={<AdityaVashistha />} />
        <Route path="/armour-display-system" element={<ArmourDisplaySystem />} />
        <Route path="/reliance-broadcast-network" element={<RelianceBroadcastNetwork />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
