import { Icon } from '@iconify/react';
import { Button, Col, Image, Rate, Row, Tag, Typography } from "antd";
import PropTypes from "prop-types";
import './MentorCard.scss';
import { Link } from 'react-router-dom';

function MentorCard({ id, avatar, name, rating, description, skills, numReviews, semester }) {
     return (
          <div className="mentor-card">
               <Row className="infor-block">
                    <Col xs={24} sm={5} md={5} className="avatar-block">
                         {/* <img className="avatar-img" src={avatar} alt="" /> */}  
                         <Image
                              className="avatar-img"
                              src={avatar}
                         />

                    </Col>

                    <Col sm={19} md={19} className="text-block">
                         <div className="name-block">
                              <h1 className="name">{name}</h1>
                              <div className="status-user">
                                   <Icon className='icon' icon="mingcute:user-star-fill" />
                                   <p className='text-status'>Top Mentor</p>
                              </div>
                         </div>

                         <p className='position'>{`Semester: ${semester || 'No data'} `}</p>

                         <div className="rating-block">
                              <Rate disabled allowHalf defaultValue={rating} />
                              <p><Typography.Text strong>{`${rating || 'No reviews yet'}`}</Typography.Text> {`(${numReviews || 0} reviews)`}</p>
                         </div>
                         <p className="description">{description}</p>

                         <div className="skill-tag-block">
                              {skills.map((skill, index) => (
                                   <Tag className="tag" key={index}>{skill}</Tag>
                              ))}
                         </div>
                    </Col>
               </Row>

               <Row className='btn-block'>
                    <Link to={`/mentorprofile/${id}`}><Button size='large' className='btn'>View Profile</Button></Link>
                    <Link><Button size='large' className='btn' type="primary">Booking</Button></Link>
               </Row>    
          </div>
     );
}

export default MentorCard;

MentorCard.propTypes = {
     id: PropTypes.string,
     avatar: PropTypes.string,
     name: PropTypes.string,
     rating: PropTypes.number,
     description: PropTypes.string,
     skills: PropTypes.array,
     numReviews: PropTypes.number,
     semester: PropTypes.number
}