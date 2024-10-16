import { DownOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Col, Drawer, Dropdown, Flex, Input, Row, Space } from 'antd';
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
     const [openDrawer, setOpenDrawer] = useState(false);

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
               label: (<Link to="/student/profile">Profile</Link>),
               key: '0',
          },
          {
               label: (<Link>Wallet: 99 point</Link>),
               key: '1',
          },
          {
               label: (<Link to="/mentor/register">Become a mentor</Link>),
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
                         <Col className='logo-block' xs={12} sm={5} md={4} lg={5}>
                              <Link>
                                   <img className='logo-img' src={logo} alt="" />
                              </Link>
                         </Col>

                         <Col xs={12} sm={0} className='btn-navbar-mobile'>
                              <Button onClick={() => setOpenDrawer(true)} type='text'><Icon className='icon' icon="ic:round-menu" /></Button>
                         </Col>

                         <Col className='search-block' xs={24} sm={16} md={17} lg={8}>
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

                         <Col xs={0} sm={3} md={3} lg={0} className='btn-navbar-mobile'>
                              <Button onClick={() => setOpenDrawer(true)} type='text'><Icon className='icon' icon="ic:round-menu" /></Button>
                         </Col>

                         <Col xs={0} md={0} lg={11}>
                              <div className='btn-block'>
                                   <Link to='/browser-mentors' className='navbar-link'>Browser mentors</Link>
                                   <Link to={`/schedule/${currentUser?.id}`} className='navbar-link'>Schedule</Link>
                                   <Dropdown
                                        menu={{ items: moreMenuDropDown }}
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
                                             <Link to='/student/profile' className='navbar-link account'>
                                                  {currentUser?.imgPath
                                                       ? <img className='avatar' src={currentUser?.imgPath} alt="" onError={(e) => e.target.src = defaultAvatar} />
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
                    </Row>
               </div>

               <Drawer className='navbar-drawer' placement='right' width={350} title="Basic Drawer" onClose={() => setOpenDrawer(false)} open={openDrawer}>
                    <div className="navbar-mobile-block">
                         <Link onClick={() => setOpenDrawer(false)} to='/mentor' className='link-item'>Browser mentors</Link>
                         <Link onClick={() => setOpenDrawer(false)} to={`/schedule/${currentUser?.id}`} className='link-item'>Schedule</Link>
                         <Link onClick={() => setOpenDrawer(false)} className='link-item'>Wallet</Link>
                         <Link onClick={() => setOpenDrawer(false)} to='/mentor/register' className='link-item'>Become a mentor</Link>
                         <Link onClick={() => setOpenDrawer(false)} to='/profile' className='link-item'>Your profile</Link>
                    </div>
               </Drawer>
          </div>
     )
}

export default Header