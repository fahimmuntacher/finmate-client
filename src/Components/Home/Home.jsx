import React from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import StaticSections from './StaticSection/StaticSection';

const Home = () => {
    return (
        <div > 
            <HeroBanner></HeroBanner>
            <StaticSections></StaticSections>
        </div>
    );
};

export default Home;