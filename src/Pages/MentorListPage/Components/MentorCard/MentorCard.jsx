import { Icon } from '@iconify/react'
import { Button, Col, Image, Rate, Row, Tag, Typography } from "antd"
import PropTypes from "prop-types"
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import defaultAvatar2 from '../../../../assets/Photos/avatar/default_avatar_2.jpg'
import { AppContext } from '../../../../Contexts/AppContext'
import './MentorCard.scss'

function MentorCard({ mentor, setModalOpen, setCurrentIdMentor }) {
    const urlProfileMentor = `/mentor/profile/${mentor.accountId}`
    const { t } = useContext(AppContext)

    const handleBook = () => {
        setCurrentIdMentor(mentor.accountId)
        setModalOpen(true)
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
                    <Link className='name-link' to={urlProfileMentor}>
                        <h1 className="name">{mentor.fullName}</h1>
                    </Link>

                    {mentor?.point > 180 &&
                        <div className="status-user">
                            <Icon className='icon' icon="mingcute:user-star-fill" />
                            <p className='text-status'>Top Mentor</p>
                        </div>}

                    <div className="rating-block">
                        {mentor.averageRating > 0
                            &&
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={0}
                                value={mentor.averageRating}
                            />}

                        <div>
                            <Typography.Text strong>
                                {`${mentor?.averageRating || t('No reviews yet')}`}
                            </Typography.Text>
                            {` (${mentor.ratingCount || 0} ${t('reviews')})`}
                        </div>
                    </div>

                    <div className="skill-tag-block">
                        {mentor.skills.slice(0, 5).map((skill, index) => (
                            <Tag color='blue' bordered={false} className="tag" key={index}>{skill}</Tag>
                        ))}
                    </div>

                    <div className="time-block">
                        <Icon style={{ margin: '0 5px' }} className='icon' icon="tdesign:time" />
                        {mentor?.availableSlots?.length > 0 ?
                            <>
                                <Tag color='green' style={{ cursor: 'pointer' }} onClick={handleBook}>{mentor?.availableSlots[0]?.slotStart}</Tag>
                                {mentor?.availableSlots?.length > 1 && <Tag color='green' style={{ cursor: 'pointer' }} onClick={handleBook}>{mentor?.availableSlots?.length - 1}+</Tag>}
                            </>
                            : <span>No time available</span>
                        }
                    </div>

                    <p className="description"><Icon icon="material-symbols-light:description-outline" /> {mentor.description || t('No description')}</p>
                </Col>
            </Row>

            <Row className='btn-block'>
                <Link to={urlProfileMentor}>
                    <Button size='large' className='btn'>{t('view profile')}</Button>
                </Link>
                <Button onClick={handleBook} size='large' className='btn' type="primary">{t('book')}</Button>
            </Row>
        </div>
    )
}

export default MentorCard

MentorCard.propTypes = {
    mentor: PropTypes.object,
    setModalOpen: PropTypes.any,
    setCurrentIdMentor: PropTypes.func
}