import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import adityaVashistha from '../images/aditya-vashistha.jpg';

const AdityaVashistha = () => {
    return (
        <ProtectedRoute>
            <section className='custom-author'>
                <div className='custom-container2'>
                    <div className='custom-row'>
                        <div className='custom-full'>
                            <div className='author-designhead'>
                                <div className='author-pic'>
                                    <img src={adityaVashistha} height={200} width={200} alt="Aditya Vashistha" />
                                </div>
                                <div className='author-nametitle'>
                                    <h1>Aditya Vashistha</h1>
                                    <h3>Managing Director</h3>
                                </div>
                            </div>
                        </div>
                        <div className='custom-full body-contentedit'>
                            <p>Mr. Aditya Vashistha is an entrepreneur who has an expansive and prolific career spanning 22 years across media and digital, He is a seasoned media marketing veteran who has heavily contributed to the growth stories of media houses such as The Hindustan Times, Amar Ujala and Dainik Jagran, with these media houses owing their success to his name.</p>
                            <p>Mr. Vashishta envisions an inclusive media room – on one hand, making news and information available to the grassroots levels of the country in local languages; and on the other, reaching out to the metropolitan and satellite towns with news and views that matter to them. Mr. Vashistha’s ideas are the necessities the world of media and Digital need today that will lead to the expansive growth of the media industry of India to an honour worthy level.</p>
                            <p>With his hand set efficiently in the craft of his work, Mr. Vashistha is a hard-working and purposeful individual who seeks to improve and expand the world of media and the digital frontlines beyond its capacity into a new and ideal reality.</p>
                            <p>Armour Display Systems Limited is a subsidiary of Sapphire Media Ltd. (SML) which is an integrated marketing communication company offering a wide range of advertising and branding solutions. It is one of India’s leading media houses. The company offers a comprehensive range of media services, including outdoor advertising, signage manufacturing, a Hindi news channel and adding Big FM will complete the bouquet for their existing clients.</p>
                            <ul>
                                <li>Out-of-Home advertising</li>
                                <li>On-ground events and activations</li>
                                <li>Creative and Content solutions</li>
                                <li>Electronic Media (TV, FM Radio) Digital Marketing </li>
                                <li>Other mediums of brand comms</li>
                                <li>Retail visibility solutions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    );
}

export default AdityaVashistha;
