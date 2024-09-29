import { Col, Image, Rate, Row, Typography } from "antd";
import './MentorProfile.scss';
import SkillItem from "../../Components/SkillItem/SkillItem";

function MentorProfile() {
     const rating = 5;

     return (
          <div className="mentor-profile">
               <div className="container">
                    <Row>
                         <Col md={8} className="avatar-block">
                              <Image
                                   className="img"
                                   width='100%'
                                   src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              />
                         </Col>

                         <Col md={16} className="info-block">
                              <h1 className="name">Mentor name here</h1>
                              <p className="semester"><b>Semester:</b> 7</p>
                              <div className="rating-block">
                                   <Rate disabled allowHalf defaultValue={rating} />
                                   <p><Typography.Text strong>{`${rating || 'No reviews yet'}`}</Typography.Text> {`(${rating || 0} reviews)`}</p>
                              </div>
                              <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem placeat animi dolores! Rem perspiciatis, quas, nulla doloremque, odio esse quod aperiam error necessitatibus tempore perferendis laborum veniam nam voluptates.</p>

                              <div className="skill-block">
                                   <h1 className="title">Top skills</h1>
{/*                                    
                                   <SkillItem
                                        skillName='ReactJS'
                                        icon='logos:react'
                                        percent={75}
                                   />

                                   <SkillItem
                                        skillName='NodeJS'
                                        icon='logos:nodejs'
                                        percent={40}
                                   />

                                   <SkillItem
                                        skillName='Html'
                                        icon='logos:html-5'
                                        percent={85}
                                   /> */}
                              </div>
                         </Col>
                    </Row>
               </div>
          </div>

     );
}

export default MentorProfile;