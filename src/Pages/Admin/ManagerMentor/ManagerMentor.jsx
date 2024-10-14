import { Col, Menu, Row } from 'antd';
import Search from 'antd/es/transfer/search';
import { useState } from 'react';
import AllMentor from './Components/AllMentors/AllMentors';
import DisableMentor from './Components/DisableMentor/DisableMentor';
import './ManagerMentor.scss';

function ManagerMentor() {
     const onSearch = (value) => console.log(value);

     const [currentTab, setCurrentTab] = useState('all');
     const onClick = (e) => {
          setCurrentTab(e.key);
     };

     const items = [
          {
               label: 'All Mentors',
               key: 'all',
          },
          {
               label: 'Disable',
               key: 'disable',
          }
     ];

     return (
          <div className="manager-mentor">
               <div className="head-table">
                    <Row>
                         <Col md={16}>
                              <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                         </Col>
                         <Col md={8}>
                              <Search
                                   placeholder="Find mentors..."
                                   allowClear
                                   onSearch={onSearch}
                                   className='search-input'
                              />
                         </Col>
                    </Row>
               </div>

               {currentTab === 'all' && <AllMentor />}
               {currentTab === 'disable' && <DisableMentor />}
          </div>
     );
}

export default ManagerMentor;