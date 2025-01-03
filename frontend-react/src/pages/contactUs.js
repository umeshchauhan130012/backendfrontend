import React from 'react';
import ProtectedRoute from '../components/protectedRoute';
import BannerInner from '../components/bannerInner';
import bannerIMg from '../images/backg.png';
import contactbillboard from '../images/contactbillboard.png';
import ContactAddress from '../components/contactAddress';


const ContactUs = () => {
    return (
        <ProtectedRoute>
            <BannerInner bimage={bannerIMg} title="Contact Us" />
            <section className='contact-form'>
                 <div className='custom-container'>
                    {/* <div className='custom-row '>
                        <div className='custom-full'>
                            <h1>Contact Us</h1>
                        </div>
                    </div> */}
                    <div className='custom-row'>
                        <div className='custom-form'>
                            <div className='form-input'>
                                <label>First Name</label>
                                <input type="text" className='custom-input' name="" />
                            </div>
                            <div className='form-input'>
                                <label>Last Name</label>
                                <input type="text" className='custom-input' name="" />
                            </div>
                            <div className='form-input'>
                                <label>Phone Number</label>
                                <input type="number" className='custom-input' name="" />
                            </div>
                            <div className='form-input'>
                                <label>Email</label>
                                <input type="email" className='custom-input' name="" />
                            </div>
                            <div className='form-input-full'>
                                <label>Message here</label>
                                <textarea type="email" className='custom-input' name=""></textarea>
                            </div>
                            <div className='form-input-button'>
                                <button className='formBtn'>Send Message</button>
                            </div>
                        </div>
                        <div className='contact-formimage'>
                            <div className='inner-formimage'>
                                <img src={contactbillboard} alt="contact" height={514} width={488} />
                            </div>
                        </div>
                    </div>
                    <ContactAddress />
                 </div>
            </section>
        </ProtectedRoute>
    );
}

export default ContactUs;
