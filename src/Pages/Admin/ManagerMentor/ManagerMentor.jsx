import { Col, Menu, Row } from 'antd';
import Search from 'antd/es/transfer/search';
import { useState } from 'react';
import AllMentor from './Components/AllMentors/AllMentors';
import DisableMentor from './Components/DisableMentor/DisableMentor';
import TopMentor from './Components/TopMentors/TopMentors';
import './ManagerMentor.scss';

function ManagerMentor() {

     const onSearch = (value, _e, info) => console.log(info?.source, value);

     const [currentTab, setCurrentTab] = useState('all');
     const onClick = (e) => {
          console.log('click ', e);
          setCurrentTab(e.key);
     };

     const items = [
          {
               label: 'All Mentors',
               key: 'all',
          },
          {
               label: 'Top 10 Mentors',
               key: 'top',
          },
          {
               label: 'Disable',
               key: 'disable',
          }
     ];

     return (
          <div className="manager-mentor">
               <header className="header">
                    <Row>
                         <Col md={16}>
                              <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                         </Col>
                         <Col md={8}>
                              <Search
                                   placeholder="input search text"
                                   allowClear
                                   onSearch={onSearch}
                                   className='search-input'
                              />
                         </Col>
                    </Row>
               </header>

               {currentTab === 'all' && <AllMentor />}
               {currentTab === 'top' && <TopMentor />}
               {currentTab === 'disable' && <DisableMentor />}
          </div>
     );
}

export default ManagerMentor;