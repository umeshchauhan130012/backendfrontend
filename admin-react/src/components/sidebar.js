import React, { useEffect, useState } from 'react';
import { Link,NavLink  } from "react-router-dom";

const MenuItem = [
    {
        SubMenu: false,
        MenuItemName:"Dashboards",
        MenuItemIcon:"fa-tachometer",
        MenuItemLink:"/dashboard",
        ChildMenu:[],
    },
    {
        SubMenu:true,
        MenuItemName:"Add Content",
        MenuItemIcon:"fa-plus",
        MenuItemLink:"/",
        ChildMenu:[
            {
                SubMenu: true,
                MenuItemName: "Categories",
                MenuItemLink: "/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"All Category",
                        MenuItemLink:"/dashboard/category-list",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Add New Category",
                        MenuItemLink:"/dashboard/category-add",
                    },
                ],
              },
              {
                SubMenu: true,
                MenuItemName: "Tags",
                MenuItemLink: "/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"All Tags",
                        MenuItemLink:"/dashboard/tag-list",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Add New Tag",
                        MenuItemLink:"/dashboard/tag-add",
                    },
                ],
              },
              {
                SubMenu: true,
                MenuItemName: "Story",
                MenuItemLink: "/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"All Story",
                        MenuItemLink:"/dashboard/story-list",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Add New Story",
                        MenuItemLink:"/dashboard/story-add",
                    },
                ],
              },
              {
                SubMenu: true,
                MenuItemName: "Gallery",
                MenuItemLink: "/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"All Gallery",
                        MenuItemLink:"/dashboard/gallery-list",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Add New Gallery",
                        MenuItemLink:"/dashboard/gallery-add",
                    },
                ],
              },
        ],
    },
    {
        SubMenu:true,
        MenuItemName:"Breaking",
        MenuItemIcon:"fa-newspaper-o",
        MenuItemLink:"",
        ChildMenu:[
            {
                SubMenu:true,
                MenuItemName:"Company",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"About",
                        MenuItemLink:"about",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Mission",
                        MenuItemLink:"/mission",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Community",
                        MenuItemLink:"/community",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Help",
                        MenuItemLink:"/help",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Media",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"News",
                        MenuItemLink:"/news",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Events",
                        MenuItemLink:"/events",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Blog",
                        MenuItemLink:"/blog",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Careers",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"New Opportunities",
                        MenuItemLink:"/opportunities",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Life @ Company",
                        MenuItemLink:"/lifeCompany",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Why Join Us?",
                        MenuItemLink:"/whyJoinUs",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Information",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Return Policy",
                        MenuItemLink:"/returnPolicy",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Privecy Policy",
                        MenuItemLink:"/privecyPolicy",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Terms & Conditions",
                        MenuItemLink:"/termsConditions",
                    },
                ],
            },
        ],
    },
    {
        SubMenu:false,
        MenuItemName:"Menu",
        MenuItemIcon:"fa-plus-square-o",
        MenuItemLink:"contact",
        ChildMenu:[],
    }
];

const Sidebar = () => {

  const [bodyIsToggled, setBodyIsToggled] = useState(false);
  const handleToggleBody = () => {
    setBodyIsToggled(!bodyIsToggled);
  };

  useEffect(() => {
    if (bodyIsToggled) {
      document.body.classList.add('sidebar-activate');
    } else {
      document.body.classList.remove('sidebar-activate');
    }
    return () => {
      document.body.classList.remove('sidebar-activate');
    };
  }, [bodyIsToggled]);

 // const [isOpen, setIsopen] = useState(false);
//   const ToggleSidebar = () => {
//       isOpen === true ? setIsopen(false) : setIsopen(true);
//       setisActive(false);
//       setaddActive(false);
//   };

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
        <aside className="custom-sidebar">
            <div className="sidebar-header">
            <a href=""><img src="/logo.svg" alt="logo" height="60" width="90" /></a>
            <span className="sidebar-toggle-active" onClick={handleToggleBody}><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
            </div>
            <div className="sidebar-menu">
                <ul className="custom-menu-primary">
                    {
                    MenuItem.map((menuVal, Ind) => {
                        return (
                        <li className={`menu-item ${menuVal.SubMenu ? "has-child-menu" : ""}`} key={Ind}>
                            {
                            menuVal.SubMenu ? <a className={`${isActive === Ind ? "active" : ""}`} onClick={() => OpenMenuActive(Ind)}><i className={`fa ${menuVal.MenuItemIcon}`} aria-hidden="true"></i><span>{menuVal.MenuItemName}</span></a> 
                            : <NavLink to={ menuVal.MenuItemLink }><i className={`fa ${menuVal.MenuItemIcon}`} aria-hidden="true"></i><span>{menuVal.MenuItemName}</span></NavLink>
                            }
                            
                            {menuVal.SubMenu ?
                            <ul className={`child-menu-wrapper ${isActive === Ind ? "active" : ""}`}>
                        
                                {
                                menuVal.ChildMenu.map((childVal, childInd) => {
                                    return (
                                    <li className={`menu-item ${childVal.SubMenu ? "has-child-menu" : ""}`} key={childInd}>
                                        { childVal.SubMenu ? <a className={`${addActive === childInd ? "active" : ""}`} onClick={() => OpenAddActive(childInd)}><span>{childVal.MenuItemName}</span></a>
                                        : <NavLink to={childVal.MenuItemLink}><span>{childVal.MenuItemName}</span></NavLink>}
                                        {childVal.SubMenu ?
                                        <ul className={`child-menu-wrapper ${addActive === childInd ? "active" : ""}`}>
                                        {
                                            childVal.ChildMenuInner.map((cInnerVal, cInnerInd)=>{
                                            return(
                                                <li className={`menu-item`} key={cInnerInd}><Link to={cInnerVal.MenuItemLink}><span>{cInnerVal.MenuItemName}</span></Link></li>
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
        </aside>
    );
}

export default Sidebar;
