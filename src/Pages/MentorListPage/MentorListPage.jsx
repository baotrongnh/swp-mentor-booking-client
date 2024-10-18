import { useQuery } from '@tanstack/react-query'
import { Col, DatePicker, Pagination, Row, Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { searchMentor } from '../../apis/mentor'
import { ModalBookMentor } from '../../Components/Modal'
import { AppContext } from '../../Contexts/AppContext'
import { MentorCard, RatingSelect, SkillSearch } from './Components'
import './MentorListPage.scss'

function MentorListPage() {
     const { filterMentor, setFilterMentor, t } = useContext(AppContext)
     const [modalOpen, setModalOpen] = useState(false)
     const [currentIdMentor, setCurrentIdMentor] = useState('')
     const [currentPage, setCurrentPage] = useState(1);
     const { data: listMentor, isPending } = useQuery({
          queryKey: ['listMentor', filterMentor],
          queryFn: () => searchMentor(filterMentor),
     })

     useEffect(() => {
          setFilterMentor({ ...filterMentor, currentPage })
     }, [currentPage])

     const onChangeTime = (date, dateString) => {
          console.log(dateString)
     }

     return (
          <div className="mentor-list-page">
               <ModalBookMentor currentIdMentor={currentIdMentor} modalOpen={modalOpen} setModalOpen={setModalOpen} />

               <div className="container">
                    <Row>
                         <Col xs={0} md={7} lg={6} className='left-sidebar'>
                              <div className='skill-search-block'>
                                   <SkillSearch />
                              </div>

                              <div className="rating-filter-block">
                                   <RatingSelect />
                              </div>

                              <div className='date-filter-block'>
                                   <h1 className="title-filter-date" style={{ margin: '20px 0', fontSize: '2.2rem', fontWeight: '500' }}>{t('date')}</h1>
                                   <DatePicker
                                        multiple
                                        onChange={onChangeTime}
                                        maxTagCount="responsive"
                                        size="large"
                                        format='DD-MM-YYYY'
                                   />
                              </div>
                         </Col>

                         <Col xs={24} md={17} lg={18} className='mentor-block'>
                              {isPending
                                   ? <Skeleton active />
                                   :
                                   <Row gutter={15}>
                                        {listMentor?.mentors.map((mentor) => (
                                             <Col xs={24} xl={12} key={mentor.id}>
                                                  <MentorCard
                                                       mentor={mentor}
                                                       setModalOpen={setModalOpen}
                                                       setCurrentIdMentor={setCurrentIdMentor}
                                                  />
                                             </Col>
                                        ))}
                                   </Row>

                              }

                              <Pagination
                                   className='pagination'
                                   onChange={(page) => setCurrentPage(page)}
                                   align="center"
                                   defaultPageSize={10}
                                   defaultCurrent={1}
                                   total={listMentor?.totalMentors}
                                   showSizeChanger={false}
                                   hideOnSinglePage={true}
                              />
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default MentorListPage