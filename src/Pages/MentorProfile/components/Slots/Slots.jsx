import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Flex, List, Skeleton, Space, Typography } from 'antd'
import { getAvailableSlot } from '../../../../apis/mentor'
import { formatDateToNormal } from '../../../../utils/format'
import './Slots.scss'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../Contexts/AuthContext'
import { bookingMentor } from '../../../../apis/booking'
import toast from 'react-hot-toast'

const { Title, Text } = Typography
export default function Slots({ setModalAddSlotsOpen, mentorId, isCurrentUser }) {
     const queryClient = useQueryClient()
     const mutation = useMutation({
          mutationFn: ({ mentorId, studentId, startTime }) => bookingMentor(mentorId, studentId, startTime),
          onError: (error) => {
               if (error.response.data.error_code === 1) {
                    toast.error('Please do not select a date in the past')
               } else {
                    toast.error('Something went wrong')
               }
          },
          onSuccess: (data) => {
               if (data.error_code === 0) {
                    queryClient.invalidateQueries({ queryKey: ['currentUser'] })
                    queryClient.invalidateQueries({ queryKey: [`available-slot-${mentorId}`, mentorId] })
                    toast.success('Booked successfully')
               }
          }
     })
     const { currentUser } = useContext(AuthContext)

     const { data: listAvailableSlot, isLoading } = useQuery({
          queryKey: [`available-slot-${mentorId}`, mentorId],
          queryFn: () => getAvailableSlot(mentorId),
          enabled: !!mentorId,
     })

     const handleDelete = (id) => {
          console.log(id);
     }

     const handleBook = (slotStart, mentorId) => {
          console.log(slotStart);
          console.log(mentorId)
     }

     if (isLoading) return <Skeleton />

     return (
          <div className="time-slot-list">
               <Flex justify='space-between'>
                    <Title level={2}>Available Time Slots</Title>
                    {isCurrentUser && <Button onClick={() => setModalAddSlotsOpen(true)}>+ Add new slot</Button>}
               </Flex>

               <List
                    grid={{
                         gutter: 16,
                         xs: 1,
                         sm: 2,
                         md: 3,
                         lg: 3,
                         xl: 4,
                         xxl: 4,
                    }}
                    dataSource={listAvailableSlot?.slots}
                    renderItem={(item) => (
                         <List.Item>
                              <Card className="time-slot-card">
                                   <Space direction="vertical">
                                        <Space>
                                             <CalendarOutlined />
                                             <Text strong>{formatDateToNormal(item.slotStart).date}</Text>
                                        </Space>
                                        <Space>
                                             <ClockCircleOutlined />
                                             <Text>{formatDateToNormal(item.slotStart).time}</Text>
                                        </Space>
                                        {currentUser?.isMentor === 0
                                             ? <Button type='primary' onClick={() => handleBook(item.slotStart, item.id)}>Book</Button>
                                             : <Button danger onClick={() => handleDelete(item.id)}>Delete</Button>
                                        }
                                   </Space>
                              </Card>
                         </List.Item>
                    )
                    }
               />
          </div >
     )
}

Slots.propTypes = {
     setModalAddSlotsOpen: PropTypes.func,
     mentorId: PropTypes.any,
     isCurrentUser: PropTypes.bool
}
