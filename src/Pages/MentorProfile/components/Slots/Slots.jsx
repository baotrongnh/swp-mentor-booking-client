import { CalendarOutlined, ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Flex, List, Popconfirm, Skeleton, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../../../Contexts/AppContext'
import { AuthContext } from '../../../../Contexts/AuthContext'
import { bookingMentor } from '../../../../apis/booking'
import { deleteSchedule, getAvailableSlot } from '../../../../apis/mentor'
import { formatDateToNormal } from '../../../../utils/format'
import './Slots.scss'

const { Title, Text } = Typography
export default function Slots({ setModalAddSlotsOpen, mentorId, isCurrentUser }) {
     const queryClient = useQueryClient()
     const { t } = useTranslation()

     const mutation = useMutation({
          mutationFn: ({ mentorId, studentId, slotId }) => bookingMentor(mentorId, studentId, slotId),
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

     const mutationDelete = useMutation({
          mutationFn: (slotId) => deleteSchedule(slotId),
          onSuccess: () => {
               toast.success('Delete success!')
               queryClient.invalidateQueries({ queryKey: [`available-slot-${mentorId}`, mentorId] })
          },
     })

     const { currentUser } = useContext(AuthContext)
     const { semesterData } = useContext(AppContext)

     const { data: listAvailableSlot, isLoading } = useQuery({
          queryKey: [`available-slot-${mentorId}`, mentorId],
          queryFn: () => getAvailableSlot(mentorId),
          enabled: !!mentorId,
     })

     const handleDelete = (id) => {
          mutationDelete.mutateAsync(id)
     }

     const handleBook = (slotId) => {
          mutation.mutate({ mentorId, studentId: currentUser.accountId, slotId })
     }

     if (isLoading) return <Skeleton />

     return (
          <div className="time-slot-list">
               <Flex justify='space-between'>
                    <Title level={2}>{t('Available Time Slots')}</Title>
                    {isCurrentUser && <Button type='primary' onClick={() => setModalAddSlotsOpen(true)}>+ {t('Add new slot')}</Button>}
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
                                             ?
                                             <Popconfirm
                                                  title="Booking confirm"
                                                  description="Are you sure you want to book this time?"
                                                  onConfirm={() => handleBook(item.id)}
                                                  okButtonProps={{
                                                       loading: mutation.isPending,
                                                  }}
                                             >
                                                  <Button loading={mutationDelete.isPending} type='primary'>
                                                       {t('Book')}: {semesterData.latestSemester.slotCost} <Icon icon="twemoji:coin" />
                                                  </Button>
                                             </Popconfirm>
                                             :
                                             <Popconfirm
                                                  title="Delete the slot"
                                                  description="Are you sure to delete this slot?"
                                                  icon={<QuestionCircleOutlined style={{ color: 'red', }} />}
                                                  onConfirm={() => handleDelete(item.id)}
                                             >
                                                  <Button danger>{t('Delete')}</Button>
                                             </Popconfirm>
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
