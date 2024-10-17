import "./Footer.scss";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

function Footer() {
     return (
          <div className="footer">
               <footer className="text-center">
                    <div className="container">
                         <section className="links">
                              <div className="links-wrapper">
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/about">About Us</Link>
                                        </h6>
                                   </div>
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/help">Help</Link>
                                        </h6>
                                   </div>
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/contact">Contact</Link>
                                        </h6>
                                   </div>
                              </div>
                         </section>
                         <hr className="divider" />
                         <section className="content">
                              <p>
                                   Welcome to Mentor Booking System! We connect you with experienced mentors in various fields. Explore our platform to find the perfect mentor for your growth.
                              </p>
                         </section>
                         <section className="social-icons">
                              <Link to="" className="icon"><Icon icon="fe:facebook" /></Link>
                              <Link to="" className="icon"><Icon icon="fa6-brands:square-twitter" /></Link>
                              <Link to="" className="icon"><Icon icon="ri:google-fill" /></Link>
                              <Link to="" className="icon"><Icon icon="mdi:instagram" /></Link>
                              <Link to="" className="icon"><Icon icon="uil:linkedin" /></Link>
                              <Link to="" className="icon"><Icon icon="uiw:github" /></Link>
                         </section>
                    </div>
                    <div className="footer-bottom">
                         <p>
                              <small>2024 Mentor Booking System - All rights reserved</small>
                         </p>
                    </div>
               </footer>
          </div>
     );
}

export default Footer;
