import { Icon } from '@iconify/react'
import { Avatar, Breadcrumb, Button, Col, List, Row, Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import './Wallet.scss'
import { AppContext } from '../../Contexts/AppContext'

export default function Wallet() {
     const { currentUser } = useContext(AuthContext)
     const { t } = useContext(AppContext)
     const [initLoading, setInitLoading] = useState(true)
     const [loading, setLoading] = useState(false)
     const [data, setData] = useState([])
     const [list, setList] = useState([])

     useEffect(() => {
          fetch(`https://randomuser.me/api/?results=5&inc=name,gender,email,nat,picture&noinfo`)
               .then((res) => res.json())
               .then((res) => {
                    setInitLoading(false)
                    setData(res.results)
                    setList(res.results)
               })
     }, [])

     const onLoadMore = () => {
          setLoading(true)
          setList(
               data.concat(
                    [...new Array(5)].map(() => ({
                         loading: true,
                         name: {},
                         picture: {},
                    })),
               ),
          )
          fetch(`https://randomuser.me/api/?results=5&inc=name,gender,email,nat,picture&noinfo`)
               .then((res) => res.json())
               .then((res) => {
                    const newData = data.concat(res.results)
                    setData(newData)
                    setList(newData)
                    setLoading(false)
                    window.dispatchEvent(new Event('resize'))
               })
     }

     const loadMore = (
          !initLoading && !loading ? (
               <div
                    style={{
                         textAlign: 'center',
                         marginTop: 12,
                         height: 32,
                         lineHeight: '32px',
                    }}
               >
                    <Button onClick={onLoadMore}>loading more</Button>
               </div>
          ) : null
     )

     return (
          <div className='wallet'>
               <div className="container">
                    <Breadcrumb
                         items={[
                              {
                                   title: <Link to='/'>{t('home')}</Link>,
                              },
                              {
                                   title: <Link to='/browser-mentors'>{t('browser mentors')}</Link>,
                              },
                              {
                                   title: t('Wallet'),
                              },
                         ]}
                         style={{ padding: '20px 0' }}
                    />
                    <Row gutter={20}>
                         <Col md={15}>
                              <div className="balance-block">
                                   <h1 className="title">{t('Your balance')}:</h1>
                                   <div className="number-balance-block">
                                        <Icon className='icon' icon="twemoji:coin" />
                                        <p className='number'>{currentUser?.point}</p>
                                   </div>
                              </div>
                         </Col>

                         <Col md={9}>

                         </Col>
                    </Row>

                    <div className="transition-history">
                         <h1 className='title'>{t('Transaction history')}</h1>

                         <div className="transition-block">
                              <List
                                   className="demo-loadmore-list"
                                   loading={initLoading}
                                   itemLayout="horizontal"
                                   loadMore={loadMore}
                                   dataSource={list}
                                   renderItem={(item) => (
                                        <List.Item actions={[<a key="list-loadmore-more">more</a>]}>
                                             <Skeleton avatar title={false} loading={item.loading} active>
                                                  <List.Item.Meta
                                                       avatar={<Avatar src={item.picture.large} />}
                                                       title={<Link>{item.name?.last}</Link>}
                                                       description="Booking Mentor"
                                                  />
                                                  <div style={{ color: 'red' }}>-10 point</div>
                                             </Skeleton>
                                        </List.Item>
                                   )}
                              />
                         </div>
                    </div>
               </div>
          </div>
     )
}
