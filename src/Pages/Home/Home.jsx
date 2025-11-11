import React from 'react';
import Banner from './Banner';
import Overview from './Overview';
import Tips from './Tips';
import WhyPlanningMatters from './WhyPlanningMatters';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Overview/>
            <Tips/>
            <WhyPlanningMatters/>
        </div>
    );
};

export default Home;