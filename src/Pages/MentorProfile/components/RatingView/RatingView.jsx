import { useQuery } from '@tanstack/react-query'
import { Col, Rate, Row, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { getFeedback } from '../../../../apis/mentor'
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg'
import './RatingView.scss'

function RatingView({ id }) {
     const { data, isLoading } = useQuery({ queryKey: [`rating-list-${id}`, id], queryFn: () => getFeedback(id) })
     const { t } = useTranslation()

     if (isLoading) {
          return <Skeleton />
     }

     return (
          <div className="rating-view">
               <h1 className="title">{t('Rating & reviews')}</h1>
               <Row gutter={50}>
                    <Col md={12}>
                         <div className="overview">
                              <p className="number-rating">{data?.averageRating === 5 ? `${data?.averageRating}.0` : data?.averageRating}</p>
                              <Rate style={{ fontSize: '4rem' }} disabled defaultValue={0} value={data?.averageRating} allowHalf />
                              <p className='total-rating'>{`(${data?.feedbacks.length} ${t('Reviews')})`}</p>
                         </div>
                    </Col>

                    <Col md={12}>
                         <div className="review-block">
                              {data?.feedbacks.map((feedback, index) => (
                                   <div className="review-item" key={index}>
                                        <div className='top-block'>
                                             <div className='info-block'>
                                                  <img className='avatar' src={defaultAvatar} alt={feedback.studentName} />
                                                  <div className='text-block'>
                                                       <h3 className='name'>{feedback.studentName}</h3>
                                                       <div className="review-meta">
                                                            <span className="date">
                                                                 {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                                                                      year: 'numeric',
                                                                      month: 'long',
                                                                      day: 'numeric'
                                                                 })}
                                                            </span>
                                                            <span className="rating-badge">
                                                                 <Rate disabled value={feedback.rating} allowHalf />
                                                                 <span className="rating-number">{feedback.rating}</span>
                                                            </span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="comment-section">
                                             <p className="comment">{feedback.text}</p>
                                             {feedback.text.length > 200 && (
                                                  <div className="fade-overlay"></div>
                                             )}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </Col>
               </Row>
          </div>
     )
}

export default RatingView

RatingView.propTypes = {
     id: PropTypes.any,
     setModalRatingOpen: PropTypes.any,
     isCurrentUser: PropTypes.bool
}