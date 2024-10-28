import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './AllBooking.scss';
import { getListBooking } from '../../../../apis/booking';
import { AuthContext } from '../../../../Contexts/AuthContext'
// import avatarDefault from '../../../../assets/Photos/avatar/default_avatar_2.jpg'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'



const formatDate = (date, isStartTime) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return (
        <div className='data-form'>
            <Flex align='center' gap='small'>
                <Icon icon="ion:calendar-outline" style={{ fontSize: '1.6rem' }} />
                <p className='data-date'>{`${year}-${month}-${day}`}</p>
            </Flex>
            <Flex align='center' gap='small'>
                <p className='data-time-label'>{isStartTime ? 'Start:' : 'End:'}</p>
                <p className='data-time'>{`${hours}:${minutes}:${seconds}`}</p>
            </Flex>
        </div>
    );
};

const AllBooking = ({ selectedDate, onBookingDatesChange }) => {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const currentUserRole = (role) => {
        return role === 0 ? 'student' : 'mentor'
    }

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListBooking(currentUserRole(currentUser.isMentor), currentUser.accountId);
            if (res) {
                setAllData(res.data) // set Data ne
                console.log(res.data)
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

        if (selectedDate) {
            filterData = allData.filter(booking => dayjs(booking.startTime).isSame(selectedDate, 'day'))
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setDisplayData(filterData.slice(0, endIndex))
        setHasMore(filterData.length > endIndex) // cai nay cho load data neu con 
    }, [selectedDate, allData, page, pageSize])


    //cai nay de loc ra nhung ngay co Booking
    useEffect(() => {
        if (allData.length > 0) {
            const bookingDates = allData.map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'))
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
            console.log("Less than 4 booking")
            setHasMore(false)
        }
    }, [hasMore, allData.length])

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
                endMessage={<Divider plain>You have reached the end of your bookings!</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={displayData}
                    renderItem={(item) => (
                        <List.Item key={item.id} className="list-item">
                            <List.Item.Meta
                                avatar={<Avatar src={item.mentor.imgPath} alt='Mentor image' size={70} />}
                                title={<Link to={`/mentor/profile/${item.mentorId}`}>{item.mentor.fullName}</Link>}
                                description={item.mentor.email}
                            />
                            <div className="time-wrapper" >
                                {formatDate(new Date(item.startTime), true)}
                                {/* <h1> - </h1> */}
                                {formatDate(new Date(item.endTime), false)}
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

AllBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(dayjs),
    onBookingDatesChange: PropTypes.func.isRequired,
}

export default AllBooking;
