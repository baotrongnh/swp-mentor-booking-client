import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Statistic } from 'antd'
import { Loading } from '../../../Components'
import { getProportion } from '../../../apis/admin'

export default function OverviewProportion() {
     const { data: dataReport, isLoading } = useQuery({
          queryKey: ['booking-stats'],
          queryFn: getProportion
     })

     console.log(dataReport);

     if (isLoading) return <Loading />

     return (
          <div style={{ padding: '24px' }}>
               <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Booking Cancellation Rate"
                                   value={dataReport.cancelledRate}
                                   suffix="%"
                                   valueStyle={{ color: '#cf1322' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {dataReport.cancelled} out of {dataReport.total} bookings
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Student Complaint Rate"
                                   value={dataReport.complaintRate}
                                   suffix="%"
                                   valueStyle={{ color: '#faad14' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {dataReport.complaint} complaints from students
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                         <Card bordered={false} style={{ height: '100%' }}>
                              <Statistic
                                   title="Mentor Complaint Rate"
                                   value={0}
                                   suffix="%"
                                   valueStyle={{ color: '#faad14' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {0} complaints from mentors
                              </div>
                         </Card>
                    </Col>

                    <Col xs={24}>
                         <Card bordered={false}>
                              <Statistic
                                   title="Repeat Booking Rate"
                                   value={dataReport.starStudentRate}
                                   suffix="%"
                                   valueStyle={{ color: '#3f8600' }}
                              />
                              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '8px' }}>
                                   {dataReport.starStudent} students booked 2+ times
                              </div>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}
