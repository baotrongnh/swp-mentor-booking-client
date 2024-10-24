import { Button, Col, Image, Rate, Row, Tag, Typography } from "antd"
import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import defaultAvatar2 from '../../../../assets/Photos/avatar/default_avatar_2.jpg'
import './MentorInfor.scss'

function MentorInfor({ setModalOpen, mentorInfor, setCurrentTab, isCurrentUser }) {
     const skills = ['ReactJS', 'NodeJS']
     const descriptionRef = useRef(null)
     const [width, setWidth] = useState(window.innerWidth)
     const [isShowMore, setIsShowMore] = useState(false)

     useEffect(() => {
          const handleResize = () => {
               setWidth(window.innerWidth)
          };
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     useEffect(() => {
          if (descriptionRef.current) {
               const isOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
               setIsShowMore(isOverflow)
          }
     }, [width])

     const handleOpenModal = () => {
          setModalOpen(true)
     }

     return (
          <div className="mentor-infor">
               <div className="container mentor-infor-block">
                    <Row>
                         <Col md={11} lg={8} xl={7} className="avatar-block">
                              <Image
                                   className="img"
                                   width='100%'
                                   src={mentorInfor?.imgPath || 'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg'}
                                   onError={e => e.target.src = defaultAvatar2}
                              />
                         </Col>

                         <Col md={13} lg={16} xl={17} className="info-block">
                              <h1 className="name">{mentorInfor?.fullName}</h1>
                              <p className="semester"><b>Semester:</b> 7</p>
                              <div className="rating-block" onClick={() => setCurrentTab('rating')}>
                                   <Rate disabled allowHalf defaultValue={0} value={mentorInfor?.averageRating} />
                                   <p className="rating-text"><Typography.Text strong>{`${mentorInfor?.averageRating || 'No reviews yet'}`}</Typography.Text> {`(${mentorInfor?.numberReviews || 0} reviews)`}</p>
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
                                   {isCurrentUser
                                        ? <Button style={{ width: '40%' }} size="large">Edit Profile</Button>
                                        : <>
                                             <Button style={{ width: '40%' }} size="large" type="primary" onClick={handleOpenModal} >Book Now</Button>
                                             <Button style={{ width: '40%' }} size="large">Contact</Button>
                                        </>}
                              </div>
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default MentorInfor

MentorInfor.propTypes = {
     setModalOpen: PropTypes.func,
     mentorInfor: PropTypes.object,
     setCurrentTab: PropTypes.func,
     isCurrentUser: PropTypes.bool
}