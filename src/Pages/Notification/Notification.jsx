import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Avatar, Badge, List, Space, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useState } from 'react'
import './Notification.scss'

export default function Notification() {
     const { Text } = Typography

     const [notifications] = useState([
          { id: 1, title: "New Message", message: "You have a new message from John Doe", timestamp: "2 minutes ago", read: false },
          { id: 2, title: "Meeting Reminder", message: "Your team meeting starts in 30 minutes", timestamp: "1 hour ago", read: true },
          { id: 3, title: "Task Completed", message: "Great job! You've completed all your tasks for today", timestamp: "3 hours ago", read: false },
          { id: 4, title: "New Follower", message: "Jane Smith started following you", timestamp: "1 day ago", read: true },
          { id: 5, title: "System Update", message: "A new system update is available. Please restart your device.", timestamp: "2 days ago", read: false },
     ])


     const filteredNotifications = notifications

     return (
          <div className='notification-page'>
               <div className="container">
                    <Content className="notifications-content">
                         <List
                              itemLayout="horizontal"
                              dataSource={filteredNotifications}
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
                    </Content>
               </div>
          </div>
     )
}
