import React from 'react';
import buildings from '../images/buildings.png';
import socialMarketing from '../images/social-marketing.png';
import monitor from '../images/monitor.png';
import radio from '../images/radio.png';
import news from '../images/news.png';



const Synergies = () => {
    return (
        <section className='synergies-section'>
            <div className='custom-container'>
                <div className='custom-row'>
                    <div className="custom-full section-title whitetitle">
                        <h2>Unlocking Synergies</h2>
                    </div>
                </div>
                <div className='custom-row'>
                    <div className='custom-half3-1'>
                        <div className="synergies-widget">
                            <h4>Smooth Transition- After the acquisition of RBNL</h4>
                            <ul>
                                <li>Sapphire will enter a 1 to 2 year service agreement with EY to ensure smooth integration, as EY has been operating the companysince the IBC proceedings began.</li>
                                <li>Finance and control functions will be taken over immediately with initial assistance.</li>
                                <li>Marketing, staffing, and other functions will transition gradually over 6 months.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='custom-half3-2'>
                        <div className="synergies-widget">
                            <h4>Synergistic Benefits</h4>
                            <ul>
                                <li>Leveraging Big FM’s reach, Sapphire will tap into a larger audience.</li>
                                <li>Apart from the Times Group, no other player offers services across all media and broadcasting markets.</li>
                                <li>New revenue streams will reduce dependency on a single income source.</li>
                                <li>Increased business from government in RBNL (6% in FY24), Sapphire group enjoys good business from government (~30% of revenue share)</li>
                                <li>Enhanced efficiency in marketing, sales, and customer service, leading to smoother workflows and faster decision-making.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='custom-half3-1'>
                        <div className="synergies-widget">
                            <h4>Future Projects</h4>
                            <ul>
                                <li>Successful bidder for an INR 125 Crs order in Bihar.</li>
                                <li>Tied up with Indian Oil for an INR 100 Crs advertising contract; ongoing tenders with HPCL and BPCL.</li>
                                <li>Plans to launch a regional news channel to expand regional reach.</li>
                                <li>currently bidding for tenders across India to ramp up inventory, they also plan to acquire regional advertising players using internal accruals.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='custom-row'>
                    <div className='custom-combinatior'>
                        <div className='combinatior-item'>
                            <div className='combinatior-gp'>
                                <img src={buildings} height={50} width={50} alt="ooh" />
                                <label className='color1'>OOH</label>
                            </div>
                        </div>
                        <div className='combinatior-item'>
                            <div className='combinatior-gp'>
                                <img src={news} height={50} width={50} alt="ooh" />
                                <label className='color2'>NEWS</label>
                            </div>
                        </div>
                        <div className='combinatior-item'>
                            <div className='combinatior-gp'>
                                <img src={monitor} height={50} width={50} alt="ooh" />
                                <label className='color3'>TV Channel</label>
                            </div>
                        </div>
                        <div className='combinatior-item'>
                            <div className='combinatior-gp'>
                                <img src={radio} height={50} width={50} alt="ooh" />
                                <label className='color4'>RADIO</label>
                            </div>
                        </div>
                        <div className='combinatior-item'>
                            <div className='combinatior-gp'>
                                <img src={socialMarketing} height={50} width={50} alt="ooh" />
                                <label className='color5'>Digital Media</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Synergies;
