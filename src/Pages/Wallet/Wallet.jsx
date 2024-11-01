import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Breadcrumb, Col, List, Row, Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHistoryTransaction } from '../../apis/booking'
import { AppContext } from '../../Contexts/AppContext'
import { AuthContext } from '../../Contexts/AuthContext'
import './Wallet.scss'

export default function Wallet() {
    const { currentUser } = useContext(AuthContext)
    const { t } = useContext(AppContext)
    const [initLoading, setInitLoading] = useState(true)
    const [list, setList] = useState([])
    const { data: transactionData } = useQuery({
        queryKey: [`transaction-${currentUser.accountId}`],
        queryFn: () => getHistoryTransaction(currentUser.isMentor === 0 ? 'student' : 'mentor', currentUser?.accountId)
    })

    console.log(transactionData);
    useEffect(() => {
        if (transactionData) {
            setList(transactionData)
            setInitLoading(false)
        }
    }, [transactionData])

    const returnType = (type) => {
        switch (type) {
            case 1: return 'Booking'
            case 2: return 'Refund'
            case 3: return 'Fine'
            case 0: return 'Minus'
            default: return 'Other'
        }
    }

    return (
        <div className='wallet'>
            <div className="container" style={{ padding: '20px 0' }}>
                {currentUser?.isMentor === 0 &&
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
                }

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
                            dataSource={list}
                            renderItem={(item) => {
                                return (
                                    <List.Item actions={[<a key="list-loadmore-more">more</a>]}>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                avatar={currentUser?.isMentor === 0 ? <Avatar src={item?.booking.mentor.imgPath} /> : ''}
                                                title={<Link>{item?.booking.mentor.fullName}</Link>}
                                                description={returnType(item.type)}
                                            />
                                            <div style={{ color: `${item.type === 1 || item.type === 2 ? 'green' : 'red'}` }}>
                                                {`${item.type === 1 || item.type === 2 ? '+' : '-'}${item.point}`} point
                                            </div>
                                        </Skeleton>
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
