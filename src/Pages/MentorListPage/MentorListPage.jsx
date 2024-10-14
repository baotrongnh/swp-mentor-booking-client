import { useQuery } from '@tanstack/react-query';
import { Col, DatePicker, Pagination, Row } from 'antd';
import { useContext, useState } from 'react';
import { searchMentor } from '../../apis/mentor';
import { Loading } from '../../Components';
import { ModalBookMentor } from '../../Components/Modal';
import { AppContext } from '../../Contexts/AppContext';
import { MentorCard, RatingSelect, SkillSearch } from './Components';
import './MentorListPage.scss';

function MentorListPage() {
     const { filterMentor, setFilterMentor } = useContext(AppContext);
     const [modalOpen, setModalOpen] = useState(false);
     const [currentIdMentor, setCurrentIdMentor] = useState('');
     const { data: listMentor, isLoading } = useQuery({
          queryKey: ['listMentor', filterMentor],
          queryFn: () => searchMentor(filterMentor),
     });

     const handleChangePage = (page) => {
          setFilterMentor({ ...filterMentor, page });
     }

     const onChangeTime = (date, dateString) => {
          console.log(dateString);
     }

     return (
          <div className="mentor-list-page">
               {isLoading && <Loading />}

               <ModalBookMentor currentIdMentor={currentIdMentor} modalOpen={modalOpen} setModalOpen={setModalOpen} />

               <div className="container">
                    <Row gutter={50}>
                         <Col xs={0} md={7} lg={6} className='left-sidebar'>
                              <div className='skill-search-block'>
                                   <SkillSearch />
                              </div>

                              <div className="rating-filter-block">
                                   <RatingSelect />
                              </div>

                              <div className='date-filter-block'>
                                   <h1 className="title-filter-date" style={{ margin: '20px 0', fontSize: '2.2rem', fontWeight: '500' }}>Date</h1>
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

                              <Pagination
                                   className='pagination'
                                   onChange={(page) => handleChangePage(page)}
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
     );
}

export default MentorListPage;