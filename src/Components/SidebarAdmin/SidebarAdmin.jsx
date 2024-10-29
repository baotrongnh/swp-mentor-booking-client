import { LineChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../assets/Photos/logo/logo.png'
import './SidebarAdmin.scss'

function SidebarAdmin() {
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
                         key: 'overview',
                         label: <Link to='/admin/analytics/overview'>Overview</Link>
                    },
                    {
                         key: 'bookingAnalytics',
                         label: <Link to='/admin/analytics/mentors'>Booking Analytics</Link>
                    }
               ]
          },
          {
               key: 'mentorsMenu',
               label: 'Mentors',
               icon: <UserOutlined />,
               children: [
                    {
                         key: 'viewMentor',
                         label: <Link to='/admin/mentor/all'>View All Mentor</Link>,
                    },
                    {
                         key: 'pendingMentor',
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
                         key: 'viewStudent',
                         label: <Link to='/admin/student/all'>View All Students</Link>,
                    }
               ],
          },
          {
               type: 'divider',
          },
          {
               key: 'systemMenu',
               label: 'System',
               icon: <SettingOutlined />,
               children: [
                    {
                         key: 'skillsAvailable',
                         label: <Link to='/admin/skills'>Skills Available</Link>,
                    },
                    {
                         key: 'listItems',
                         label: <Link to='/admin/items'>Items Donate</Link>,
                    },
                    {
                         key: 'semester',
                         label: <Link to='/admin/semester'>Manager Semester</Link>,
                    },
               ],
          }
     ]

     const onClick = (e) => {
          console.log('click ', e)
     }

     return (
          <div className="sidebar-admin">

               <div className="logo-block">
                    <img className='logo-img' src={logo} alt="" />
               </div>

               <Menu
                    onClick={onClick}
                    defaultSelectedKeys={['overview']}
                    defaultOpenKeys={['analyticsMenu']}
                    mode="inline"
                    items={items}
               />
          </div>
     )
}

export default SidebarAdmin