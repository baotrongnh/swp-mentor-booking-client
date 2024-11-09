import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Breadcrumb, Button, Empty, List, Typography } from 'antd'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../Contexts/AuthContext'
import { acceptInviteGroup } from '../../apis/booking'
import { getListInviteGroup } from '../../apis/student'
import './PendingAccept.scss'

export default function PendingAccept() {
     const { Title, Text } = Typography
     const { currentUser } = useContext(AuthContext)
     const queryClient = useQueryClient()
     const { t } = useTranslation()

     const mutation = useMutation({
          mutationFn: ({ type, bookingId, memberId }) => acceptInviteGroup(type, bookingId, memberId),
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: [`invite-list-${currentUser?.accountId}`] })
               toast.success(t('complete'))
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     const { data: listInviteData } = useQuery({ 
          queryKey: [`invite-list-${currentUser?.accountId}`], 
          queryFn: () => getListInviteGroup(currentUser?.accountId) 
     })

     const handleAccept = (bookingId) => {
          mutation.mutateAsync({ type: 'accept', bookingId, memberId: currentUser?.accountId })
     }

     const handleDeny = (bookingId) => {
          mutation.mutateAsync({ type: 'reject', bookingId, memberId: currentUser?.accountId })
     }

     return (
          <div className="group-invitation-list container">
               <Breadcrumb
                    style={{ padding: '20px 0' }}
                    items={[
                         {
                              title: <Link to='/'>{t('home')}</Link>,
                         },
                         {
                              title: <Link to='/browser-mentors'>{t('browser mentors')}</Link>,
                         },
                         {
                              title: t('Invitation Pending'),
                         },
                    ]}
               />
               <div className="header">
                    <div className="header-content">
                         <Title level={2}>{t('group invitations')}</Title>
                         <Text className="invitation-count">
                              {listInviteData?.pendingGroup.length} {t('pending invitations')}
                         </Text>
                    </div>
               </div>
               <div className="content">
                    {listInviteData?.pendingGroup.length > 0 ? (
                         <List
                              className="invitation-list"
                              itemLayout="horizontal"
                              dataSource={listInviteData?.pendingGroup}
                              renderItem={(item) => (
                                   <List.Item className="invitation-item">
                                        <div className="item-main">
                                             <Avatar src={item.avatar} size={56} icon={<UserOutlined />} />
                                             <div className="item-info">
                                                  <Text strong className="group-name">
                                                       {t('invited by')} {item.student.fullName}
                                                  </Text>
                                                  <Text className="timestamp">
                                                       {t('mentor')}: {item.bookings.mentor.fullName}
                                                  </Text>
                                                  <Text className="timestamp">
                                                       {t('booking time')}: {item.bookings.startTime}
                                                  </Text>
                                             </div>
                                        </div>
                                        <div className="action-buttons">
                                             <Button
                                                  type="primary"
                                                  icon={<CheckOutlined />}
                                                  onClick={() => handleAccept(item.bookingId)}
                                                  className="accept-btn"
                                             >
                                                  {t('accept')}
                                             </Button>
                                             <Button
                                                  danger
                                                  icon={<CloseOutlined />}
                                                  onClick={() => handleDeny(item.bookingId)}
                                                  className="deny-btn"
                                             >
                                                  {t('deny')}
                                             </Button>
                                        </div>
                                   </List.Item>
                              )}
                         />
                    ) : (
                         <Empty
                              description={t('no pending invitations')}
                         />
                    )}
               </div>
          </div>
     )
}