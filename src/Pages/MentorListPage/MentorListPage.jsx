import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Button, Col, DatePicker, Empty, Flex, Pagination, Row, Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchMentor } from '../../apis/mentor'
import { ModalBookMentor } from '../../Components/Modal'
import { AppContext } from '../../Contexts/AppContext'
import { PageError } from '../index'
import { MentorCard, RatingSelect, SkillSearch } from './Components'
import './MentorListPage.scss'
import { disabledDateInPast } from '../../utils/validate'

function MentorListPage() {
     const { filterMentor, setFilterMentor, t } = useContext(AppContext)
     const [timeAntd, setTimeAntd] = useState()
     const [modalOpen, setModalOpen] = useState(false)
     const [currentIdMentor, setCurrentIdMentor] = useState('')
     const [currentPage, setCurrentPage] = useState(1);
     const { data: listMentor, isPending, isError } = useQuery({
          queryKey: ['listMentor', filterMentor],
          queryFn: () => searchMentor(filterMentor),
     })

     useEffect(() => {
          setFilterMentor({ ...filterMentor, page: currentPage })
     }, [currentPage])

     const onChangeTime = (date, dateString) => {
          setTimeAntd(date)
          setFilterMentor({ ...filterMentor, dates: dateString })
     }

     if (isError) return <PageError />

     return (
          <div className="mentor-list-page">
               <ModalBookMentor currentIdMentor={currentIdMentor} modalOpen={modalOpen} setModalOpen={setModalOpen} />

               <div className="container">
                    <div className="container" style={{ paddingTop: '20px' }}>
                         <Breadcrumb
                              items={[
                                   { title: <Link to='/'>{t('home')}</Link>, },
                                   { title: t('browser mentors') },
                              ]}
                         />
                    </div>
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
                                        format='YYYY-MM-DD'
                                        value={timeAntd}
                                        disabledDate={disabledDateInPast}
                                   />
                              </div>

                              <Flex justify='center' style={{ padding: '20px' }}>
                                   <Button
                                        onClick={() => {
                                             setFilterMentor({ ...filterMentor, search: '', skills: [], star: '', dates: [] })
                                             setTimeAntd(null)
                                        }}
                                        danger
                                        disabled={filterMentor.star == '' && filterMentor.skills.length === 0 && filterMentor.dates.length === 0}
                                   >
                                        x {t('Clear all filter')}
                                   </Button>
                              </Flex>
                         </Col>

                         <Col xs={24} md={17} lg={18} className='mentor-block'>
                              {isPending
                                   ? <Skeleton active />
                                   :
                                   <Row gutter={15}>
                                        {listMentor?.mentors.length > 0
                                             ? listMentor?.mentors.map((mentor) => (
                                                  <Col xs={24} xl={12} key={mentor.accountId}>
                                                       <MentorCard
                                                            mentor={mentor}
                                                            setModalOpen={setModalOpen}
                                                            setCurrentIdMentor={setCurrentIdMentor}
                                                       />
                                                  </Col>
                                             ))
                                             : <Empty />
                                        }
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