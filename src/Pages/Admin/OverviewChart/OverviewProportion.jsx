import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Statistic } from 'antd'
import { Loading } from '../../../Components'

export default function OverviewProportion() {
     const { data: stats, isLoading } = useQuery({
          queryKey: ['booking-stats'],
          queryFn: () => ({
               cancellation: '30',
               studentComplaints: '20',
               mentorComplaints: '0',
               repeatBookings: '2'
          })
     })

     if (isLoading) return <Loading />

     return (
          <div style={{ padding: '24px' }}>
               <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Booking Cancellation Rate"
                                   value={stats.cancellation}
                                   suffix="%"
                                   valueStyle={{ color: '#cf1322' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {3} out of {30} bookings
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Student Complaint Rate"
                                   value={stats.studentComplaints}
                                   suffix="%"
                                   valueStyle={{ color: '#faad14' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {stats.studentComplaints} complaints from students
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Mentor Complaint Rate"
                                   value={stats.mentorComplaints}
                                   suffix="%"
                                   valueStyle={{ color: '#faad14' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {stats.mentorComplaints} complaints from mentors
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24}>
                         <Card bordered={false}>
                              <Statistic
                                   title="Repeat Booking Rate"
                                   value={stats.repeatBookings}
                                   suffix="%"
                                   valueStyle={{ color: '#3f8600' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {stats.repeatBookings} students booked 2+ times
                              </div>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}
