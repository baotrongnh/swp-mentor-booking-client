import { DownOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Dropdown, Flex, Input, Row, Space } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/Photos/avatar/default_avatar.jpg';
import logo from '../../assets/Photos/logo/logo.png';
import { AppContext } from '../../Contexts/AppContext';
import { AuthContext } from '../../Contexts/AuthContext';
import useDebounce from '../../hooks/useDebounce';
import { deleteToken } from '../../utils/storageUtils';
import './Header.scss';

function Header() {
     const { setFilterMentor, filterMentor } = useContext(AppContext);
     const { currentUser, setCurrentUser } = useContext(AuthContext);
     const [searchValue, setSearchValue] = useState(null);
     const location = useLocation();
     const navigate = useNavigate();
     const debounceSearchValue = useDebounce(searchValue, 800);

     const onSearch = (value) => {
          const url = '/mentor'
          if (location.pathname !== url) {
               navigate(url);
          }
          setFilterMentor({ ...filterMentor, search: value });
     }

     const handleChange = (e) => {
          setSearchValue(e.target.value);
     }

     const handleLogout = () => {
          setCurrentUser(undefined);
          deleteToken();
     }

     useEffect(() => {
          if (debounceSearchValue !== null) {
               setFilterMentor({ ...filterMentor, search: debounceSearchValue });
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [debounceSearchValue]);

     const moreMenuDropDown = [
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

     const accountMenuDropDown = [
          {
               label: (<Link to="/profile">Profile</Link>),
               key: '0',
          },
          {
               label: (<Link to="/settings">Wallet</Link>),
               key: '1',
          },
          {
               label: (<Link to="/settings">Become a mentor</Link>),
               key: '2',
          },
          { type: 'divider' },
          {
               label: (<div onClick={handleLogout}>Logout</div>),
               key: '3',
               danger: true
          },
     ];

     return (
          <div className="header">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' xs={6} sm={5} md={4} lg={5}>
                              <Link>
                                   <img className='logo-img' src={logo} alt="" />
                              </Link>
                         </Col>

                         <Col className='search-block' xs={15} sm={16} md={17} lg={8}>
                              <Input.Search
                                   placeholder="Find mentors"
                                   onSearch={onSearch}
                                   style={{ width: '100%', }}
                                   size='large'
                                   allowClear
                                   onClear={() => setFilterMentor({ ...filterMentor, search: '' })}
                                   onChange={e => handleChange(e)}
                              />
                         </Col>

                         <Col xs={0} md={0} lg={11}>
                              <div className='btn-block'>
                                   <Link to='/mentor' className='navbar-link'>Browser mentors</Link>
                                   <Link to={`/schedule/${currentUser.id}`} className='navbar-link'>Schedule</Link>
                                   <Dropdown
                                        menu={{ moreMenuDropDown }}
                                        placement='bottom'
                                        trigger={['click']}
                                   >
                                        <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                             <Space>
                                                  More
                                                  <DownOutlined />
                                             </Space>
                                        </Link>
                                   </Dropdown>


                                   <div >
                                        <Flex align='center'>
                                             <Link to='/profile' className='navbar-link account'>
                                                  {currentUser.imgPath
                                                       ? <img className='avatar' src={currentUser.imgPath} alt="" onError={(e) => e.target.src = defaultAvatar} />
                                                       : <Icon className='icon' icon="material-symbols-light:account-circle" />
                                                  }
                                             </Link>
                                             <Dropdown
                                                  menu={{ items: accountMenuDropDown }}
                                                  placement='bottomRight'
                                                  trigger={['click']}
                                                  arrow={true}
                                             >
                                                  <div><Icon style={{ cursor: 'pointer' }} icon="icon-park-outline:down" /></div>
                                             </Dropdown>
                                        </Flex>
                                   </div>
                              </div>
                         </Col>

                         <Col xs={3} lg={0} className='btn-navbar-mobile'>
                              <h1>mobile</h1>
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default Header