import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import Banner from '../components/banner';
import About from '../components/about';
import Feature from '../components/feature';
import Subsidiary from '../components/subsidiary';
import GroupStructure from '../components/groupStructure';
import Synergies from '../components/synergies';
import BrandVideo from '../components/brandVideo';

const Home = () => {
    return (
        <ProtectedRoute>
            <Banner />
            <About />
            <Feature />
            <Subsidiary />
            <GroupStructure />
            <Synergies />
            <BrandVideo />
        </ProtectedRoute>
    );
}

export default Home;
