import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import billboard from '../images/Service_Details-billboard.png';
import emailIcon from '../images/email.png';
import callIcon from '../images/phone-call.png';
import clock from '../images/clock.png';

import { Link } from 'react-router-dom';

const ArmourDisplaySystem = () => {
    return (
        <ProtectedRoute>
            <div className='custom-details'>
                <div className='custom-container'>
                    <div className='custom-row'>
                        <div className='custom-full'>
                            <div className='srimage-contain' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${billboard})`}}>
                                <h1>Armour Display System</h1>
                                <ul className='banner-breadcrumb'>
                                    <li><Link to="">Home</Link></li>
                                    <li>Armour Display System</li>
                                </ul>
                            </div>
                        </div>
                        <div className='service-group'>
                            <div className='service-content'>
                                <h2>Armour Display Systems Limited</h2>
                                <p>We have introduced a unique innovative Out of Home Media to run your TV commercial. This is Referred as the “state-of-the-art” integrated audio-visual digital display to provide passenger information at the railway stations. We are the pioneers in Public Private Partnership model with the Indian Railways, Bus Stations and Malls.</p>
                                <p>Railway Stations nowadays are the hotspots for advertising primarily because of the large customer viewership. However, when the passenger arrives at the Railway Station he doesn’t have much to explore in the form of an advertisement. Even if the advertisement are appealing, they turn mundane overtime.</p>
                                <p>We at Armour perceive the above as an opportunity to provide you with a very economical way to put your commercial on our screens without the threat of being flipped. This gives the product a very high density of visibility and zeros the possibility of your advertisement falling short in front of consumers.</p>
                                <p>At ARMOUR DISPLAY SYSTEMS, we provide you with Brand Exposure, increase in Sales, Huge Profits, Excellent Brand Recall, and economical way of advertising in key cities of India – Bangalore, Chennai, and Mumbai & Pune. All at one go!!! Consider Armour your one time stop for all advertising needs whenever and however you need!</p>
                                <ul>
                                    <li>For a brand we provide a window to run their AV commercials interspersed in between two cycles of train information leading to a "Must see - Must hear media".</li>
                                    <li>The only media with audio capabilities in D-OOH.</li>
                                    <li>National, Regional and Hyper local Audience reach out.</li>
                                    <li>Scope for multilingual creative to be played.</li>
                                    <li>Daily unique eyeball / audience reach with very limited repeat audience.</li>
                                    <li>As we are in Main line stations, high dwell time approx. 40min leading to high OTS.</li>
                                    <li>More importantly, since we are closely linked with railways, every aspect of our scheduling is monitored by railways which are in turn delivered as automated proof of telecast.</li>
                                    <li>Continuing for two decades with Indian railways at 31 stations are our credentials.</li>
                                </ul>
                                <h3>We provide:-</h3>
                                <ul>
                                    <li>Brand Exposure : Reach a diverse audience across India, from Ladakh to Kanyakumari and Kutch to Itanagar.</li>
                                    <li>Increased Sales and Huge Profits : Convert viewers into customers, driving sales and revenue growth.</li>
                                    <li>Excellent Brand Recall : Our surveys indicate a remarkable 71% brand recall rate, surpassing other OOH mediums.</li>
                                    <li>Economical Advertising : Enjoy cost-effective, audio-visual advertising solutions.</li>
                                    <li>Foolproof Reporting : Receive detailed, itemized telecast reports for tracking ad displays and measuring campaign effectiveness.</li>
                                    <li>Strategic Partnerships : We've established robust partnerships with Indian Railways, bus stations, and malls through Public-Private Partnership (PPP) models.</li>
                                </ul>
                            </div>
                            <div className='service-sidebar'>
                                <div className='service-sidebarinner'>
                                    <div className='sidbar-content'>
                                        <div className='sidbar-title'>Service lists</div>
                                        <ul>
                                            <li>Billboard Boost</li>
                                            <li>Exposure Express</li>
                                            <li>Prime Billboard Services</li>
                                            <li>Billboard Advantage</li>
                                            <li>High Impact Ads</li>
                                        </ul>
                                    </div>
                                    <div className='sidbar-content1'>
                                        <div className='sidbar-title1'>Service lists</div>
                                        <ul>
                                            <li>
                                                <label><img src={callIcon} height={50} width="50" alt="Phone Number" /></label>
                                                <span>0120 6980900</span>
                                            </li>
                                            <li>
                                                <label><img src={emailIcon} height={50} width="50" alt="Email Address" /></label>
                                                <span>info@theindiadaily.com</span>
                                            </li>
                                            <li>
                                                <label><img src={clock} height={50} width="50" alt="Email Address" /></label>
                                                <span>Mon-Sun : 8AM - 5PM</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default ArmourDisplaySystem;
