import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Row } from 'antd';
import './AboutMentor.scss';

function AboutMentor() {
     return (
          <div className="about-mentor">
               <Row gutter={50}>
                    <Col md={13} className='description-block'>
                         <h1 className='title'>About Me</h1>
                         <p className='description'>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita veritatis, perspiciatis rerum voluptate ullam atque vero impedit. Explicabo optio quibusdam eum, delectus iste, dolor laborum quasi et doloremque ipsum quis.
                              Provident corrupti consequatur ullam ipsum, sit itaque numquam inventore aut quam maiores illo ut expedita ab, omnis labore, quia architecto autem hic illum odio aliquam. Quos vel consectetur et iste.
                         </p>
                    </Col>

                    <Col md={11} className='contact-block'>
                         <h1 className='title'>Contact</h1>

                         <div className="contact-item">
                              <Icon className='icon' icon="arcticons:fairemail" />
                              <p className='text'>abcxyz@fpt.edu.vn</p>
                         </div>
                    </Col>
               </Row>
          </div>
     );
}

export default AboutMentor;