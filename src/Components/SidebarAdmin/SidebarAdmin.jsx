import { Menu } from 'antd';
import './SidebarAdmin.scss';
import { LineChartOutlined, ScheduleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
                         label: <Link to='/admin/mentor'>View All Mentor</Link>,
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
                         label: <Link to='/admin/students'>View All Students</Link>,
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
          },
          {
               key: 'grp',
               label: 'Group',
               type: 'group',
               children: [
                    {
                         key: '13',
                         label: 'Option 13',
                    },
                    {
                         key: '14',
                         label: 'Option 14',
                    },
               ],
          },
     ];

     const onClick = (e) => {
          console.log('click ', e);
     };

     return (
          <div className="sidebar-admin">

               <div className="logo-block">
                    <h1>logo here</h1>
               </div>

               <Menu
                    onClick={onClick}
                    style={{
                         width: '100%',
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
               />
          </div>
     );
}

export default SidebarAdmin;