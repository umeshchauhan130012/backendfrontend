import React, { useState }  from 'react';
import { Link,NavLink  } from "react-router-dom";
import Logo from '../images/sapphire-logo.webp';

const MenuItem = [
    {
        SubMenu: false,
        MenuItemName:"Home",
        MenuItemLink:"/",
        ChildMenu:[],
    },
    {
        SubMenu: false,
        MenuItemName:"About",
        MenuItemLink:"/about-us",
        ChildMenu:[],
    },
    {
        SubMenu:true,
        MenuItemName:"Pramoters",
        MenuItemLink:"",
        ChildMenu:[
            {
                SubMenu:false,
                MenuItemName:"Sahil Mangla",
                MenuItemLink:"/sahil-mangla",
                ChildMenuInner:[],
            },
            {
                SubMenu:false,
                MenuItemName:"Aditya Vashistha",
                MenuItemLink:"/aditya-vashistha",
                ChildMenuInner:[],
            },
        ],
    },
    {
        SubMenu:true,
        MenuItemName:"Groups",
        MenuItemLink:"",
        ChildMenu:[
            {
                SubMenu:true,
                MenuItemName:"Sapphire Media",
                MenuItemLink:"",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Armour Display System",
                        MenuItemLink:"/armour-display-system",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Reliance Broadcast Network",
                        MenuItemLink:"/reliance-broadcast-network",
                    },
                ],
            },
        ],
    },
    {
        SubMenu:false,
        MenuItemName:"Our Media Gallery",
        MenuItemLink:"/gallery",
        ChildMenu:[],
    },
    {
        SubMenu:false,
        MenuItemName:"Contact us",
        MenuItemLink:"/contact-us",
        ChildMenu:[],
    }
];

const Header = () => {
  const [isOpen, setIsopen] = useState(false);
  const ToggleSidebar = () => {
      isOpen === true ? setIsopen(false) : setIsopen(true);
      setisActive(false);
      setaddActive(false);
  };

  const [isActive, setisActive] = useState(false);
  const OpenMenuActive = (ind) => {
    if (isActive === ind) {
      return setisActive(null);
    }
    setisActive(ind);
  };

  const [addActive, setaddActive] = useState(false);
  const OpenAddActive = (childInd) => {
    if (addActive === childInd) {
      return setaddActive(null);
    }
    setaddActive(childInd);
  };

  return (
    <header className='main-header'>
        <div className='main-header-container'>
            <div className='header-logo'>
                <Link to="/">
                     <img src={Logo}  alt="" height={76} width={155} />
                </Link>   
            </div>    
            <div className={ `mobile-trigger ${isOpen == true ? 'active' : ''}`}>
                <span className='triggerbtn' onClick={ToggleSidebar}><em></em><em></em><em></em></span>
            </div>
            <div className={`custom-menu-wrapper ${isOpen == true ? 'menu-open' : ''}`}>
                <ul className="custom-menu-primary">
                    {
                    MenuItem.map((menuVal, Ind) => {
                        return (
                        <li className={`menu-item ${menuVal.SubMenu ? "has-submenu" : ""}`} key={Ind}>
                            {
                            menuVal.SubMenu ? <a className={`${isActive === Ind ? "active" : ""}`} onClick={() => OpenMenuActive(Ind)}>{menuVal.MenuItemName}</a> 
                            : <NavLink to={ menuVal.MenuItemLink }>{menuVal.MenuItemName}</NavLink>
                            }
                            
                            {menuVal.SubMenu ?
                            <ul className={`childmenu-wrapper ${isActive === Ind ? "active" : ""}`}>
                        
                                {
                                menuVal.ChildMenu.map((childVal, childInd) => {
                                    return (
                                    <li className={`menu-item ${childVal.SubMenu ? "has-submenu" : ""}`} key={childInd}>
                                        { childVal.SubMenu ? <a className={`${addActive === childInd ? "active" : ""}`} onClick={() => OpenAddActive(childInd)}>{childVal.MenuItemName}</a>
                                        : <NavLink to={ childVal.MenuItemLink }>{childVal.MenuItemName}</NavLink>}
                                        {childVal.SubMenu ?
                                        <ul className={`childmenu-wrapper ${addActive === childInd ? "active" : ""}`}>
                                        {
                                            childVal.ChildMenuInner.map((cInnerVal, cInnerInd)=>{
                                            return(
                                                <li className={`menu-item`} key={cInnerInd}><Link to={cInnerVal.MenuItemLink}>{cInnerVal.MenuItemName}</Link></li>
                                            )
                                            })
                                        }
                                        </ul>
                                        : ""}
                                    </li>
                                    )
                                })
                                }
                        
                            </ul>
                            : ""}
                        </li>
                        )
                    })
                    }
                </ul>
            </div>
            <ul className="header-social">
                <li>
                    <a href="" target="_blank">
                        <svg fill="#333333" height="25px" width="25px" version="1.1" viewBox="0 0 310 310"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <path d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"></path> </g> </g></svg>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" ><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#333333"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#333333"></path> <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#333333"></path> </g></svg>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <svg fill="#333333" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                            <svg fill="#333333" version="1.1" width="25px" height="25px" viewBox="0 0 512.00 512.00" stroke="#333333" strokeWidth="0.00512"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <path d="M116.504,500.219V170.654H6.975v329.564H116.504 L116.504,500.219z M61.751,125.674c38.183,0,61.968-25.328,61.968-56.953c-0.722-32.328-23.785-56.941-61.252-56.941 C24.994,11.781,0.5,36.394,0.5,68.722c0,31.625,23.772,56.953,60.53,56.953H61.751L61.751,125.674z M177.124,500.219 c0,0,1.437-298.643,0-329.564H286.67v47.794h-0.727c14.404-22.49,40.354-55.533,99.44-55.533 c72.085,0,126.116,47.103,126.116,148.333v188.971H401.971V323.912c0-44.301-15.848-74.531-55.497-74.531 c-30.254,0-48.284,20.38-56.202,40.08c-2.897,7.012-3.602,16.861-3.602,26.711v184.047H177.124L177.124,500.219z"> </path> </g> </g></svg>
                    </a>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header;