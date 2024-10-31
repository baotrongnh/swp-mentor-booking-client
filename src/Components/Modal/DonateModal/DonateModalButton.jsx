import { Button, Modal, Divider, Skeleton, Card, Row, Col, Flex, Image } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import './DonateModalButton.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import { getToken } from '../../../utils/storageUtils';
import axiosClient from '../../../apis/axiosClient';
import defaultAvatar from '../../../assets/Photos/avatar/defaultItemAvatar.jpeg'
import { AuthContext } from '../../../Contexts/AuthContext';


const DonateModalButton = ({ className, mentorId }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const currentUser = useContext(AuthContext)

    const handleDonate = async (mentorId, itemId, studentId) => {
        const token = getToken();

        try {
            const res = await axiosClient(token).post('/vnpay/create_payment_url', {
                itemId: itemId,
                mentorId: mentorId,
                studentId: studentId
            })
            if (res) {
                console.log(res.vnpUrl)
                window.open(res.vnpUrl, "_blank")
            }

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true)

        try {
            const token = getToken();
            const res = await axiosClient(token).get('/item/all/')
            console.log(res.items)
            if (res) {
                setData(res.items)
                setHasMore(false)
            }
        } catch (error) {
            console.log(error.error_code + ": " + error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])


    const formatNumber = (price) => {
        return Intl.NumberFormat('de-DE').format(price)
    }

    return (
        <div className='donate-modal-btn'>
            <Button

                size="large"
                type="primary"
                onClick={() => setOpen(true)}
                className={`donate-button ${className}`}
            >
                <Icon icon="noto:coin" style={{ marginRight: '8px' }} /> Donate
            </Button>
            <Modal
                title="Choose Your Donation"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1200}
                className="donate-modal"
                footer={null}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>That is all</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <Row
                        gutter={[24, 24]}
                        align='middle'
                        justify='center'
                    >
                        {data.map((item, index) => (
                            <Col
                                key={index}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                className='donate-col'
                                style={{ padding: '0.5rem' }}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <Image
                                            alt={item.name}
                                            src={item.imgPath}
                                            preview={false}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '10px 10px 0 0',
                                                border: '0.1px solid gray',
                                                borderBottom: 'none'
                                            }}
                                            onError={(e) => e.target.src = defaultAvatar}
                                        />}
                                    className='donate-card'
                                    style={{ border: '0.1px solid gray' }}
                                >
                                    <h1 className='donate-item-title'>{item.name}</h1>
                                    <Flex align='center' justify='center'>
                                        <span className='donate-price'>
                                            {formatNumber(item.price)} vnđ
                                        </span>
                                    </Flex>
                                    <Button
                                        type="primary"
                                        onClick={() => handleDonate(mentorId, item.id, currentUser.currentUser.accountId)}
                                        className={`donate-button ${className}`}
                                        style={{
                                            width: '100%',
                                            marginTop: '1rem'
                                        }}
                                    >
                                        <Icon icon="noto:coin" style={{ marginRight: '8px' }} /> Donate
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </Modal>
        </div>
    );
};

DonateModalButton.propTypes = {
    className: PropTypes.string,
    mentorId: PropTypes.any.isRequired
}

export default DonateModalButton;
