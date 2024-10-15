import { Col, Menu, Row } from 'antd';
import Search from 'antd/es/transfer/search';
import { Link, useParams } from 'react-router-dom';
import AllMentor from './Components/AllMentors/AllMentors';
import DisableMentor from './Components/DisableMentor/DisableMentor';
import './ManagerMentor.scss';

function ManagerMentor() {
     const onSearch = (value) => console.log(value);
     const { tab: currentTab } = useParams();

     const items = [
          {
               label: <Link to='/admin/mentor/all'>All Mentors</Link>,
               key: 'all',
          },
          {
               label: <Link to='/admin/mentor/disable'>Disable</Link>,
               key: 'disable',
          }
     ];

     return (
          <div className="manager-mentor">
               <div className="head-table">
                    <Row>
                         <Col md={16}>
                              <Menu selectedKeys={currentTab} mode="horizontal" items={items} />
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