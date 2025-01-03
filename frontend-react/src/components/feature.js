import React, { useState } from 'react';
import billboard1 from '../images/billboard1.png';
import billboard2 from '../images/billboard2.png';
import billboard3 from '../images/billboard3.png';

const Feature = () => {
    const [activePopup, setActivePopup] = useState(null);
    
    const openPopup = (popupNumber) => {
      setActivePopup(popupNumber);
    };
    const closePopup = () => {
      setActivePopup(null);
    };

    return (
        <section className='custom-feature'>
            <div className="custom-container">
                <div className="custom-row">
                    <div className='custom-full section-title'>
                        <h5>Our Features</h5>
                        <h2>Business Verticals</h2>
                    </div>
                </div>
                <div className="custom-row">
                    <div className="feature-item">
                        <div className="features-billboard-card-body" onClick={() => openPopup(1)}>
                            <div className="features-billboard-card-image">
                                <img src={billboard1} alt="billboard1" className="hover-effect" />
                            </div>
                            <label className='features-label'>7 Yrs. in Operations</label>
                            <div className="features-billboard-card-content">
                                <h3>Illuminate Your Business with Billboard </h3>
                            </div>
                        </div>
                        {activePopup === 1 && (
                        <div className='popup-contentfeature'>
                            <span className='featurepopup-close' onClick={closePopup}></span>
                            <div className='popup-contentin'>
                                <div className="features-billboard-card-image">
                                    <img src={billboard1} alt="billboard1" className="hover-effect" />
                                    <label className='features-label'>7 Yrs. in Operations</label>
                                </div>
                                <div className="features-billboard-card-content">
                                    <h3>Illuminate Your Business with Billboard </h3>
                                    <ul>
                                        <li>Ranked amongst the top 5 outdoor media companies in India.</li>
                                        <li>Manages screens across 31 Delhi metro stations.</li>
                                        <li>Holds a 9-year contract with Delhi Metro.</li>
                                        <li>Contracts with ~50% of government advertisers.</li>
                                        <li>Operates over 2,000 strategically placed glass panels and video walls for maximum visibility.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="feature-item">
                        <div className="features-billboard-card-body" onClick={() => openPopup(2)}>
                            <div className="features-billboard-card-image">
                                <img src={billboard2} alt="billboard1" className="hover-effect" />
                            </div>
                            <label className='features-label'>15 Yrs. in Operations</label>
                            <div className="features-billboard-card-content aos-init" data-aos="fade-up">
                                <h3>Unleash the Power of Advertising </h3>
                            </div>
                        </div>
                        {activePopup === 2 && (
                        <div className='popup-contentfeature'>
                            <span className='featurepopup-close' onClick={closePopup}></span>
                            <div className='popup-contentin'>
                                <div className="features-billboard-card-image">
                                    <img src={billboard2} alt="billboard1" className="hover-effect" />
                                    <label className='features-label'>15 Yrs. in Operations</label>
                                </div>
                                <div className="features-billboard-card-content">
                                    <h3>Unleash the Power of Advertising</h3>
                                    <ul>
                                        <li>Provides engineering-based manufacturing, printing, and installation services.</li>
                                        <li>Offers end-to-end solutions, including design, fabrication, installation, & maintenance.</li>
                                        <li>Handles annual business of INR 40-50 Crs for Indian Oil Corporation fuel stations.</li>
                                        <li>Signages are produced in factories located at: Noida (on leased land), Kaithal (on owned land of ~16 acres) & Ghaziabad</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="feature-item">
                        <div className="features-billboard-card-body" onClick={() => openPopup(3)}>
                            <div className="features-billboard-card-image">
                                <img src={billboard3} alt="billboard1" className="hover-effect" />
                            </div>
                            <label className='features-label'>Launched in 2023</label>
                            <div className="features-billboard-card-content">
                                <h3>Unlock the Potential of Outdoor Marketing </h3>
                            </div>
                        </div>
                        {activePopup === 3 && (
                        <div className='popup-contentfeature'>
                            <span className='featurepopup-close' onClick={closePopup}></span>
                            <div className='popup-contentin'>
                                <div className="features-billboard-card-image">
                                    <img src={billboard3} alt="billboard1" className="hover-effect" />
                                    <label className='features-label'>Launched in 2023</label>
                                </div>
                                <div className="features-billboard-card-content">
                                    <h3>Unlock the Potential of Outdoor Marketing </h3>
                                    <ul>
                                        <li>Launched the national Hindi news channel “India Daily Live” in July 2023</li>
                                        <li>Focuses on a unique content strategy featuring snackable news content and dedicated regular programs.</li>
                                        <li>Available across all MSOs (Multiple Systems Operators), LCOs (Local Cable Operators), and DTH platforms.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="feature-item">
                        <div className="features-billboard-card-body" onClick={() => openPopup(4)}>
                            <div className="features-billboard-card-image">
                                <img src={billboard2} alt="billboard1" className="hover-effect" />
                            </div>
                            <label className='features-label'>Acquired in 2021</label>
                            <div className="features-billboard-card-content aos-init" data-aos="fade-up">
                                <h3>Unleash the Power of Advertising </h3>
                            </div>
                        </div>
                        {activePopup === 4 && (
                        <div className='popup-contentfeature'>
                            <span className='featurepopup-close' onClick={closePopup}></span>
                            <div className='popup-contentin'>
                                <div className="features-billboard-card-image">
                                    <img src={billboard2} alt="billboard1" className="hover-effect" />
                                    <label className='features-label'>Acquired in 2021</label>
                                </div>
                                <div className="features-billboard-card-content">
                                    <h3>Unleash the Power of Advertising</h3>
                                    <ul>
                                        <li>Acquired Jan Bhawna Times (Hindi Newspaper) in 2021 and marked Group’s entry into the print media</li>
                                        <li>Caters to various zones such as North India Like Delhi NCR, Haryana & Uttar Pradesh the brand aegis of Jan Bhawna Times Pvt Ltd</li>
                                        <li>Also operates a portfolio of news websites and YouTube channels.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feature;
