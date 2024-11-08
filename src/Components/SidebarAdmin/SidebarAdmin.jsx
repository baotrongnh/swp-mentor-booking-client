import { LineChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Menu } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/Photos/logo/logo.png'
import './SidebarAdmin.scss'

function SidebarAdmin() {
     const location = useLocation()

     const items = [
          {
               type: 'divider',
          },
          {
               key: 'analyticsMenu',
               label: 'Reports & Analytics',
               icon: <LineChartOutlined />,
               children: [
                    {
                         key: '/admin/analytics/overview',
                         label: <Link to='/admin/analytics/overview'>Overview</Link>
                    },
                    {
                         key: '/admin/analytics/proportion',
                         label: <Link to='/admin/analytics/proportion'>Proportion</Link>
                    }
               ]
          },
          {
               key: 'mentorsMenu',
               label: 'Mentors',
               icon: <UserOutlined />,
               children: [
                    {
                         key: '/admin/mentor/all',
                         label: <Link to='/admin/mentor/all'>View All Mentor</Link>,
                    },
                    {
                         key: '/admin/pending-mentors',
                         label: <Link to='/admin/pending-mentors'>Pending Approval</Link>,
                    },

               ],
          },
          {
               key: 'studentMenu',
               label: 'Students',
               icon: <UserOutlined />,
               children: [
                    {
                         key: '/admin/student/all',
                         label: <Link to='/admin/student/all'>View All Students</Link>,
                    }
               ],
          },
          {
               type: 'divider',
          },
          {
               key: 'complaintMenu',
               label: 'Complaint',
               icon: <SettingOutlined />,
               children: [
                    {
                         key: '/admin/complaint/pending',
                         label: <Link to='/admin/complaint/pending'>Pending</Link>,
                    },
                    {
                         key: '/admin/complaint/resolved',
                         label: <Link to='/admin/complaint/resolved'>Resolved</Link>,
                    },
               ],
          },
          {
               key: 'systemMenu',
               label: 'System',
               icon: <SettingOutlined />,
               children: [
                    {
                         key: '/admin/skills',
                         label: <Link to='/admin/skills'>Skills Available</Link>,
                    },
                    {
                         key: '/admin/items',
                         label: <Link to='/admin/items'>Items Donate</Link>,
                    },
                    {
                         key: '/admin/semester',
                         label: <Link to='/admin/semester'>Manager Semester</Link>,
                    },
               ],
          }
     ]

     const onClick = (e) => {
          console.log('click ', e)
     }

     const navigate = useNavigate()

     return (
          <div className="sidebar-admin">

               <div className="logo-block">
                    <img className='logo-img' src={logo} alt="" />
               </div>

               <Menu
                    onClick={onClick}
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={['analyticsMenu', 'mentorsMenu', 'complaintMenu', 'studentMenu', 'systemMenu']}
                    mode="inline"
                    items={items}
               />

               <Flex justify='center' style={{ padding: '20px' }}><Button onClick={() => navigate('/')} danger>Logout</Button></Flex>
          </div>
     )
}

export default SidebarAdmin