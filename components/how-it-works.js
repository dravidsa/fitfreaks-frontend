import React from 'react';
import SectionTitle from './global/section-title';

const HowItWorks = () => {
    return (
        <div className="how-works section-padding">
                <div className="container">
                    <SectionTitle title="How it Helps " />
                    <div className="row align-items-center justify-content-around">
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                01
                            </div>
                            <h3>Fitness Enthusiasts</h3>
                            <p>This platform will help fitness enthusiasts to find out fitness events and coaches in their cities</p>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                02
                            </div>
                            <h3>Event Organizers </h3>
                            <p>Get access to fitness lovers in their cities. Have a good channels to market and manage the event end to end </p>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                03
                            </div>
                            <h3>Coaches</h3>
                            <p>Coaches get a platform to showcase their skills , acquire new customers , train them remotely and even collect the payments  </p>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                04
                            </div>
                            <h3>Merchants</h3>
                            <p>Get dedicated audience devoted to fitness.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default HowItWorks;