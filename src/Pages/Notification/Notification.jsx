import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Badge, Breadcrumb, List, Space, Typography } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../Contexts/AuthContext'
import { getNotifications } from '../../apis/other'
import './Notification.scss'

export default function Notification() {
     const { Text } = Typography
     const { currentUser } = useContext(AuthContext)
     const { t } = useTranslation()

     const { data: notificationData } = useQuery({ 
          queryKey: [`notification-${currentUser.accountId}`], 
          queryFn: () => getNotifications(currentUser?.accountId) 
     })

     return (
          <div className='notification-page'>
               <div className="container">
                    {currentUser.isMentor === 0 &&
                         <Breadcrumb
                              style={{ paddingTop: '20px' }}
                              items={[
                                   {
                                        title: <Link to='/'>{t('home')}</Link>,
                                   },
                                   {
                                        title: <Link to='/browser-mentors'>{t('browser mentors')}</Link>,
                                   },
                                   {
                                        title: t('notifications'),
                                   },
                              ]}
                         />
                    }

                    <div className="notifications-content">
                         <List
                              itemLayout="horizontal"
                              dataSource={notificationData?.notifications}
                              locale={{ emptyText: t('no notifications') }}
                              renderItem={(item) => (
                                   <List.Item className={`notification-item ${item.read ? 'read' : 'unread'}`}>
                                        <List.Item.Meta
                                             avatar={
                                                  <Badge dot={!item.read} offset={[-5, 5]}>
                                                       <Avatar icon={<BellOutlined />} 
                                                              className={`notification-avatar ${item.read ? 'read' : 'unread'}`} 
                                                       />
                                                  </Badge>
                                             }
                                             title={
                                                  <Space className="notification-title">
                                                       <Text strong>{t(item.title)}</Text>
                                                       {item.read && <CheckCircleOutlined className="read-icon" />}
                                                  </Space>
                                             }
                                             description={
                                                  <Space direction="vertical" className="notification-description">
                                                       <Text>{t(item.message)}</Text>
                                                       <Text type="secondary" className="notification-time">
                                                            {t('notification time')}: {item.timestamp}
                                                       </Text>
                                                       <Badge
                                                            status={item.read ? 'default' : 'processing'}
                                                            text={item.read ? t('read') : t('unread')}
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
