import { Button, Col, Row } from 'antd';
import HomeBackground from '../../assets/Photos/background/Home_Banner.png';
import './Home.scss';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';

const { Meta } = Card;

export default function Home() {
     const { t } = useContext(AppContext);

     const scrollToFirstContent = () => {
          document.getElementById('first-content').scrollIntoView({ behavior: 'smooth' })
     }

     return (
          <div className="home-page">
               <div className="banner">
                    <img src={HomeBackground} alt="Home Background" />
                    <div className="banner-content">
                         <h3>{t("SWP Mentor Booking")}</h3>
                         <h1>{t("Find Your Perfect Mentor")}</h1>
                         <p>{t("Connect with experienced professionals to guide your career")}</p>
                         <button className="banner-button" onClick={scrollToFirstContent}>{t("Get Started")}</button>
                    </div>
               </div>
               <div className="container">
                    <div className="first-content" id='first-content'>
                         <h2 className='title'>{t("See Our Best Mentor")}</h2>
                         <Row gutter={[24, 24]} align='middle' justify='center'>
                              <Col xs={24} sm={12} md={8} className='home-mentor-card'>
                                   <Card
                                        hoverable
                                        cover={<div className="card-cover">
                                             <img
                                                  alt="Young man with glasses"
                                                  src="https://i.pinimg.com/736x/72/1d/95/721d957dcbc1ea47675146260c3b41d7.jpg"
                                                  className='best-mentor-avatar'
                                             />
                                        </div>}
                                   >
                                        <Meta title="John Doe" description="johndoe123@fpt.edu.vn" />
                                        <div className="view-btn">
                                             <Link to={'browser-mentors'}><Button type='primary' className='best-mentor-btn'>{t("View Mentor")}</Button></Link>
                                        </div>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8} className='home-mentor-card'>
                                   <Card
                                        hoverable
                                        cover={<div className="card-cover">
                                             <img
                                                  alt="Man with headphones"
                                                  src="https://i.pinimg.com/564x/79/18/d5/7918d5b7be565863ee4471ab2ad6eb9a.jpg"
                                                  className='best-mentor-avatar'
                                             />
                                        </div>}
                                   >
                                        <Meta title="Kim Hana" description="hana456@fpt.edu.vn" />
                                        <div className="view-btn">
                                             <Link to={'browser-mentors'}><Button type='primary' className='best-mentor-btn'>{t("View Mentor")}</Button></Link>
                                        </div>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8} className='home-mentor-card'>
                                   <Card
                                        hoverable
                                        cover={<div className="card-cover">
                                             <img
                                                  alt="Woman with curly hair"
                                                  src="https://i.pinimg.com/564x/b7/36/13/b73613c67987d6c705c143c6be2e518b.jpg"
                                                  className='best-mentor-avatar'
                                             />
                                        </div>}
                                   >
                                        <Meta title="Reggin" description="reggin789@fpt.edu.vn" />
                                        <div className="view-btn">
                                             <Link to={'browser-mentors'}><Button type='primary' className='best-mentor-btn'>{t("View Mentor")}</Button></Link>
                                        </div>
                                   </Card>
                              </Col>
                         </Row>
                    </div>

                    <div className="second-content" id='second-content'>
                         <h2 className='title'>{t("Why Use Our Mentor Booking System?")}</h2>
                         <Row gutter={[24, 24]} align='middle' justify='center'>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Expert Guidance")}</h3>
                                        <p>{t("Connect with experienced professionals who can provide valuable insights and advice tailored to your career goals.")}</p>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Flexible Scheduling")}</h3>
                                        <p>{t("Book sessions at your convenience, fitting mentorship into your busy life with ease.")}</p>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Personalized Learning")}</h3>
                                        <p>{t("Receive one-on-one attention and customized advice to accelerate your professional growth.")}</p>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Diverse Expertise")}</h3>
                                        <p>{t("Access a wide range of mentors across various industries and specializations.")}</p>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Career Advancement")}</h3>
                                        <p>{t("Gain insights and strategies to help you climb the career ladder and achieve your professional goals.")}</p>
                                   </Card>
                              </Col>
                              <Col xs={24} sm={12} md={8}>
                                   <Card hoverable className="reason-card">
                                        <h3>{t("Networking Opportunities")}</h3>
                                        <p>{t("Expand your professional network and open doors to new opportunities through your mentors.")}</p>
                                   </Card>
                              </Col>
                         </Row>
                    </div>
               </div>
          </div>
     );
}
