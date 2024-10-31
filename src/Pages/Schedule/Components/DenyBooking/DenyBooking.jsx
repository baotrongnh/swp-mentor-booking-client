import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Divider, Flex, Image, List, Row, Skeleton } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { getListAllBooking } from '../../../../apis/booking';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';
import { ModalAddGroup } from '../../../../Components/Modal';
import { AppContext } from '../../../../Contexts/AppContext';
import { AuthContext } from '../../../../Contexts/AuthContext';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import './DenyBooking.scss';
import FormatDate from '../FormatDate/FormatDate';




const DenyBooking = ({ selectedDate, onBookingDatesChange }) => {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false)
    const [bookingId] = useState(null)
    const pageSize = 10;
    const { t } = useContext(AppContext)
    const role = currentUser?.isMentor === undefined ? 'mentor' : 'student'

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(role, currentUser?.accountId);
            if (res) {
                setAllData(res.data) // set Data ne
                console.log('All data: ', res.data)
                const newBookingDates = res.data.map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'));
                onBookingDatesChange(newBookingDates);
            }
        } catch (error) {
            console.log(error.error_code + ": " + error.message)
        } finally {
            setLoading(false)
        }

    }, [currentUser.isMentor, currentUser.accountId, onBookingDatesChange])


    // cai nay la load data
    useEffect(() => {
        loadData();
    }, [loadData]);

    //cai nay de load trang
    const loadMore = useCallback(() => {
        setPage(prevPage => prevPage + 1)
    }, [])

    //cai nay de cho hien thi selectDay
    useEffect(() => {
        let filterData = allData;
        filterData = filterData.filter(booking => booking.status === 0);
        if (selectedDate) {
            filterData = allData.filter(booking => dayjs(booking.startTime).isSame(selectedDate, 'day'))
        }
        const sortData = filterData.sort((item1, item2) => { return new Date(item1.startTime) - new Date(item2.startTime); });

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setDisplayData(sortData.slice(0, endIndex))
        setHasMore(sortData.length > endIndex)
    }, [selectedDate, allData, page, pageSize])


    //cai nay de loc ra nhung ngay co Booking
    useEffect(() => {
        if (allData.length > 0) {
            const bookingDates = allData
                .filter(booking => booking.status === 0 || booking.status === 2)
                .map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'));
            onBookingDatesChange(bookingDates);
        }
    }, [allData, onBookingDatesChange])

    useEffect(() => {
        if (hasMore) {
            console.log('Has more Data')
        } else {
            console.log('No more Data')
        }
        if (allData.length <= 4) {
            setHasMore(false)
        }
    }, [hasMore, allData.length])


    console.log(displayData)
    return (
        <div
            className='all-booking'
            id="scrollableDiv"
        >
            <InfiniteScroll
                dataLength={displayData.length}
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
                            <List.Item key={item.id} className="list-item">
                                <Row align='middle' justify='center' style={{ width: '100%' }}>
                                    <Col flex={6}>
                                        <List.Item.Meta
                                            avatar={
                                                <AvatarGroup studentGroup={item.studentGroups} />
                                            }
                                            title={`Group ${item.id}`}
                                        />
                                    </Col>
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center'>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper">
                                                {FormatDate(new Date(item.startTime), true, t)}
                                                {FormatDate(new Date(item.endTime), false, t)}
                                            </Flex>
                                            <div className="denied">
                                                {t('deny')}
                                            </div>
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
                                key={item.id}
                                className="list-item"
                            >
                                <Row align='middle' justify='center'>
                                    <Col flex={6} justify='center' >
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    className="avatar-img"
                                                    src={item.mentor.imgPath}
                                                    alt='Avatar image'
                                                    preview={{
                                                        minScale: '10',
                                                        src: item.mentor.imgPath || defaultAvatar,
                                                        mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                                    }}
                                                    onError={(e) => e.target.src = defaultAvatar}
                                                />}
                                            title={<Link to={`/mentor/profile/${item.mentorId}`}>{item.mentor.fullName}</Link>}
                                            description={item.mentor.email}
                                        />
                                    </Col>
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center'>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                                {FormatDate(new Date(item.startTime), true)}
                                                {FormatDate(new Date(item.endTime), false)}

                                            </Flex>
                                            <div className="denied">
                                                {t('deny')}
                                            </div>
                                        </Flex>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                }
            </InfiniteScroll>
            <ModalAddGroup modalOpen={modalOpen} setModalOpen={setModalOpen} bookingId={bookingId} />
        </div>
    );
};

DenyBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(dayjs),
    onBookingDatesChange: PropTypes.func.isRequired,
}

export default DenyBooking;
