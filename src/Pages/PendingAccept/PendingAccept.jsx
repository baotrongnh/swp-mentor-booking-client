import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Breadcrumb, Button, Empty, List, Typography } from 'antd'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { acceptInviteGroup } from '../../apis/booking'
import { getListInviteGroup } from '../../apis/student'
import './PendingAccept.scss'

export default function PendingAccept() {
     const { Title, Text } = Typography
     const { currentUser } = useContext(AuthContext)
     const queryClient = useQueryClient()

     const mutation = useMutation({
          mutationFn: ({ type, bookingId, memberId }) => acceptInviteGroup(type, bookingId, memberId),
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: [`invite-list-${currentUser?.accountId}`] })
               toast.success('Complete!')
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     const { data: listInviteData } = useQuery({ queryKey: [`invite-list-${currentUser?.accountId}`], queryFn: () => getListInviteGroup(currentUser?.accountId) })

     console.log(listInviteData?.pendingGroup)


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
                              title: <Link to='/'>Home</Link>,
                         },
                         {
                              title: <Link to='/browser-mentors'>Browse mentors</Link>,
                         },
                         {
                              title: 'Invitation Pending',
                         },
                    ]}
               />
               <div className="header">
                    <div className="header-content">
                         <Title level={2}>Group Invitations</Title>
                         <Text className="invitation-count">{listInviteData?.pendingGroup.length} Pending</Text>
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
                                                  <Text strong className="group-name">Invited by {item.student.fullName}</Text>
                                                  <Text className="inviter"></Text>
                                                  <Text className="timestamp">Mentor: {item.bookings.mentor.fullName}</Text>
                                                  <Text className="timestamp">Booking time: {item.bookings.startTime}</Text>
                                             </div>
                                        </div>
                                        <div className="action-buttons">
                                             <Button
                                                  type="primary"
                                                  icon={<CheckOutlined />}
                                                  onClick={() => handleAccept(item.bookingId)}
                                                  className="accept-btn"
                                             >
                                                  Accept
                                             </Button>
                                             <Button
                                                  danger
                                                  icon={<CloseOutlined />}
                                                  onClick={() => handleDeny(item.bookingId)}
                                                  className="deny-btn"
                                             >
                                                  Deny
                                             </Button>
                                        </div>
                                   </List.Item>
                              )}
                         />
                    ) : (
                         <Empty
                              description="No pending invitations"
                              className="empty-state"
                         />
                    )}
               </div>
          </div>
     )
}