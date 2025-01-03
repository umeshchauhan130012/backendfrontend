import React from 'react';
import mapIcon from '../images/map-placeholder.png';
import emailIcon from '../images/email.png';
import callIcon from '../images/phone-call.png';



const ContactAddress = () => {
    return (
        <div className='contact-bar'>
            <div className='custom-row'>
                <div className='custom-addressitem'>
                    <div className='address-logo'>
                        <img src={callIcon} height={50} width="50" alt="Phone Number" />
                    </div>
                    <div className='address-txt'>
                        <h3>Phone number</h3>
                        <p>0120 6980900</p>
                    </div>
                </div>
                <div className='custom-addressitem'>
                    <div className='address-logo'>
                        <img src={emailIcon} height={50} width="50" alt="Email Address" />
                    </div>
                    <div className='address-txt'>
                        <h3>Email Address</h3>
                        <p>info@theindiadaily.com</p>
                    </div>
                </div>
                <div className='custom-addressitem'>
                    <div className='address-logo'>
                        <img src={mapIcon} height={50} width="50" alt="phone number" />
                    </div>
                    <div className='address-txt'>
                        <h3>Address</h3>
                        <p>A 154/A, Second Floor, Sector- 63, Noida, UP, 201301</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactAddress;
