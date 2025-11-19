import React from 'react'
import Div from './division'
import { Link } from 'react-router-dom'
import useFetch from "../api/useFetch";
import { fetchNetwork, fetchCopyright, fetchFootMenu, fetchFootLogo } from '../api/allApi';
import ErrorBoundary from './errorBoundring';
import { baseUrl, siteUrl } from '../api/baseUrl';


const Footer = () => {
  const { data: network, loading: networkloading, error: networkerror } = useFetch(fetchNetwork);
  const { data: copyright, loading: copyloading, error: copyerror } = useFetch(fetchCopyright);
  const { data: footermenu, loading: fmenuloading, error: fmenuerror } = useFetch(fetchFootMenu);
  const { data: footerlogo, loading: flogoloading, error: flogoerror } = useFetch(fetchFootLogo);
console.log(copyright);
  return (
    <>
        <Div className="idl24by7-footer">
            <Div className="idl24by7-footer-pagecenter">
                <Div className="idl24by7-footerlogo">
                    <ErrorBoundary>
                    <Div className="idl24by7-flogo">
                        {flogoloading && <Div className="pusher1"></Div>}
                        {flogoerror && <Div className="errorsms">Error: {flogoerror.message}</Div>}
                        {footerlogo && (<>
                            {footerlogo?.[0] && (
                            <Link to={footerlogo[0].logolink}>
                                <img src={`${baseUrl}/${footerlogo[0].logofoot.path}`} alt={footerlogo[0].title} width="160" height="123" />
                            </Link>
                            )}
                        </>)}
                    </Div>
                    </ErrorBoundary>
                    <Div className="idl24by7-social">
                        <Link title="whatsapp" to="" target="_blank" rel="nofollow">
                            <svg id="Whatsapp" viewBox="0,0,256,256" width="36px" height="36px" className="jsx-2d37e243a3a00329 header_follow_us_social"><g fill="#25d366" className="jsx-2d37e243a3a00329"><g transform="scale(5.12,5.12)" className="jsx-2d37e243a3a00329"><path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z" className="jsx-2d37e243a3a00329"></path></g></g></svg>
                        </Link>
                        <Link title="facebook" to="" target="_blank" rel="nofollow">
                            <svg enableBackground="new 0 90 612 612" height="36px" version="1.1" viewBox="0 90 612 612" width="36px" x="0px" y="0px"><g><circle cx="306" cy="396" fill="#3B5998" r="306"></circle><path d="M382.928,407.979h-54.602v200.036H245.6V407.979h-39.345v-70.301H245.6v-45.492c0-32.532,15.453-83.474,83.463-83.474l61.278,0.256v68.239H345.88c-7.293,0-17.548,3.644-17.548,19.163v41.374h61.823L382.928,407.979z" fill="#FFFFFF"></path></g></svg>
                        </Link>
                        <Link title="twitter" to="" target="_blank" rel="nofollow">
                            <svg height="36" viewBox="0 0 36 36" width="36" ><g transform="translate(-15 -164.999)"><circle cx="18" cy="18" r="18" transform="translate(15 164.999)"></circle><path d="M10.82,7.867,17.588,0h-1.6L10.107,6.831,5.414,0H0L7.1,10.33,0,18.58H1.6L7.81,11.366l4.957,7.214H18.18L10.819,7.867Zm-2.2,2.554L7.9,9.392,2.182,1.207H4.645L9.263,7.813l.719,1.029,6,8.586H13.521l-4.9-7.006Z" fill="#fff" transform="translate(23.91 173.709)"></path></g></svg>
                        </Link>
                        <Link title="instagram" to="" target="_blank" rel="nofollow">
                            <svg enableBackground="new 0 0 128 128" height="36px" version="1.1" viewBox="0 0 128 128" width="36px"><g><linearGradient gradientTransform="matrix(1 0 0 -1 594 633)" gradientUnits="userSpaceOnUse" id="SVGID_1t" x1="-566.7114" x2="-493.2875" y1="516.5693" y2="621.4296"><stop offset="0" /><stop offset="1" /></linearGradient><circle cx="64" cy="64" fill="url(#SVGID_1t)" r="64"/></g><g><g><path d="M82.333,104H45.667C33.72,104,24,94.281,24,82.333V45.667C24,33.719,33.72,24,45.667,24h36.666    C94.281,24,104,33.719,104,45.667v36.667C104,94.281,94.281,104,82.333,104z M45.667,30.667c-8.271,0-15,6.729-15,15v36.667    c0,8.271,6.729,15,15,15h36.666c8.271,0,15-6.729,15-15V45.667c0-8.271-6.729-15-15-15H45.667z" fill="#FFFFFF"/></g><g><path d="M64,84c-11.028,0-20-8.973-20-20c0-11.029,8.972-20,20-20s20,8.971,20,20C84,75.027,75.028,84,64,84z     M64,50.667c-7.352,0-13.333,5.981-13.333,13.333c0,7.353,5.981,13.333,13.333,13.333S77.333,71.353,77.333,64    C77.333,56.648,71.353,50.667,64,50.667z" fill="#FFFFFF"/></g><g><circle cx="85.25" cy="42.75" fill="#FFFFFF" r="4.583"/></g></g></svg>
                        </Link>
                        <Link title="youtube" to="" target="_blank" rel="nofollow">
                            <svg enableBackground="new 7.098 7.098 497.804 497.804" height="36px" version="1.1" viewBox="7.098 7.098 497.804 497.804" width="36px" x="0px" y="0px"><rect fill="#FFFFFF" height="233.5" stroke="#000000" strokeMiterlimit="10" width="309.5" x="101" y="139"></rect><g><linearGradient gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse" id="SVGID_1p" x1="29.8496" x2="443.0888" y1="464.1494" y2="50.9102"><stop offset="0" ></stop><stop offset="0.5153" ></stop><stop offset="1" ></stop></linearGradient><polygon fill="url(#SVGID_1p)" points="217.949,313.148 313.196,256 217.949,198.851 	"></polygon><linearGradient gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse" id="SVGID_2y" x1="39.3521" x2="452.5873" y1="473.6494" y2="60.4143"><stop offset="0" ></stop><stop offset="0.5153" ></stop><stop offset="1" ></stop></linearGradient><path d="M256,7.098C118.535,7.098,7.098,118.535,7.098,256S118.535,504.902,256,504.902S504.902,393.465,504.902,256S393.465,7.098,256,7.098z M408.349,268.287c0,26.307-3.048,52.605-3.048,52.605s-2.98,22.401-12.105,32.25c-11.593,12.936-24.574,13.012-30.527,13.773C320.026,370.184,256,370.297,256,370.297s-79.227-0.771-103.601-3.268c-6.782-1.353-21.993-0.961-33.594-13.896c-9.134-9.849-12.106-32.251-12.106-32.251s-3.048-26.289-3.048-52.604v-24.65c0-26.298,3.048-52.596,3.048-52.596s2.981-22.412,12.106-32.279c11.601-12.935,24.574-13.011,30.527-13.744c42.633-3.305,106.592-3.305,106.592-3.305h0.143c0,0,63.959,0,106.601,3.305c5.953,0.733,18.936,0.81,30.527,13.744c9.134,9.868,12.105,32.279,12.105,32.279s3.048,26.298,3.048,52.604V268.287L408.349,268.287z" fill="url(#SVGID_2y)"></path></g></svg>
                        </Link>
                    </Div>
                </Div>
                <Div className="idl24by7-footermenu">
                    <Div className="idl24by7-footermenu-item">
                        <ErrorBoundary>
                        {fmenuloading && <Div className="pusher"></Div>}
                        {fmenuerror && <Div className="errorsms">Error: {fmenuerror.message}</Div>}
                        {footermenu && (<>
                        <h3>Quick Links</h3>
                        <ul>
                            {footermenu.sort((a, b) => a.order - b.order).map((item, index) => (
                            <li key={index}>
                                <Link title={item.name} to={item.linktype ? `${siteUrl}${item.url}` : `${item.url}`} target={item.linktype ? `_self` : `_blank`} >{item.name}</Link>
                            </li>
                            ))}
                        </ul>
                        </>)}
                        </ErrorBoundary>
                    </Div>
                    <Div className="idl24by7-footermenu-item">
                        <ErrorBoundary>
                        
                        {networkloading && <Div className="pusher"></Div>}
                        {networkerror && <Div className="errorsms">Error: {networkerror.message}</Div>}
                        {network && (<>
                        <h3>Network</h3>
                        <ul>
                            {network.sort((a, b) => a.order - b.order).map((item, index) => (
                            <li key={index}>
                                <Link title={item.name} to={item.linktype ? `${siteUrl}${item.url}` : `${item.url}`} target={item.linktype ? `_self` : `_blank`} >{item.name}</Link>
                            </li>
                            ))}
                        </ul>
                        </>)}
                        </ErrorBoundary>
                    </Div>
                    <Div className="idl24by7-copyright">
                        <ErrorBoundary>
                            {copyloading && <Div className="pusher"></Div>}
                            {copyerror && <Div className="errorsms">Error: {copyerror.message}</Div>}
                            {copyright && (<>
                                {copyright.map((item, index) => (
                                    <p key={index}>{item.copy}</p>
                                ))}
                            </>)}
                       </ErrorBoundary>
                    </Div>
                </Div>
            </Div>
        </Div>

        <Div className="idl24by7-stickyBottom">
            <Div className="idl24by7-sticky-footer">
                <Div className="idl24by7-navelement ">
                <Link aria-label="Website URL" to="">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M20.3396 9.86498C20.2683 10.0522 20.1417 10.2132 19.9766 10.3268C19.8116 10.4404 19.616 10.5011 19.4156 10.5009H17.4366V19.4158C17.4369 19.5459 17.4115 19.6749 17.3619 19.7952C17.3122 19.9155 17.2393 20.0248 17.1473 20.1168C17.0552 20.2088 16.9459 20.2818 16.8256 20.3314C16.7053 20.3811 16.5764 20.4065 16.4462 20.4061H13.4743C13.3439 20.4069 13.2146 20.3819 13.0939 20.3324C12.9732 20.2829 12.8635 20.2101 12.7711 20.118C12.6787 20.0259 12.6055 19.9165 12.5556 19.7959C12.5058 19.6754 12.4803 19.5462 12.4806 19.4158V15.5728C12.5026 15.0835 12.3483 14.6025 12.0459 14.2172C11.7435 13.8319 11.313 13.5678 10.8325 13.4728C10.3157 13.3847 9.78509 13.5049 9.35663 13.8069C8.92816 14.109 8.63672 14.5684 8.54603 15.0847C8.52584 15.206 8.51601 15.3288 8.51663 15.4518V19.4141C8.51719 19.5445 8.49191 19.6738 8.44225 19.7944C8.39259 19.915 8.31954 20.0246 8.22731 20.1168C8.13508 20.209 8.0255 20.2821 7.90489 20.3318C7.78427 20.3814 7.65502 20.4067 7.52459 20.4061H4.55351C4.42339 20.4064 4.29451 20.3809 4.17426 20.3312C4.054 20.2815 3.94474 20.2086 3.85273 20.1166C3.76072 20.0246 3.68778 19.9153 3.63809 19.795C3.5884 19.6748 3.56293 19.5459 3.56315 19.4158V10.5H1.58159C1.38089 10.499 1.18521 10.4372 1.02043 10.3226C0.855665 10.2079 0.729568 10.046 0.658825 9.85819C0.588083 9.67037 0.576028 9.46549 0.624255 9.27066C0.672482 9.07583 0.778718 8.90024 0.928911 8.7671L9.85055 0.842539C10.0311 0.682864 10.2639 0.594727 10.5049 0.594727C10.746 0.594727 10.9787 0.682864 11.1593 0.842539L20.0792 8.7671C20.2272 8.90326 20.331 9.08055 20.3774 9.27619C20.4238 9.47183 20.4107 9.67688 20.3396 9.86498Z" stroke="var(--primary)" strokeWidth="1.5"></path>
                    </svg>
                    <span>होम</span>
                </Link>
                </Div>
                <Div className="idl24by7-navelement ">
                <Link aria-label="Live TV Url" to="">
                    <svg width="27" height="20" viewBox="0 0 28 20" fill="none">
                    <rect x="0.461914" y="0.669922" width="26" height="16.2685" rx="0.75" stroke="var(--primary)" strokeWidth="1"></rect>
                    <path d="M7.15894 18.985H21.0531" stroke="var(--primary)" strokeLinecap="round"></path>
                    <path d="M8.02401 11.3163V7.03228H8.79201V10.6683H10.58V11.3163H8.02401ZM13.0148 11.3163H11.2148V10.8783L11.7308 10.6863V7.66828L11.2148 7.47028V7.03228H13.0148V7.47028L12.4988 7.66828V10.6863L13.0148 10.8783V11.3163ZM17.2515 7.03228L15.7695 11.3163H14.9475L13.4655 7.03228H14.2515L15.1155 9.65428C15.1395 9.72628 15.1675 9.82028 15.1995 9.93628C15.2315 10.0483 15.2615 10.1643 15.2895 10.2843C15.3215 10.4043 15.3455 10.5083 15.3615 10.5963C15.3735 10.5083 15.3935 10.4043 15.4215 10.2843C15.4495 10.1643 15.4795 10.0483 15.5115 9.93628C15.5435 9.82028 15.5735 9.72628 15.6015 9.65428L16.4655 7.03228H17.2515ZM20.4847 11.3163H18.0487V7.03228H20.4847V7.67428H18.8167V8.76628H20.3767V9.40828H18.8167V10.6683H20.4847V11.3163Z" fill="var(--primary)"></path>
                    </svg>
                    <span>लाइव टीवी</span>
                </Link>
                </Div>
                <Div className="idl24by7-navelement ">
                <Link aria-label="Webstory Link" to="">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none">
                    <path d="M6.58704 0.5H16.5735C17.1837 0.5 17.8153 1.11675 17.8153 2.06107V15.939C17.8153 16.8832 17.1837 17.5 16.5735 17.5H6.58704C5.97675 17.5 5.34521 16.8832 5.34521 15.939V2.06107C5.34521 1.11674 5.97676 0.5 6.58704 0.5Z" stroke="var(--primary)"></path>
                    <path d="M1.12873 2.97327H2.81249C2.94176 2.97327 3.18339 3.12861 3.18339 3.5038V14.4962C3.18339 14.8713 2.94182 15.0266 2.81249 15.0266H1.12873C0.999379 15.0266 0.757812 14.8713 0.757812 14.4962V3.5038C0.757812 3.12862 0.999434 2.97327 1.12873 2.97327Z" stroke="var(--primary)"></path>
                    <path d="M20.348 2.97327H22.0317C22.1611 2.97327 22.4027 3.12866 22.4027 3.50381V14.4962C22.4027 14.8714 22.1611 15.0268 22.0317 15.0268H20.348C20.2187 15.0268 19.9771 14.8714 19.9771 14.4962V3.50381C19.9771 3.12866 20.2187 2.97327 20.348 2.97327Z" stroke="var(--primary)"></path>
                    </svg>
                    <span>स्टोरीज</span>
                </Link>
                </Div>
                <Div className="idl24by7-navelement ">
                <Link aria-label="Video Link" to="">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M19.848 2.89062C19.7441 2.51985 19.5324 2.18013 19.2343 1.90579C18.9363 1.63144 18.5624 1.43218 18.1505 1.32813C16.6455 1 10.6255 1 10.6255 1C10.6255 1 4.6055 1 3.1005 1.35938C2.68859 1.46343 2.31473 1.66269 2.01668 1.93704C1.71863 2.21138 1.50694 2.5511 1.403 2.92187C1.12756 4.28559 0.992832 5.66899 1.0005 7.05469C0.990682 8.45082 1.12542 9.84477 1.403 11.2187C1.51759 11.578 1.73402 11.9048 2.03138 12.1676C2.32873 12.4303 2.69697 12.6202 3.1005 12.7187C4.6055 13.0781 10.6255 13.0781 10.6255 13.0781C10.6255 13.0781 16.6455 13.0781 18.1505 12.7187C18.5624 12.6147 18.9363 12.4154 19.2343 12.1411C19.5324 11.8667 19.7441 11.527 19.848 11.1562C20.1213 9.8028 20.256 8.42995 20.2505 7.05469C20.2603 5.65856 20.1256 4.26461 19.848 2.89062Z" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.65674 9.60938L13.688 7.05469L8.65674 4.5V9.60938Z" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M1.43799 17.4375H19.813" stroke="var(--primary)" strokeLinecap="round"></path>
                    <path d="M5.37549 19.5625C6.54909 19.5625 7.50049 18.6111 7.50049 17.4375C7.50049 16.2639 6.54909 15.3125 5.37549 15.3125C4.20188 15.3125 3.25049 16.2639 3.25049 17.4375C3.25049 18.6111 4.20188 19.5625 5.37549 19.5625Z" stroke="var(--primary)"></path>
                    </svg>
                    <span>वीडियो</span>
                </Link>
                </Div>
                <Div className="idl24by7-nav-element">
                <button aria-label="Video Link" className="idl24by7-trigger2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--white)">
                    <path d="M7.54534 1.61365H2.63625C2.07142 1.61365 1.61353 2.07154 1.61353 2.63637V7.54547C1.61353 8.1103 2.07142 8.56819 2.63625 8.56819H7.54534C8.11018 8.56819 8.56807 8.1103 8.56807 7.54547V2.63637C8.56807 2.07154 8.11018 1.61365 7.54534 1.61365Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M7.54534 11.4319H2.63625C2.07142 11.4319 1.61353 11.8898 1.61353 12.4546V17.3637C1.61353 17.9285 2.07142 18.3864 2.63625 18.3864H7.54534C8.11018 18.3864 8.56807 17.9285 8.56807 17.3637V12.4546C8.56807 11.8898 8.11018 11.4319 7.54534 11.4319Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M17.3635 1.61365H12.4544C11.8895 1.61365 11.4316 2.07154 11.4316 2.63637V7.54547C11.4316 8.1103 11.8895 8.56819 12.4544 8.56819H17.3635C17.9283 8.56819 18.3862 8.1103 18.3862 7.54547V2.63637C18.3862 2.07154 17.9283 1.61365 17.3635 1.61365Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M17.3636 10.8182H12.4545C11.5507 10.8182 10.8181 11.5509 10.8181 12.4546V17.3637C10.8181 18.2674 11.5507 19.0001 12.4545 19.0001H17.3636C18.2673 19.0001 18.9999 18.2674 18.9999 17.3637V12.4546C18.9999 11.5509 18.2673 10.8182 17.3636 10.8182Z" fill="var(--primary)"></path>
                    <path d="M17.3635 11.4319H12.4544C11.8895 11.4319 11.4316 11.8898 11.4316 12.4546V17.3637C11.4316 17.9285 11.8895 18.3864 12.4544 18.3864H17.3635C17.9283 18.3864 18.3862 17.9285 18.3862 17.3637V12.4546C18.3862 11.8898 17.9283 11.4319 17.3635 11.4319Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M7.54534 1.61365H2.63625C2.07142 1.61365 1.61353 2.07154 1.61353 2.63637V7.54547C1.61353 8.1103 2.07142 8.56819 2.63625 8.56819H7.54534C8.11018 8.56819 8.56807 8.1103 8.56807 7.54547V2.63637C8.56807 2.07154 8.11018 1.61365 7.54534 1.61365Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M7.54534 11.4319H2.63625C2.07142 11.4319 1.61353 11.8898 1.61353 12.4546V17.3637C1.61353 17.9285 2.07142 18.3864 2.63625 18.3864H7.54534C8.11018 18.3864 8.56807 17.9285 8.56807 17.3637V12.4546C8.56807 11.8898 8.11018 11.4319 7.54534 11.4319Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M17.3635 1.61365H12.4544C11.8895 1.61365 11.4316 2.07154 11.4316 2.63637V7.54547C11.4316 8.1103 11.8895 8.56819 12.4544 8.56819H17.3635C17.9283 8.56819 18.3862 8.1103 18.3862 7.54547V2.63637C18.3862 2.07154 17.9283 1.61365 17.3635 1.61365Z" stroke="var(--primary)" strokeWidth="1"></path>
                    <path d="M17.3636 10.8182H12.4545C11.5507 10.8182 10.8181 11.5509 10.8181 12.4546V17.3637C10.8181 18.2674 11.5507 19.0001 12.4545 19.0001H17.3636C18.2673 19.0001 18.9999 18.2674 18.9999 17.3637V12.4546C18.9999 11.5509 18.2673 10.8182 17.3636 10.8182Z" fill="var(--primary)"></path>
                    <path d="M17.3635 11.4319H12.4544C11.8895 11.4319 11.4316 11.8898 11.4316 12.4546V17.3637C11.4316 17.9285 11.8895 18.3864 12.4544 18.3864H17.3635C17.9283 18.3864 18.3862 17.9285 18.3862 17.3637V12.4546C18.3862 11.8898 17.9283 11.4319 17.3635 11.4319Z" stroke="var(--primary)" strokeWidth="1"></path>
                    </svg>
                    <span>मेन्यु</span>
                </button>
                </Div>
            </Div>
        </Div>
        <span className="idl24by724by7-backup-totop"><i className="bi bi-arrow-up"></i></span>
    </>
  )
}

export default Footer;