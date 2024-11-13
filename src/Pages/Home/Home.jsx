import { Button, Card, Col, Flex, Image, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeBackground from '../../assets/Photos/background/Home_Banner.png';
import { AppContext } from '../../Contexts/AppContext';
import './Home.scss';
import { getToken } from '../../utils/storageUtils';
import axiosClient from '../../apis/axiosClient';
import avatarDefault from '../../assets/Photos/avatar/default_avatar_2.jpg'
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../../Contexts/AuthContext';


export default function Home() {
     const { t } = useContext(AppContext)
     const [topMentor, setTopMentor] = useState([])
     const { currentUser } = useContext(AuthContext)

     const fetchData = async () => {
          const token = getToken()
          const res = await axiosClient(token).get('/mentor/top-mentor')
          try {
               console.log(res)
               setTopMentor(res.topMentors)
          } catch (error) {
               console.log("Error", error)
          }
     }

     useEffect(() => {
          fetchData()
     }, [])

     const scrollToFirstContent = () => {
          if (currentUser?.isMentor === 0) {
               document.getElementById('first-content').scrollIntoView({ behavior: 'smooth' })
          } else if (currentUser?.isMentor === undefined) {
               document.getElementById('second-content').scrollIntoView({ behavior: 'smooth' })
          }
     }

     console.log(topMentor)

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
                    {currentUser.isMentor === 0 &&
                         <div className="first-content" id='first-content'>
                              {topMentor?.length !== 0 ?
                                   <h2 className='title'>{t("See Our Best Mentor")}</h2>
                                   :
                                   <h2></h2>
                              }
                              <Row gutter={[24, 24]} align='middle' justify='center'>
                                   {topMentor?.map((mentor, index) => (
                                        <Col xs={24} sm={12} md={8} className='home-mentor-card' key={index}>
                                             <Card
                                                  hoverable
                                                  cover={<div className="card-cover">
                                                       <Image
                                                            alt={mentor?.fullName}
                                                            src={mentor?.imgPath}
                                                            className='best-mentor-avatar'
                                                            onError={(e) => e.target.src = avatarDefault}
                                                       />
                                                  </div>}

                                             >
                                                  <Flex vertical style={{ marginBottom: '3rem' }}>
                                                       <Flex justify='space-between' align='center' style={{ minHeight: '4.5rem' }}>
                                                            <Col span={18} style={{ paddingLeft: '0' }}>
                                                                 <Link to={`/mentor/profile/${mentor?.accountId}`}><h2 className='top-mentor-name'>
                                                                      {mentor?.fullName}
                                                                 </h2>
                                                                 </Link>
                                                            </Col>
                                                            <Col span={6}>
                                                                 <Flex justify='center' align='center' gap={6}>
                                                                      <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{mentor?.averageRating}</span>
                                                                      <Icon icon="noto:star" style={{ fontSize: '1.3rem' }} />
                                                                 </Flex>
                                                            </Col>
                                                       </Flex>
                                                       <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{mentor?.email}</p>
                                                  </Flex>
                                                  <div className="view-btn">
                                                       <Link to={`/mentor/profile/${mentor?.accountId}`}><Button type='primary' className='best-mentor-btn'>{t("View Mentor")}</Button></Link>
                                                  </div>
                                             </Card>
                                        </Col>
                                   ))}
                              </Row>
                         </div>
                    }
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
