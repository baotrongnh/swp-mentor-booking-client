import { useQuery } from '@tanstack/react-query';
import { Button, Col, Flex, Rate, Row, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { getFeedback } from '../../../../apis/mentor';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';
import './RatingView.scss';

function RatingView({ id, setModalRatingOpen, isCurrentUser }) {
     const { data, isLoading } = useQuery({ queryKey: ['skill-mentor', id], queryFn: () => getFeedback(id) });

     if (isLoading) {
          return <Skeleton />
     }

     return (
          <div className="rating-view">
               <h1 className="title">Rating & reviews</h1>
               <Row gutter={50}>
                    <Col md={12}>
                         <div className="overview">
                              <p className="number-rating">{data?.averageRating === 5 ? `${data?.averageRating}.0` : data?.averageRating}</p>
                              <Rate style={{ fontSize: '4rem' }} disabled defaultValue={0} value={data?.averageRating} allowHalf />
                              <p className='total-rating'>{`(${data?.feedbacks.length} Reviews)`}</p>
                              {!isCurrentUser && 
                                   <div className="write-feedback">
                                        <h1 className="title-write-feedback">Write your Review</h1>
                                        <p className="description">Share your feedback and help create a better booking experience for everyone.</p>
                                        <Button onClick={() => setModalRatingOpen(true)} type='primary' size='large'>Submit Reviews</Button>
                                   </div>
                              }
                         </div>
                    </Col>

                    <Col md={12}>
                         <div className="review-block">
                              {data?.feedbacks.map((feedback, index) => (
                                   <div className="review-item" key={index}>
                                        <div className='top-block'>
                                             <div className='info-block'>
                                                  <img className='avatar' src={defaultAvatar} alt="" />
                                                  <div className='text-block'>
                                                       <h1 className='name'>Bao trong</h1>
                                                       <p className="date">12/12/1212</p>
                                                  </div>
                                             </div>

                                             <Flex align='center' gap='small'>
                                                  <p style={{ fontWeight: '600' }}>4.5</p>
                                                  <Rate style={{ fontSize: '2rem' }} disabled defaultValue={0} value={feedback.rating} allowHalf />
                                             </Flex>
                                        </div>

                                        <p className="comment">{feedback.text}</p>
                                   </div>
                              ))}

                              {data?.feedbacks.map((feedback, index) => (
                                   <div className="review-item" key={index}>
                                        <div className='top-block'>
                                             <div className='info-block'>
                                                  <img className='avatar' src={defaultAvatar} alt="" />

                                                  <div className='text-block'>
                                                       <h1 className='name'>Bao trong</h1>
                                                       <p className="date">12/12/1212</p>
                                                  </div>
                                             </div>

                                             <Flex align='center' gap='small'>
                                                  <p style={{ fontWeight: '600' }}>4.5</p>
                                                  <Rate style={{ fontSize: '2rem' }} disabled defaultValue={0} value={feedback.rating} allowHalf />
                                             </Flex>
                                        </div>

                                        <p className="comment">{feedback.text}</p>
                                   </div>
                              ))}
                         </div>
                    </Col>
               </Row>
          </div>
     );
}

export default RatingView;

RatingView.propTypes = {
     id: PropTypes.any,
     setModalRatingOpen: PropTypes.any,
     isCurrentUser: PropTypes.bool
}