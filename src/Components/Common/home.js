import React from 'react';
import Header from './header';
import Footer from './footer';
import LandingPage from './landingPage';
import * as coreStyles from '../../styles/styles.css';

const Home = () => {
    return (
        <>
            <div className={coreStyles.homeContent}>
                <Header />
                <LandingPage />
                <Footer />
            </div>
        </>
    );
};

export default Home;
