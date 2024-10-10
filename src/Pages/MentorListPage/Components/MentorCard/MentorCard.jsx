import { Icon } from '@iconify/react';
import { Button, Col, Image, Rate, Row, Tag, Typography } from "antd";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import defaultAvatar2 from '../../../../assets/Photos/avatar/default_avatar_2.jpg';
import './MentorCard.scss';

function MentorCard({ mentor, setModalOpen, setCurrentIdMentor }) {

     const handleBook = () => {
          setCurrentIdMentor(mentor.id);
          setModalOpen(true);
     }

     return (
          <div className="mentor-card">
               <Row className="infor-block">
                    <Col xs={24} sm={5} md={5} className="avatar-block">
                         <Image
                              className="avatar-img"
                              src={mentor.imgPath}
                              onError={(e) => e.target.src = defaultAvatar2}
                         />
                    </Col>

                    <Col sm={19} md={19} className="text-block">
                         <Link className='name-link' to={`/mentorprofile/${mentor.id}`}>
                              <h1 className="name">{mentor.fullName}</h1>
                         </Link>

                         {mentor?.point > 180
                              &&
                              <div className="status-user">
                                   <Icon className='icon' icon="mingcute:user-star-fill" />
                                   <p className='text-status'>Top Mentor</p>
                              </div>
                         }

                         <div className="rating-block">
                              {mentor.averageRating > 0
                                   ? <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={0}
                                        value={mentor.averageRating}
                                   />
                                   : ''}

                              <div>
                                   <Typography.Text strong>{`${mentor.averageRating || 'No reviews yet'}`}</Typography.Text> {`(${mentor.ratingCount || 0} reviews)`}
                              </div>
                         </div>

                         <div className="skill-tag-block">
                              {mentor.skills.slice(0, 5).map((skill, index) => (
                                   <Tag className="tag" key={index}>{skill}</Tag>
                              ))}
                         </div>

                         <div className="time-block">
                              <Icon className='icon' icon="tdesign:time" />
                              

                         </div>

                         <p className="description">{mentor.description || 'No description'}</p>


                    </Col>
               </Row>

               <Row className='btn-block'>
                    <Link to={`/mentorprofile/${mentor.id}`}><Button size='large' className='btn'>View Profile</Button></Link>
                    <Link><Button onClick={handleBook} size='large' className='btn' type="primary">Book</Button></Link>
               </Row>
          </div>
     );
}

export default MentorCard;

MentorCard.propTypes = {
     mentor: PropTypes.object,
     setModalOpen: PropTypes.any,
     setCurrentIdMentor: PropTypes.func
}