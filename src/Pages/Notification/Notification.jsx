import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Badge, Breadcrumb, List, Space, Typography } from 'antd'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../Contexts/AuthContext'
import { getNotifications, setReadForAllNotification } from '../../apis/other'
import './Notification.scss'
import toast from 'react-hot-toast'

export default function Notification() {
     const queryClilent = useQueryClient()
     const { Text } = Typography
     const { currentUser } = useContext(AuthContext)
     const { t } = useTranslation()
     const mutation = useMutation({
          mutationFn: () => setReadForAllNotification(currentUser?.accountId),
          onSuccess: () => {
               queryClilent.invalidateQueries({ queryKey: ['number-unread-notification'] })
          },
          onError: () => toast.error('Fail to load notifications')
     })

     useEffect(() => {
          mutation.mutateAsync()
     }, [])

     const { data: notificationData } = useQuery({
          queryKey: [`notification`],
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
                                   <List.Item className={`notification-item ${item.isRead ? 'read' : 'unread'}`}>
                                        <List.Item.Meta
                                             avatar={
                                                  <Badge dot={!item.isRead} offset={[-5, 5]}>
                                                       <Avatar icon={<BellOutlined />}
                                                            className={`notification-avatar ${item.read ? 'read' : 'unread'}`}
                                                       />
                                                  </Badge>
                                             }
                                             title={
                                                  <Space className="notification-title">
                                                       <Text strong>{t(item.title)}</Text>
                                                       {item.isRead && <CheckCircleOutlined className="read-icon" />}
                                                  </Space>
                                             }
                                             description={
                                                  <Space direction="vertical" className="notification-description">
                                                       <Text>{t(item.message)}</Text>
                                                       <Text type="secondary" className="notification-time">
                                                            {t('notification time')}: {item.createdAt}
                                                       </Text>
                                                       <Badge
                                                            status={item.isRead ? 'default' : 'processing'}
                                                            text={item.isRead ? t('read') : t('unread')}
                                                            className={`status-badge ${item.isRead ? 'read' : 'unread'}`}
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
