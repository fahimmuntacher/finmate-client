import React, { useContext } from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import StaticSections from './StaticSection/StaticSection';
import PlanCard from './PlanCard/PlanCard';
import Statistics from './Statistics/Statistics';
import { AuthContext } from '../../Context/AuthContext';

const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <div > 
            <HeroBanner></HeroBanner>
            {user && <Statistics></Statistics>  }
            <StaticSections></StaticSections>
            <PlanCard></PlanCard>
        </div>
    );
};

export default Home;