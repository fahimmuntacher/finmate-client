import React, { useContext } from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import StaticSections from './StaticSection/StaticSection';
import PlanCard from './PlanCard/PlanCard';
import Statistics from './Statistics/Statistics';
import { AuthContext } from '../../Context/AuthContext';

import DemoTheme from '../../Demo/DemoTheme';


const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <div> 
          <title>Home | Finmate</title>
            <HeroBanner></HeroBanner>
            
            {user && <Statistics></Statistics>  }
            <StaticSections></StaticSections>
            <PlanCard></PlanCard>
            {/* <DemoTheme></DemoTheme> */}
        </div>
    );
};

export default Home;