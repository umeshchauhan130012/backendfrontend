import React from 'react';
import sapphiremediaMap from '../images/sapphiremedia-map.png';


const Subsidiary = () => {
    return (
        <section className='subsidiary-main'>
            <div className="custom-container">
                <div className="custom-row">
                    <div className="custom-half">
                        <div className="custom-map">
                            <img src={sapphiremediaMap} alt="sapphiremediaMap" height="429" width="400" />
                        </div>
                    </div>
                    <div className="custom-half">
                        <div className="map-content">
                            <div className="choose-us-content">
                                <h5>Subsidiary Company</h5>
                                <h2>Reliance Broadband Network Limited Overview</h2>
                                <p>Established in 2005, Reliance Broadcast Network Limited owns the 92.7 BIG FM radio station channel.</p>
                                <p>EY has been appointed to manage daily operations along with the existing professional management team intact.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Subsidiary;
