import { Button, Col, Image, Rate, Row, Tag, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import './MentorInfor.scss';

function MentorInfor() {
     const rating = 5;
     const skills = ['ReactJS', 'NodeJS'];
     const descriptionRef = useRef(null);
     const [width, setWidth] = useState(window.innerWidth);
     const [isShowMore, setIsShowMore] = useState(false);

     useEffect(() => {
          const handleResize = () => {
               setWidth(window.innerWidth);
          };
          window.addEventListener('resize', handleResize);
          return () => {
               window.removeEventListener('resize', handleResize);
          };
     }, []);

     useEffect(() => {
          if (descriptionRef.current) {
               const isOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
               setIsShowMore(isOverflow);
          }
     }, [width]);

     return (
          <div className="mentor-infor">
               <div className="container mentor-infor-block">
                    <Row>
                         <Col md={11} lg={8} xl={7} className="avatar-block">
                              <Image
                                   className="img"
                                   width='100%'
                                   src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              />
                         </Col>

                         <Col md={13} lg={16} xl={17} className="info-block">
                              <h1 className="name">Mentor name here</h1>
                              <p className="semester"><b>Semester:</b> 7</p>
                              <div className="rating-block">
                                   <Rate disabled allowHalf defaultValue={rating} />
                                   <p><Typography.Text strong>{`${rating || 'No reviews yet'}`}</Typography.Text> {`(${rating || 0} reviews)`}</p>
                              </div>

                              <div className="skill-block">
                                   {skills.map((skill, index) => (
                                        <Tag className="tag" key={index}>{skill}</Tag>
                                   ))}
                              </div>

                              <p className="description" ref={descriptionRef}>
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem placeat animi dolores! Rem perspiciatis, quas, nulla doloremque, odio esse quod aperiam error necessitatibus tempore perferendis laborum veniam nam voluptates.
                              </p>

                              <a className={`read-more ${isShowMore ? 'show' : ''}`}>Read more</a>

                              <div className="btn-block">
                                   <Button style={{ width: '40%' }} size="large" type="primary">Book Now</Button>
                                   <Button style={{ width: '40%' }} size="large">Contact</Button>
                              </div>
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default MentorInfor;