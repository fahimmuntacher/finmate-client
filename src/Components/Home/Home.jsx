import React from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import StaticSections from './StaticSection/StaticSection';
import PlanCard from './PlanCard/PlanCard';

const Home = () => {
    return (
        <div > 
            <HeroBanner></HeroBanner>
            <StaticSections></StaticSections>
            <PlanCard></PlanCard>
        </div>
    );
};

export default Home;