import { useEffect, useRef, useState } from "react";
import Div from './division'
import { Link } from 'react-router-dom'
import ThemeButton from './themeButton'
import useFetch from "../api/useFetch";
import { fetchHeaderLogo, fetchHeadMenu, fetchNetwork, fetchTv } from '../api/allApi';
import ErrorBoundary from './errorBoundring';
import { baseUrl, siteUrl } from '../api/baseUrl';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef(null);

    const { data: livetv, loading: livetvloading, error: livetverror } = useFetch(fetchTv);
    const { data: network, loading: networkloading, error: networkerror } = useFetch(fetchNetwork);
    const { data: headerlogo, loading: hlogoloading, error: hlogoerror } = useFetch(fetchHeaderLogo);
    const { data: headermenu, loading: hmenuloading, error: hmenuerror } = useFetch(fetchHeadMenu);

    useEffect(() => {
      const handleBodyClick = () => setIsMenuOpen(false);
      if (isMenuOpen) {
        document.body.classList.add('idl24by7-menu-open');
        document.addEventListener('click', handleBodyClick);
      } else {
        document.body.classList.remove('idl24by7-menu-open');
        document.removeEventListener('click', handleBodyClick);
      }
      return () => document.removeEventListener('click', handleBodyClick);
    }, [isMenuOpen]);
  
    const toggleMenu = (event) => {
      event.stopPropagation();
      setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleBodyClick = () => setIsSearchActive(false);
        if (isSearchActive) {
          document.body.classList.add('idl24by7-searchActive');
          document.addEventListener('click', handleBodyClick);
          searchInputRef.current?.focus();
        } else {
          document.body.classList.remove('idl24by7-searchActive');
          document.removeEventListener('click', handleBodyClick);
        }
        return () => document.removeEventListener('click', handleBodyClick);
      }, [isSearchActive]);
    
    const toggleSearch = (event) => {
        event.stopPropagation();
        setIsSearchActive((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
        const header = document.querySelector(".idl24by7-mainheader");
        if (header) {
            const headerTop = header.getBoundingClientRect().top;
            setIsSticky(headerTop === 0);
        }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isSticky) {
        document.body.classList.add("idl24by7-sticky");
        } else {
        document.body.classList.remove("idl24by7-sticky");
        }
    }, [isSticky]);

console.log(livetv, "===========>");

return (
    <>
        <Div className="idl24by7-top-header">
            <Div className="idl24by7-header-pagecenter">
                <ErrorBoundary>
                {networkloading && <Div className="pusher"></Div>}
                {networkerror && <Div className="errorsms">Error: {networkerror.message}</Div>}
                {network && (
                <ul className="idl24by7-header-site">
                    {network.sort((a, b) => a.order - b.order).map((item, index) => (
                    <li key={index}>
                        <Link title={item.name} to={item.linktype ? `${siteUrl}${item.url}` : `${item.url}`} target={item.linktype ? `_self` : `_blank`} >{item.name}</Link>
                    </li>
                    ))}
                </ul>)}
                </ErrorBoundary>
                <ul className="idl24by7-header-social">
                    <li>
                        <Link to="" title="whatsapp" target="_blank" rel="nofollow">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"><g> <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#00b12f"></path> </g></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="" title="facebook" target="_blank" rel="nofollow">
                        <svg fill="#395498" version="1.1" width="17px" height="17px" viewBox="0 0 512 512" ><g strokeWidth="0"></g><g strokeLinecap="round" ></g><g> <g> <path d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379 c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302 c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263 l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"> </path> </g> </g></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="" title="twitter" target="_blank" rel="nofollow">
                        <svg height="17px" width="17px" viewBox="0 0 512 512" fill='var(--black)'><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="" title="instagram" target="_blank" rel="nofollow">
                           <svg width="18px" height="18px" viewBox="0 0 2500 2500"><g><defs><radialGradient id="gcol1" cx="332.14" cy="2511.81" r="3263.54" gradientUnits="userSpaceOnUse"><stop offset=".09" stopColor="#fa8f21"></stop><stop offset=".78" stopColor="#d82d7e"></stop></radialGradient><radialGradient id="gcol2" cx="1516.14" cy="2623.81" r="2572.12" gradientUnits="userSpaceOnUse"><stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop><stop offset="1" stopColor="#8c3aaa"></stop></radialGradient></defs><path d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57" fill="url(#gcol1)"></path><path d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57" fill="url(#gcol2)"></path></g></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="" title="youtube" target="_blank" rel="nofollow">
                        <svg width="25px" height="25px" viewBox="0 -0.5 25 25" fill="none"><g> <path fillRule="evenodd" clipRule="evenodd" d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z" stroke="#e40504" strokeWidth="1.5" strokeLinecap="round" ></path> <path fillRule="evenodd" clipRule="evenodd" d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z" stroke="#e40504" strokeWidth="1.5" strokeLinecap="round" ></path> </g></svg>
                        </Link>
                    </li>
                </ul>
                <ThemeButton />
            </Div>
        </Div>
        <header className="idl24by7-mainheader">

            <Div className="idl24by7-header-pagecenter">
                <ErrorBoundary>
                    <Div className="idl24by7-header-logo">
                        {hlogoloading && <Div className="pusher1"></Div>}
                        {hlogoerror && <Div className="errorsms">Error: {hlogoerror.message}</Div>}
                        {headerlogo && (<>
                            {headerlogo?.[0] && (
                            <Link to={headerlogo[0].logolink} className="idl24by7-headerlogo">
                                <img src={`${baseUrl}/${headerlogo[0].logohead.path}`} alt={headerlogo[0].title} width="90" height="68" />
                            </Link>
                            )}
                        </>)}
                    </Div>
                </ErrorBoundary>      
                <Div className="idl24by7-header-menuwrp">
                    <Div className="idl24by7-menuwrap">
                        <ErrorBoundary>
                            {hmenuloading && <Div className="pusher"></Div>}
                            {hmenuerror && <Div className="errorsms">Error: {hmenuerror.message}</Div>}
                            {headermenu && (
                            <ul className="idl24by7-menu">
                            {headermenu.sort((a, b) => a.order - b.order).map((item, index) => (
                                <li key={index} {...(!item.status && { style: { display: 'none' } })} >
                                    <Link title={item.name} to={item.linktype ? `${siteUrl}${item.url}` : `${item.url}`} target={item.linktype ? `_self` : `_blank`} >{item.name}</Link>
                                </li>
                                ))}
                            </ul>
                            )}
                        </ErrorBoundary>
                    </Div>
                </Div>
                <Div className="idl24by7-header-trigger">
                    <ErrorBoundary>
                        <Div className="idl24by7-tv">
                        {livetvloading && <Div className="pusher1"></Div>}
                        {livetverror && <Div className="errorsms">Error: {livetverror.message}</Div>}
                        {livetv && livetv[0]?.status && (
                            <Link to="/livetv" title="live tv">
                                <svg width="27.324" height="21.72" viewBox="0 0 27.324 21.72"> <defs> <clipPath id="clipPath2"> <rect id="Rectangle_4" data-name="Rectangle 4" width="27.324" height="21.72" fill="none"></rect> </clipPath> </defs> <g id="Group_4" data-name="Group 4" transform="translate(0 0)"> <g id="Group_3" data-name="Group 3" transform="translate(0 0)" clipPath="url(#clipPath2)"> <path id="Path_6" data-name="Path 6" d="M26.745,0H.567A.554.554,0,0,0,0,.567V16.7a.554.554,0,0,0,.567.567H13.048v3.323h-6a.567.567,0,1,0,0,1.135H20.342a.567.567,0,0,0,0-1.135H14.264V17.263H26.745c.324,0,.648-.243.567-.567V.567A.554.554,0,0,0,26.745,0M7.051,20.666a.477.477,0,0,0-.308.133.4.4,0,0,1,.308-.133m13.465.034a.524.524,0,0,0-.173-.034.456.456,0,0,1,.173.034" transform="translate(0 0)" fill="#dddddd"></path> <rect id="Rectangle_3" data-name="Rectangle 3" width="24.962" height="14.912" transform="translate(1.182 1.083)" fill="#d71920"></rect> <path id="Path_7" data-name="Path 7" d="M5.571,13.322a.226.226,0,0,1-.226-.226V6.941a.226.226,0,0,1,.226-.227H6.45a.22.22,0,0,1,.16.066.216.216,0,0,1,.066.16V12.2H9.668a.227.227,0,0,1,.169.066.231.231,0,0,1,.066.17V13.1a.218.218,0,0,1-.066.16.23.23,0,0,1-.169.066Z" transform="translate(-1.013 -1.273)" fill="#fff"></path> <path id="Path_8" data-name="Path 8" d="M12.326,13.322A.226.226,0,0,1,12.1,13.1V6.941a.226.226,0,0,1,.226-.227h.887a.218.218,0,0,1,.166.066.228.228,0,0,1,.061.16V13.1a.227.227,0,0,1-.061.16.218.218,0,0,1-.166.066Z" transform="translate(-2.294 -1.273)" fill="#fff"></path> <path id="Path_9" data-name="Path 9" d="M17.4,13.322a.343.343,0,0,1-.236-.075.427.427,0,0,1-.122-.189L15.019,7A.225.225,0,0,1,15,6.913a.193.193,0,0,1,.056-.142.2.2,0,0,1,.143-.057h.83a.276.276,0,0,1,.2.071.322.322,0,0,1,.089.137l1.6,4.861,1.595-4.861a.33.33,0,0,1,.089-.137.277.277,0,0,1,.2-.071h.831a.2.2,0,0,1,.137.057.186.186,0,0,1,.062.142A.228.228,0,0,1,20.814,7l-2.02,6.06a.427.427,0,0,1-.122.189.346.346,0,0,1-.237.075Z" transform="translate(-2.843 -1.273)" fill="#fff"></path> <path id="Path_10" data-name="Path 10" d="M23.658,13.322a.226.226,0,0,1-.226-.226V6.951a.23.23,0,0,1,.066-.17.219.219,0,0,1,.16-.066h4.154a.227.227,0,0,1,.236.237v.622a.219.219,0,0,1-.066.16.227.227,0,0,1-.169.066H24.706V9.47h2.9a.24.24,0,0,1,.169.062.215.215,0,0,1,.066.165v.584a.218.218,0,0,1-.066.166.243.243,0,0,1-.169.061h-2.9v1.728h3.181a.233.233,0,0,1,.17.066.23.23,0,0,1,.066.17V13.1a.218.218,0,0,1-.066.16.233.233,0,0,1-.17.066Z" transform="translate(-4.442 -1.273)" fill="#fff"></path> </g> </g> </svg>
                            </Link>
                        )}
                        </Div>
                    </ErrorBoundary>
                    <Div className="idl24by7-search" id="idl24by7-search-id">
                        <span className="idl24by7-search-open" onClick={toggleSearch}>
                        <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-256.000000, -1139.000000)" fill="#dddddd">
                                <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search"></path>
                            </g>
                            </g>
                        </svg>
                        <label className="idl24by7-close-ic">
                            <svg width="20px" height="20px" viewBox="-0.5 0 25 27" fill="none">
                            <path d="M3 21.32L21 3.32001" stroke="#dddddd" strokeWidth="1.5" strokeLinecap="round" ></path>
                            <path d="M3 3.32001L21 21.32" stroke="#dddddd" strokeWidth="1.5" strokeLinecap="round" ></path>
                            </svg>
                        </label>
                        </span>
                    </Div>
                    <span className="idl24by7-trigger" onClick={toggleMenu}>
                        <svg width="30px" height="30px" viewBox="0 0 28 28" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" ></g><g><path d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z" fill="#dddddd"></path><path d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z" fill="#dddddd"></path><path d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z" fill="#dddddd"></path></g></svg>
                    </span>
                </Div>
                <Div className="idl24by7-search-wrapper">
                    <Div className="idl24by7-search-wrapperin" onClick={(e) => e.stopPropagation()}>
                        <form action="searchpage.php" >
                        <input className="idl24by7-search-input" id="idl24by7-focus-input" ref={searchInputRef} name="title" type="text" placeholder="Type to search..." autoComplete="off" />
                        <button className="idl24by7-search-btn" type="submit" aria-label="search">Search</button>
                        </form>
                        <Div className="idl24by7-search-list">
                            <ul>
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>नरेंद्र मोदी</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>भारतीय राष्ट्रीय कांग्रेस</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>राशिफल</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>नीट परीक्षा</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>राष्ट्रीय स्वयंसेवक संघ</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>जलपाईगुड़ी ट्रेन हादसा</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>पश्चिम बंगाल</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>राहुल गांधी</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>उत्तर प्रदेश</Link></li>   
                                <li><Link to="" onClick={() => setIsSearchActive(false)}>वाराणसी</Link></li>  
                            </ul> 
                        </Div>
                    </Div>
                </Div>
            </Div>
        </header>
        
        <Div className="idl24by7-slide-menuwrap" onClick={(e) => e.stopPropagation()}>
            <Div className="idl24by7-slide-header" >
                <ErrorBoundary>
                    {headerlogo && (<>
                        {headerlogo?.[0] && (
                        <Link to={headerlogo[0].logolink} title={headerlogo[0].title}>
                            <img src={`${baseUrl}/${headerlogo[0].logohead.path}`} alt={headerlogo[0].title} height="74" width="96" />
                        </Link>
                        )}
                    </>)}
                </ErrorBoundary> 
                <Div className="idl24by7-slide-icon" onClick={() => setIsMenuOpen(false)}></Div>
            </Div>
            <ErrorBoundary>
                {hmenuloading && <Div className="pusher"></Div>}
                {hmenuerror && <Div className="errorsms">Error: {hmenuerror.message}</Div>}
                {headermenu && (
                <ul className="idl24by7-slide-menu">
                {headermenu.sort((a, b) => a.order - b.order).map((item, index) => (
                    <li key={index}>
                        <Link title={item.name} to={item.linktype ? `${siteUrl}${item.url}` : `${item.url}`} target={item.linktype ? `_self` : `_blank`} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
                    </li>
                    ))}
                </ul>
                )}
            </ErrorBoundary>
        </Div>
    </>
  )
}

export default Header;