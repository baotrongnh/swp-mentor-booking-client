import { Menu } from 'antd';
import './SidebarAdmin.scss';
import { LineChartOutlined, ScheduleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/Photos/logo/logo.png';

function SidebarAdmin() {
     const items = [
          {
               type: 'divider',
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
                         label: <Link to='/admin/pending'>Pending Approval</Link>,
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
                         label: <Link to='/admin/student'>View All Students</Link>,
                    }
               ],
          },
          {
               type: 'divider',
          },
          {
               key: 'bookingMenu',
               label: 'Sessions Booking',
               icon: <ScheduleOutlined />,
               children: [
                    {
                         key: '9',
                         label: 'Option 9',
                    },
                    {
                         key: '10',
                         label: 'Option 10',
                    },
                    {
                         key: '11',
                         label: 'Option 11',
                    },
                    {
                         key: '12',
                         label: 'Option 12',
                    },
               ],
          },
          {
               key: 'systemMenu',
               label: 'System',
               icon: <SettingOutlined />,
               children: [
                    {
                         key: 'skillsAvailable',
                         label: 'Skills Available',
                    },
                    {
                         key: 'semester',
                         label: 'Semester Management',
                    },
               ],
          },
          {
               key: 'analyticsMenu',
               label: 'Reports & Analytics',
               icon: <LineChartOutlined />,
               children: [
                    {
                         key: 'bookingAnalytics',
                         label: <Link to='/admin/analytics/mentors'>Booking Analytics</Link>
                    }
               ]
          }
     ];

     const onClick = (e) => {
          console.log('click ', e);
     };

     return (
          <div className="sidebar-admin">

               <div className="logo-block">
                    <img className='logo-img' src={logo} alt="" />
               </div>

               <Menu
                    onClick={onClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
               />
          </div>
     );
}

export default SidebarAdmin;