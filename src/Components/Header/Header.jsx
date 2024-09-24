import { Row, Col, Input, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';

function Header() {
     const { setFilterMentor, filterMentor } = useContext(AppContext);

     const onSearch = (value) => {
          setFilterMentor({ ...filterMentor, search: value });
     }

     const items = [
          {
               label: (
                    <Link>
                         Thêm thành viên
                    </Link>
               ),
               key: '0',
          },
          {
               label: (
                    <Link >
                         Lịch sử
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

     return (
          <div className="header">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' md={6}>
                              <h1>SWP Mentor Booking Logo</h1>
                         </Col>

                         <Col className='search-block' md={9}>
                              <Input.Search
                                   placeholder="Tìm kiếm mentor"
                                   onSearch={onSearch}
                                   style={{
                                        width: '100%',
                                   }}
                                   size='large'
                                   allowClear
                              />
                         </Col>

                         <Col md={9} className='btn-block'>
                              <Link>Lịch trình</Link>
                              <Link>Nạp tiền</Link>
                              <Dropdown
                                   menu={{
                                        items,
                                   }}
                              >
                                   <Link onClick={(e) => e.preventDefault()}>
                                        <Space>
                                             Thêm
                                             <DownOutlined />
                                        </Space>
                                   </Link>
                              </Dropdown>
                              <Link>Tài khoản</Link>
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default Header