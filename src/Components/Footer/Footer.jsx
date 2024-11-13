import "./Footer.scss";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

function Footer() {
     const { t } = useContext(AppContext)


     return (
          <div className="footer">
               <footer className="text-center">
                    <div className="container">
                         <section className="links">
                              <div className="links-wrapper">
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/">{t("about us")}</Link>
                                        </h6>
                                   </div>
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/">{t("help")}</Link>
                                        </h6>
                                   </div>
                                   <div className="link-item">
                                        <h6>
                                             <Link to="/">{t("contact")}</Link>
                                        </h6>
                                   </div>
                              </div>
                         </section>
                         <hr className="divider" />
                         <section className="content">
                              <p>
                                   {t("welcome message")}
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
                              <small>{t("all rights reserved")}</small>
                         </p>
                    </div>
               </footer>
          </div>
     );
}

export default Footer;
