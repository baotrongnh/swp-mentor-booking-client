import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './AboutMentor.scss';
import { DescriptionEditor } from '../../../../Components';
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';

function AboutMentor({ mentorInfor, isCurrentUser }) {
     const { t } = useTranslation()
     const { currentUser } = useContext(AuthContext)

     return (
          <div className="about-mentor">
               <Row gutter={50}>
                    <Col md={13} className='description-block'>
                         <h1 className='title'>{t('About Me')}</h1>
                         <p className='description'>
                              {isCurrentUser
                                   ?
                                   <DescriptionEditor accountId={currentUser.accountId} defaultDescription={mentorInfor?.description} />
                                   :
                                   (mentorInfor?.description || t('No description'))
                              }
                         </p>
                    </Col>

                    <Col md={11} className='contact-block'>
                         <h1 className='title'>{t('Contact')}</h1>

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
     mentorInfor: PropTypes.object,
     isCurrentUser: PropTypes.bool
}