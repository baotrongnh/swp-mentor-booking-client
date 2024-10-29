import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Row } from 'antd';
import './AboutMentor.scss';
import PropTypes from 'prop-types';

function AboutMentor({ mentorInfor }) { 
     return (
          <div className="about-mentor">
               <Row gutter={50}>
                    <Col md={13} className='description-block'>
                         <h1 className='title'>About Me</h1>
                         <p className='description'>
                              {mentorInfor?.description}
                         </p>
                    </Col>

                    <Col md={11} className='contact-block'>
                         <h1 className='title'>Contact</h1>

                         <div className="contact-item">
                              <Icon className='icon' icon="arcticons:fairemail" />
                              <p className='text'>{mentorInfor?.email}</p>
                         </div>
                    </Col>
               </Row>
          </div>
     )
}

export default AboutMentor

AboutMentor.propTypes = {
     mentorInfor: PropTypes.object
}