import React from 'react';
import ChatCard from './chatCard';
import Div from './div';

const Footer = () => {
    return (
        <footer className="custom-footer">
            <Div className="custom-footer-inner">
                <Div className="custom-container">
                    <Div className="custom-row">
                        <Div className="custom-col-sm-6 order-2">
                            <p>CMS © 2023 jbt CMS. All rights reserved.</p>
                        </Div>
                        <Div className="custom-col-sm-6 text-right order-1">
                            <p>jbt CMS Admin System</p>
                        </Div>
                    </Div>
                </Div>
            </Div>
            <ChatCard />
        </footer>
    );
}

export default Footer;
