import { Row, Col, Input, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { Icon } from '@iconify/react/dist/iconify.js';

function Header() {
     const { setFilterMentor, filterMentor } = useContext(AppContext);

     const onSearch = (value) => {
          setFilterMentor({ ...filterMentor, search: value });
     }

     const items = [
          {
               label: (
                    <Link>
                         Add member
                    </Link>
               ),
               key: '0',
          },
          {
               label: (
                    <Link >
                         History
                    </Link>
               ),
               key: '1',
          },
          {
               type: 'divider',
          },
          {
               label: '3rd menu item（disabled）',
               key: '3',
               disabled: true,
          },
     ];

     const accountSubMenu = [
          {
               label: (
                    <Link to="/profile">
                         Profile
                    </Link>
               ),
               key: '0',
          },
          {
               label: (
                    <Link to="/settings">
                         Point wallet
                    </Link>
               ),
               key: '1',
          },
          {
               type: 'divider',
          },
          {
               label: (
                    <Link style={{color: 'red'}}>Logout</Link>
               ),
               key: '3',
          },
     ];

     return (
          <div className="header">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' md={6}>
                              <h1>SWP Mentor Booking Logo</h1>
                         </Col>

                         <Col className='search-block' md={9}>
                              <Input.Search
                                   placeholder="Find mentors"
                                   onSearch={onSearch}
                                   style={{
                                        width: '100%',
                                   }}
                                   size='large'
                                   allowClear
                              />
                         </Col>

                         <Col md={9} className='btn-block'>
                              <Link className='navbar-link'>Schedule</Link>
                              <Link className='navbar-link'>Deposit</Link>
                              <Dropdown
                                   menu={{
                                        items,
                                   }}
                                   placement='bottom'
                              >
                                   <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                        <Space>
                                             More
                                             <DownOutlined />
                                        </Space>
                                   </Link>
                              </Dropdown>

                              <Dropdown
                                   menu={{
                                        items: accountSubMenu
                                   }}
                                   placement='bottomRight'
                              >
                                   <Link to='/profile' className='navbar-link account'>
                                        <Icon className='icon' icon="material-symbols-light:account-circle" />
                                   </Link>
                              </Dropdown>
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default Header