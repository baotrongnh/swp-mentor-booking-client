import CheckboxSkill from './Components/CheckboxSkill/CheckboxSkill';
import MentorCard from './Components/MentorCard/MentorCard';
import './MentorListPage.scss';
import { Col, Input, Row } from 'antd';

function MentorListPage() {
     return (
          <div className="mentor-list-page">
               <div className="container">
                    <Row>
                         <Col md={6} className='left-sidebar'>
                              <div className='skill-search-block'>
                                   <h1 className='title-skill'>Skills</h1>
                                   <Input className='input-search' placeholder="Search for skills" size='large' style={{ fontSize: 16 }} />
                                   <p className='sub-text-found'>100+ mentors found</p>

                                   <div className="skill-block">
                                        <CheckboxSkill skillName='ReactJS' numberMentor={23} />
                                        <CheckboxSkill skillName='NodeJS' numberMentor={8} />
                                        <CheckboxSkill skillName='Java' numberMentor={1} />
                                        <CheckboxSkill skillName='.NET' numberMentor={3} />
                                        <CheckboxSkill skillName='HTML/CSS' numberMentor={99} />
                                        <p className='show-more-text'>Show more</p>
                                   </div>
                              </div>

                              <div className="rating-filter-block">

                              </div>
                         </Col>

                         <Col md={18} className='mentor-block'>
                              
                         </Col>
                    </Row>

               </div>
          </div>
     );
}

export default MentorListPage;