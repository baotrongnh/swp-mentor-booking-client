import { Icon } from '@iconify/react/dist/iconify.js';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Divider, Flex, Image, List, Popconfirm, Row, Skeleton } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../apis/axiosClient';
import { getListAllBooking } from '../../../../apis/booking';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';
import { ModalAddGroup } from '../../../../Components/Modal';
import { AppContext } from '../../../../Contexts/AppContext';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { getToken } from '../../../../utils/storageUtils';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import FormatDate from '../FormatDate/FormatDate';

import './CommingBooking.scss';
import ModalViewDetailGroup from '../../../../Components/Modal/ModalViewDetailGroup/ModalViewDetailGroup';


const CommingBooking = ({ selectedDate, onBookingDatesChange }) => {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [bookingId, setBookigId] = useState(null)
    const [page, setPage] = useState(1)
    const pageSize = 10;
    const { t } = useContext(AppContext)
    const role = currentUser?.isMentor === undefined ? 'mentor' : 'student'
    const queryClient = useQueryClient()


    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(role, currentUser?.accountId);
            if (res && Array.isArray(res.data)) {
                setAllData(res.data);
                const bookingDates = res.data
                    .filter(booking =>
                        booking.status === 1 && dayjs(booking?.startTime).isAfter(dayjs())
                    )
                    .map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'));
                onBookingDatesChange(bookingDates);
            } else {
                console.error("Expected an array but got:", res.data);
                setAllData([]);
            }
        } catch (error) {
            console.log(error.error_code + ": " + error.message)
        } finally {
            setLoading(false)
        }
    }, [currentUser.isMentor, currentUser.accountId, onBookingDatesChange])

    useEffect(() => {
        loadData();
    }, [loadData]);


    const loadMore = useCallback(() => {
        setPage(prevPage => prevPage + 1)
    })

    useEffect(() => {
        if (Array.isArray(allData) && allData.length <= 4) {
            setHasMore(false)
        }
    }, [hasMore, allData.length])


    useEffect(() => {
        if (Array.isArray(allData)) {
            let filterData = allData?.filter(booking =>
                booking.status === 1 && dayjs(booking.startTime).isAfter(dayjs())
            );

            if (selectedDate) {
                filterData = filterData.filter(booking => dayjs(booking.startTime).isSame(selectedDate, 'day'))
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setDisplayData(filterData.slice(0, endIndex))
            setHasMore(filterData.length > endIndex)
        }
    }, [allData, selectedDate, page, pageSize])


    const handleReload = useCallback((reload) => {
        if (reload) {
            loadData()
        }
    }, [loadData])


    const handleDeny = async (role, id) => {
        const token = getToken()
        
        const res = await axiosClient(token).get(`/booking/cancel/${role}/${id}`)
        try {
            if (res) {
                queryClient.invalidateQueries({ queryKey: ['currentUser'] })
               
                toast.success('Success')
                handleReload(true)
            }
        } catch (error) {
            console.log('Error: ', error)
            toast.error('Error')
        }
    }

   

    return (
        <div
            className='comming-booking'
            id="scrollableDiv"
        >
            <InfiniteScroll
                dataLength={displayData?.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>{t('end list')}</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {role === 'mentor' ?
                    <List
                        dataSource={displayData}
                        renderItem={(item) => (
                            <List.Item
                                key={item?.id}
                                className="list-item">
                                <Row align='middle' justify='center' style={{ width: '100%' }}>
                                    <Col flex={6}>
                                        <List.Item.Meta
                                            avatar={
                                                <AvatarGroup studentGroup={item?.studentGroups} />
                                            }
                                            title={`${t('Group')} ${item?.id}`}
                                            description={<ModalViewDetailGroup id={item?.id} />}
                                        />
                                    </Col>
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center' style={{ paddingRight: '2rem' }}>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                                {FormatDate(new Date(item?.startTime), true)}
                                                {FormatDate(new Date(item?.endTime), false)}
                                            </Flex>
                                            <Flex justify='center' align='center' gap={24} style={{ marginTop: '1rem' }}>
                                                <Popconfirm
                                                    title={t("Cancel this booking?")}
                                                    description={t("Are you sure to cancel this booking?")}
                                                    okText={t("Yes")}
                                                    cancelText={t("No")}
                                                    onConfirm={() => handleDeny(role, item?.id)}
                                                >
                                                    <Button
                                                        danger
                                                        style={{ width: '12rem' }}
                                                    >{t('Cancel')}
                                                    </Button>
                                                </Popconfirm>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                </Row>
                            </List.Item>

                        )}
                    />
                    :
                    <List
                        dataSource={displayData}
                        renderItem={(item) => (
                            <List.Item
                                key={item?.id}
                                className="list-item">
                                <Row align='middle' justify='center' style={{ width: '100%' }}>
                                    <Col flex={6}>
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    className="avatar-img"
                                                    src={item?.mentor.imgPath}
                                                    alt='Avatar image'
                                                    preview={{
                                                        minScale: '10',
                                                        src: item?.mentor.imgPath || defaultAvatar,
                                                        mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                                    }}
                                                    onError={(e) => e.target.src = defaultAvatar}
                                                />}
                                            title={<Link to={`/mentor/profile/${item?.mentorId}`}>{item?.mentor.fullName}</Link>}
                                            description={<>
                                                {item?.mentor.email}
                                                <br />
                                                <ModalViewDetailGroup id={item?.id} />
                                            </>}

                                        />
                                    </Col>
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center' style={{ paddingRight: '2rem' }}>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                                {FormatDate(new Date(item?.startTime), true)}
                                                {FormatDate(new Date(item?.endTime), false)}
                                            </Flex>
                                            {item?.studentGroups[0].role === 1 &&
                                                <Flex justify='center' align='center' gap={24} style={{ marginTop: '1rem' }}>
                                                    <Button
                                                        type="primary"
                                                        variant="outlined"
                                                        style={{ width: '14rem' }}
                                                        onClick={() => {
                                                            setModalOpen(true)
                                                            setBookigId(item?.id)
                                                        }}
                                                    >{t('Add Member')}</Button>
                                                    <Popconfirm
                                                        title={t("Cancel this booking?")}
                                                        description={t("Are you sure to cancel this booking?")}
                                                        okText={t("Yes")}
                                                        cancelText={t("No")}
                                                        onConfirm={() => handleDeny(role, item?.id)}
                                                    >
                                                        <Button
                                                            danger
                                                            style={{ width: '12rem' }}
                                                        >{t('Cancel')}
                                                        </Button>
                                                    </Popconfirm>
                                                </Flex>
                                            }
                                        </Flex>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                }
                <ModalAddGroup modalOpen={modalOpen} setModalOpen={setModalOpen} bookingId={bookingId} />
            </InfiniteScroll>
        </div>
    );
};

CommingBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(dayjs),
    onBookingDatesChange: PropTypes.func.isRequired,
}

export default CommingBooking;
