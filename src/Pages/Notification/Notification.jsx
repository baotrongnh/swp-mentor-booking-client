import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Badge, Breadcrumb, List, Space, Typography } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { getNotifications } from '../../apis/other'
import './Notification.scss'

export default function Notification() {
     const { Text } = Typography
     const { currentUser } = useContext(AuthContext)

     const { data: notificationData } = useQuery({ queryKey: [`notification-${currentUser.accountId}`], queryFn: () => getNotifications(currentUser?.accountId) })
     console.log(notificationData?.notifications)

     return (
          <div className='notification-page'>
               <div className="container">
                    {currentUser.isMentor === 0 &&
                         <Breadcrumb
                              style={{ paddingTop: '20px' }}
                              items={[
                                   {
                                        title: <Link to='/'>Home</Link>,
                                   },
                                   {
                                        title: <Link to='/browser-mentors'>Browse mentors</Link>,
                                   },
                                   {
                                        title: 'Notification',
                                   },
                              ]}
                         />
                    }

                    <div className="notifications-content">
                         <List
                              itemLayout="horizontal"
                              dataSource={notificationData?.notifications}
                              renderItem={(item) => (
                                   <List.Item className={`notification-item ${item.read ? 'read' : 'unread'}`}>
                                        <List.Item.Meta
                                             avatar={
                                                  <Badge dot={!item.read} offset={[-5, 5]}>
                                                       <Avatar icon={<BellOutlined />} className={`notification-avatar ${item.read ? 'read' : 'unread'}`} />
                                                  </Badge>
                                             }
                                             title={
                                                  <Space className="notification-title">
                                                       <Text strong>{item.title}</Text>
                                                       {item.read && <CheckCircleOutlined className="read-icon" />}
                                                  </Space>
                                             }
                                             description={
                                                  <Space direction="vertical" className="notification-description">
                                                       <Text>{item.message}</Text>
                                                       <Text type="secondary">{item.timestamp}</Text>
                                                       <Badge
                                                            status={item.read ? 'default' : 'processing'}
                                                            text={item.read ? 'Read' : 'Unread'}
                                                            className={`status-badge ${item.read ? 'read' : 'unread'}`}
                                                       />
                                                  </Space>
                                             }
                                        />
                                   </List.Item>
                              )}
                         />
                    </div>
               </div>
          </div>
     )
}
