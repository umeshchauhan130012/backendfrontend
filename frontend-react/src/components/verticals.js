import React from 'react';
import radioFm from '../images/big-fm.png';

const Verticals = () => {
    return (
        <div className='verticles-wrp'>
            <div className='custom-row'>
                <div className="custom-full section-title">
                    <h2>Verticals</h2>
                </div>
            </div>
            <div className='custom-row addbtmspace'>
                <div className='verticles-item'>
                    <div className='verticles-content'>
                        <div className='verticles-img'>
                            <img src={radioFm} height={100} width={100} alt="" />
                        </div>
                        <h4>Radio</h4>
                        <ol>
                            <li>58 radio stations and 388 private FM radio stations PAN India (3rd highest in India).</li>
                            <li>Focus on retro / classical music (Pre 2005)</li>
                            <li>16 years of presence with 85+ RJs.</li>
                            <li>#2 radio station in Metros combined .</li>
                        </ol>
                    </div>
                </div>
                <div className='verticles-item'>
                    <div className='verticles-content'>
                        <div className='verticles-img'>
                            <img src={radioFm} height={100} width={100} alt="" />
                        </div>
                        <h4>Social Media & Influencer Marketing</h4>
                        <ol>
                            <li>Monetization of 1,000+ hours of archival content on streaming platforms (Spotify, Gaana etc.).</li>
                            <li>Branding solutions to client through podcasts, story telling, music content etc.</li>
                            <li>200+ campaigns and 10+ podcasts created for clients.</li>
                        </ol>
                    </div>
                </div>
                <div className='verticles-item'>
                    <div className='verticles-content'>
                        <div className='verticles-img'>
                            <img src={radioFm} height={100} width={100} alt="" />
                        </div>
                        <h4>Audio based branding solutions</h4>
                        <ol>
                            <li>Leverage social media & influencer marketing to improve brand visibility for clients.</li>
                            <li>300+ campaigns with ~INR 4 Crs revenue in FY 22-23.</li>
                            <li>~9 Mn+ Reach.</li>
                            <li>50+ National & Regional Pages.</li>
                        </ol>
                    </div>
                </div>
                <div className='verticles-item'>
                    <div className='verticles-content'>
                        <div className='verticles-img'>
                            <img src={radioFm} height={100} width={100} alt="" />
                        </div>
                        <h4>On Ground events and activation</h4>
                        <ol>
                            <li>Engagement with listeners across all mediums through digital concerts and on ground events.</li>
                            <li>Includes awards, telling shows, marathons.</li>
                            <li>100+ campaigns for clients + internal promotions .</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verticals;
