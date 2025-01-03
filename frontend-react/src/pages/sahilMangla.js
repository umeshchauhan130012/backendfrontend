import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import sahilMangla from '../images/sahil-mangla.jpg';

const SahilMangla = () => {
    return (
        <ProtectedRoute>
            <section className='custom-author'>
                <div className='custom-container2'>
                    <div className='custom-row'>
                        <div className='custom-full'>
                            <div className='author-designhead'>
                                <div className='author-pic'>
                                    <img src={sahilMangla} height={200} width={200} alt="Sahil Mangla" />
                                </div>
                                <div className='author-nametitle'>
                                    <h1>Sahil Mangla</h1>
                                    <h3>Founder & Director</h3>
                                </div>
                            </div>
                        </div>
                        <div className='custom-full body-contentedit'>
                            <p><strong>Sahil Mangla,</strong> is a young and seasoned entrepreneur with a Master’s Degree from the Indian Institute of Planning and Management, additionally, Investment and Securities Certification from the National University of Singapore.</p>
                            <p>He belongs to a farming and business family that has traditionally been engaged in the Cotton Seed Oil Business at Kaithal under the name and style as “Mangla Oil Mills”.</p>
                            <p>This business has topline of Rs. 65.00 Crores and brand “Mangla Kaithal” is a popular Khal brand in the market.</p>
                            <ul>
                                <li>Sahil; commenced his media debut in 2009, with manufacturing of advertisement signages and flex. The business expanded into Outdoor Media with Delhi Metro in 2018 and then expanded into Delhi Bus Que Shelters and Himachal Roadways Buses.</li>
                                <li>Sapphire Media was converted into a Limited Company in 2022 under the name and style as “ Sapphire Media Limited”</li>
                                <li>The Company started a News Channel under the name and style as “India Daily Live” inJuly 2023.</li>
                                <li>In May 2024, the Company has also acquired Armour Display Systems Private Limited, an outdoor company operating PAN India in Railway Stations Media.</li>
                            </ul>
                            <p>Sahil Mangla, with his proven expertise in organizational turnaround management, business growth, and the creation of profitable business verticals, continues to expand Sapphire Media Limited’s reach. One of the key developments in this growth is the addition of Big FM to Sapphire’s client portfolio. This move will further enhance the offerings to Sapphire’s diverse clientele.</p>
                            <p>A seasoned entrepreneur and mentor, Sahil has established a strong reputation in the startup ecosystem by guiding emerging entrepreneurs. He is also deeply involved in the industry, sponsoring multiple conventions and events to support and foster growth within the sector.</p>
                            <p>With his work and investments into the media industry, Sahil has proved himself as a dedicated and efficient individual who doesn’t work for only profit, but also for the betterment of the world of the media’s horizons.</p>
                            <p>Sahil’s efficiency and intelligence has assisted the media industry into climbing new heights and treading the ladder that leads to success. His contributions have and will continue to spread the vast expanse of the media industry and it’s influence not only in India but around the globe, step by step.</p>
                            <p>Recently, Sapphire Media Limited participated in the Corporate Insolvency Resolution Process (CIRP) of Reliance Broadcast Network Limited (Big FM). The Resolution Plan submitted by Sapphire Media was approved by the Hon’ble NCLT Mumbai Bench, marking a significant milestone for the company. However, the plan is still pending for final approval from the Ministry of Information and Broadcasting for full implementation.</p>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    );
}

export default SahilMangla;
