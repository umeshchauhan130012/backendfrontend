import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import billboard from '../images/Service_Details-billboard.png';
import emailIcon from '../images/email.png';
import callIcon from '../images/phone-call.png';
import clock from '../images/clock.png';
import sapphiremediaMap from '../images/sapphiremedia-map.png';

import { Link } from 'react-router-dom';

const RelianceBroadcastNetwork = () => {
    return (
        <ProtectedRoute>
            <div className='custom-details'>
                <div className='custom-container'>
                    <div className='custom-row'>
                        <div className='custom-full'>
                            <div className='srimage-contain' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${billboard})`}}>
                                <h1>Reliance Broadband Network</h1>
                                <ul className='banner-breadcrumb'>
                                    <li><Link to="">Home</Link></li>
                                    <li>Reliance Broadband Network</li>
                                </ul>
                            </div>
                        </div>
                        <div className='service-group'>
                            <div className='service-content'>
                                <h2>Reliance Broadband Network Limited Overview</h2>
                                <p>Established in 2005, Reliance Broadcast Network Limited owns the 92.7 BIG FM radio station channel. EY has been appointed to manage daily operations along with the existing professional management team intact.</p>
                                <h3>Reliance Broadband Network Limited</h3>
                                <h4>Owner of 92.7 BIG FM</h4>
                                <p>Reliance Broadcast Network Limited was incorporated in 2005 and has obtained licenses from Ministry of Information and Broadcasting (to operate 58 FM radio stations 44 migrated from Phase II to Phase III while 14 licenses acquired in Phase III)</p>
                                <div className='tbllist'>
                                    <div className='tbllist-item'>
                                        <label>18 Years</label>
                                        <p>Of presence in the sector with strong brand recall</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>58</label>
                                        <p>3rd Highest number of stations in the Country</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>23</label>
                                        <p>Presence in 23 States and 4 UTs in the Country</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>5,600 +</label>
                                        <p>Advertisers served across 16 industry sectors in FY24</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>Top 3</label>
                                        <p>Consistently in top 3 on ad-volumes</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>INR 220 Crs</label>
                                        <p>Of Revenue in FY24, Likely to cross INR 257 Crs in FY25</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>#2</label>
                                        <p>Largest FM station by FCT market share in FY24 *</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>200+</label>
                                        <p># of Sales employees with presence across 61 cities</p>
                                    </div>
                                    <div className='tbllist-item'>
                                        <label>INR 2 Crs</label>
                                        <p>Lowest cost per station amongst peers **</p>
                                    </div>
                                </div>
                                <div className='content-imgfill'>
                                    <img src={sapphiremediaMap} height={566} width={526} alt="map" />
                                </div>
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

export default RelianceBroadcastNetwork;
