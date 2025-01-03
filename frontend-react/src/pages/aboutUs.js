import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import BannerInner from '../components/bannerInner';
import bannerIMg from '../images/backg.png';
import about from '../images/chooseImg.png';
import userIcon from '../images/user-ic.png';
import ContactAddress from '../components/contactAddress';

const AboutUs = () => {
    return (
        <ProtectedRoute>
            <BannerInner bimage={bannerIMg} title="About Us" />
            <section className="body-aboutpage">
                <div className="custom-container">
                    <div className="custom-row">
                        <div className="custom-half">
                            <div className="choose-us-content">
                                <h5>About</h5>
                                <h2>Sapphire Media</h2>
                                <p><strong>Sapphire Media Ltd. (SML)</strong> is an integrated marketing communication company offering a wide range of advertising and branding solutions. It is one of India’s leading media houses. The company offers a comprehensive range of media services, including outdoor advertising, signage manufacturing, a Hindi news channel and adding Big FM will complete the bouquet for their existing clients.</p>
                                <ul>
                                    <li>Out-of-Home advertising</li>
                                    <li>On-ground events and activations</li>
                                    <li>Creative and Content solutions</li>
                                    <li>Electronic Media (TV, FM Radio)</li>
                                    <li>Digital Marketing</li>
                                    <li>Other mediums of brand comms</li>
                                    <li>Retail visibility solutions</li>
                                </ul>
                            </div>
                        </div>
                        <div className="custom-half">
                            <div className="choose-us-image-part">
                                <div className="choose-img-border"></div>
                                <div className="choose-img">
                                    <img src={about} alt="chooseImg" className="hover-effect" />
                                </div>
                                <div className="choose-customer-review-part">
                                    <div className="customer-review-icon">
                                        <div className="useric"><img src={userIcon} alt="user" height="40" width="40" /></div>
                                        <div className="star"></div>
                                    </div>
                                    <div className="customer-review-content">
                                        <div className="clientall-center">
                                            <span className="odometer">84</span>
                                            <span className="suffix">k+</span>
                                        </div>
                                        <p>Happy Customer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContactAddress />
                </div>
            </section>
        </ProtectedRoute>
    );
}

export default AboutUs;
