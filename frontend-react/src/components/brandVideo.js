import React, { useRef } from 'react';
import sunImage from '../images/sun.png';
import CountUp from 'react-countup';
import Verticals from './verticals';

const BrandVideo = () => {
    const counterSectionRef = useRef();

    const counterone = 100;
    const countertwo = 5;
    const counterthree = 200;
    const counterfoure = 50;
    

    return (
        <section className='section-video' ref={counterSectionRef}>
           <div className="custom-container">
                <div className='custom-row'>
                    <div className="counter-inner">
                        <div className='counter-item'>
                            <div className='counter-value'>
                                <CountUp
                                    className="countenumber"
                                    start={0}
                                    end={counterone}
                                    duration={2.5}
                                />
                                <span className='countenumber-title'>+</span>
                            </div>
                            <label>Indoor</label>
                        </div>
                        <div className='counter-item'>
                            <div className='counter-value'>
                                <span className='countenumber'></span>
                                <CountUp
                                    className="countenumber"
                                    start={0}
                                    end={countertwo}
                                    duration={2.5}
                                />
                                <span className='countenumber-title'>M+</span>
                            </div>
                            <label>Happy Client</label>
                        </div>
                        <div className='counter-item'>
                            <div className='counter-value'>
                                <CountUp
                                    className="countenumber"
                                    start={0}
                                    end={counterthree}
                                    duration={2.5}
                                />
                                <span className='countenumber-title'>k+</span>
                            </div>
                            <label>Canvases</label>
                        </div>
                        <div className='counter-item'>
                            <div className='counter-value'>
                                <CountUp
                                    className="countenumber"
                                    start={0}
                                    end={counterfoure}
                                    duration={2.5}
                                />
                                <span className='countenumber-title'>+</span>
                            </div>
                            <label>Outdoor</label>
                        </div>
                    </div>
                </div>
                <Verticals />
                <div className="custom-row">
                    <div className="custom-row-inner">
                        <div className="video-maincontent">
                            <h5>Watch Some Video</h5>
                            <h2>Your Brand with Billboard </h2>
                            <p>Billboard advertising is a powerful marketing tool that he businesses gain visibility and reach</p>
                        </div>
                        <div className="video-mainplyar">
                            <div className="video-banner-play">
                                <svg fill="#000000" height="40px" width="40px" version="1.1" viewBox="0 0 17.804 17.804" >
                                    <g id="c98_play">
                                        <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313    c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04    c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"/>
                                    </g>
                                </svg>
                            </div>
                            <div id="inline-youtube" className="lity-hide-youtube">
                                <iframe src="https://www.youtube.com/embed/HyZAndNMlPw?si=3DK1G4l_U130dMKi" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen=""></iframe>
                            </div>
                        </div>
                        <div className="sun-img-rotate">
                            <img src={sunImage} alt="sun" width="248" height="508" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandVideo;
