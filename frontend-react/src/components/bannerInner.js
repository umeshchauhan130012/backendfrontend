import React from 'react';
import { Link } from 'react-router-dom';

const BannerInner = (props) => {
    return (
        <section className='inner-banner' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${props.bimage})`}}>
            <div className='custom-container'>
                <div className='custom-row'>
                    <div className='custom-full'>
                        <h1>{props.title}</h1>
                        <ul className='banner-breadcrumb'>
                            <li><Link to="">Home</Link></li>
                            <li>{props.title}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerInner;
