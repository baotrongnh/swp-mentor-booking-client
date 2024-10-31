import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Flex, List, Skeleton, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../../../Contexts/AppContext'
import { AuthContext } from '../../../../Contexts/AuthContext'
import { bookingMentor } from '../../../../apis/booking'
import { getAvailableSlot } from '../../../../apis/mentor'
import { formatDateToNormal } from '../../../../utils/format'
import './Slots.scss'

const { Title, Text } = Typography
export default function Slots({ setModalAddSlotsOpen, mentorId, isCurrentUser }) {
     const queryClient = useQueryClient()
     const { t } = useTranslation()

     const mutation = useMutation({
          mutationFn: ({ mentorId, studentId, startTime }) => bookingMentor(mentorId, studentId, startTime),
          onError: (error) => {
               if (error.response.data.error_code === 1) {
                    toast.error(error.response.data.message)
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
     const { semesterData } = useContext(AppContext)

     console.log(semesterData.latestSemester.slotCost);

     const { data: listAvailableSlot, isLoading } = useQuery({
          queryKey: [`available-slot-${mentorId}`, mentorId],
          queryFn: () => getAvailableSlot(mentorId),
          enabled: !!mentorId,
     })

     const handleDelete = (id) => {
          console.log(id);
     }

     const handleBook = (slotStart) => {
          console.log(slotStart);
          console.log(mentorId)
          mutation.mutate({ mentorId, studentId: currentUser.accountId, startTime: slotStart })
     }

     if (isLoading) return <Skeleton />

     return (
          <div className="time-slot-list">
               <Flex justify='space-between'>
                    <Title level={2}>{t('Available Time Slots')}</Title>
                    {isCurrentUser && <Button onClick={() => setModalAddSlotsOpen(true)}>{t('Add new slot')}</Button>}
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
                                             ? <Button type='primary' onClick={() => handleBook(item.slotStart)}>{t('Book')}: {semesterData.latestSemester.slotCost} <Icon icon="twemoji:coin" /></Button>
                                             : <Button danger onClick={() => handleDelete(item.id)}>{t('Delete')}</Button>
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
