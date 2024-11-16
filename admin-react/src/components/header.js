import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './toast';

const Header = () => {
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setTimeout(() => navigate('/'), 800);
      setToast({ message: 'Logout successfully!', type: 'success', visible: true });
    };

    const toggleClass = () => {
        document.body.classList.add('chatactive');
    };


    return (
        <header className="custom-header">
             {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            <div className="custom-header-inner">
                <div className="custom-container">
                    <div className="custom-row">
                        <div className="custom-search-container">
                            <form className="custom-search-block">
                                <input type="text" className="custom-form-control" placeholder="Search..." autoComplete="off" />
                                <button type="submit" className="search-button-icon"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <ul className="header-top-menu">
                            <li>
                                <button><i className="fa fa-bell" aria-hidden="true"></i></button>
                                <ul className="has-dropdown notification-droupdown">
                                    <li className="droupdown-menu-title">Notifications</li>
                                    <li>
                                        <button><label>New Review Receive</label><span>10 min.</span></button>
                                    </li>
                                    <li>
                                        <button><label>New Review Receive</label><span>10 min.</span></button>
                                    </li>
                                    <li>
                                        <button><label>New Review Receive</label><span>10 min.</span></button>
                                    </li>
                                    <li>
                                        <button><label>New Review Receive</label><span>10 min.</span></button>
                                    </li>
                                    <li className="droupdown-last-title"><button>View All</button></li>
                                </ul>
                            </li>
                            <li>
                                <button onClick={toggleClass}><i className="fa fa-commenting-o" aria-hidden="true"></i></button>
                            </li>
                            <li>
                                <button><img src="/user.png" alt="user" height="50" width="50" /><span className="active-login-user"><label>Helen Walter</label><em>Admin</em></span></button>
                                <ul className="has-dropdown profile-droupdown">
                                    <li>
                                        <button><i className="fa fa-user-o" aria-hidden="true"></i><span>Account</span></button>
                                    </li>
                                    <li>
                                        <button><i className="fa fa-cog" aria-hidden="true"></i><span>Settings</span></button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i><span>Log Out</span></button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
