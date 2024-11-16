import React from 'react';
import ChatCard from './chatCard';

const Footer = () => {
    return (
        <footer className="custom-footer">
            <div className="custom-footer-inner">
                <div className="custom-container">
                    <div className="custom-row">
                        <div className="custom-col-sm-6 order-2">
                            <p>CMS © 2023 jbt CMS. All rights reserved.</p>
                        </div>
                        <div className="custom-col-sm-6 text-right order-1">
                            <p>jbt CMS Admin System</p>
                        </div>
                    </div>
                </div>
            </div>
            <ChatCard />
        </footer>
    );
}

export default Footer;
