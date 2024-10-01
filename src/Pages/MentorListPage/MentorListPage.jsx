import { useContext, useEffect, useState } from 'react';
import './MentorListPage.scss';
import { Col, DatePicker, Input, Pagination, Row } from 'antd';
import { AppContext } from '../../Contexts/AppContext';
import { CheckboxSkill, MentorCard, RatingSelect } from './Components';
import { DownOutlined } from '@ant-design/icons';
import { searchMentor } from '../../apis/mentor';

function MentorListPage() {
     const { filterMentor, setFilterMentor } = useContext(AppContext);
     const [listMentor, setListMentor] = useState([]);
     const [totalMentors, setTotalMentors] = useState(0);

     const handleChangePage = (page) => {
          setFilterMentor({ ...filterMentor, page });
     }

     useEffect(() => {
          const fetchData = async () => {
               const { data } = await searchMentor(filterMentor);
               if (data.error_code == 0) {
                    console.log(data);
                    setTotalMentors(data.totalMentors);
                    setListMentor(data.mentors);
               }
          }

          fetchData();
     }, [filterMentor]);

     const onChangeTime = (date, dateString) => {
          console.log(dateString);
     }

     return (
          <div className="mentor-list-page">
               <div className="container">
                    <Row>
                         <Col xs={0} md={7} lg={5} className='left-sidebar'>
                              <div className='skill-search-block'>
                                   <h1 className='title-skill'>Skills</h1>
                                   <Input className='input-search' placeholder="Search for skills" size='large' style={{ fontSize: 16 }} />
                                   <p className='sub-text-found'>100+ mentors found</p>

                                   <div className="skill-block">
                                        <CheckboxSkill id='1' skillName='ReactJS' numberMentor={23} />
                                        <CheckboxSkill id='2' skillName='NodeJS' numberMentor={8} />
                                        <CheckboxSkill id='3' skillName='Java' numberMentor={1} />
                                        <CheckboxSkill id='4' skillName='.NET' numberMentor={3} />
                                        <CheckboxSkill id='5' skillName='HTML/CSS' numberMentor={99} />
                                        <p className='show-more-text'>Show more <DownOutlined /></p>
                                   </div>
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

                         <Col xs={24} md={17} lg={19} className='mentor-block'>
                              <Row gutter={15}>
                                   {listMentor.map((mentor) => (
                                        <Col xs={24} xl={12} key={mentor.id}>
                                             <MentorCard
                                                  id={mentor.id}
                                                  avatar='https://vcdn1-sohoa.vnecdn.net/2024/09/14/mark-zuckerberg-7-jpg-4371-1726298974.png?w=460&h=0&q=100&dpr=2&fit=crop&s=xXAQsxxPWM3vQUez83PRPQ'
                                                  name={mentor.full_name}
                                                  semester={7}
                                                  rating={4.9}
                                                  description='Hello, I am passionate Frontend Engineer at Coinbase with a deep love for mentoring engineers and guiding them through their'
                                                  skills={['ReactJS', 'NodeJS', 'HTML/CSS', 'PHP', 'Python']}
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
                                   total={totalMentors}
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