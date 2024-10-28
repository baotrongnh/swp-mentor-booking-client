import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './CompletedBooking.scss';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { getListAllBooking } from '../../../../apis/booking';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../Contexts/AppContext';
// import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg'

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

const CompletedBooking = ({ selectedDate, onBookingDatesChange }) => {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 10;
    const { t } = useContext(AppContext)

    const getCurrentUserRole = (role) => {
        return role === 0 ? 'student' : 'mentor'
    }

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(getCurrentUserRole(currentUser.isMentor), currentUser.accountId);
            if (res) {
                setAllData(res.data) // set Data ne


                const newBookingDates = res.data.map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'))
                onBookingDatesChange(newBookingDates)
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
        if (hasMore) {
            console.log("Has more Data");
        } else {
            console.log("No more Data");
        }
        if (allData.length <= 4) {
            setHasMore(false)
        }
    }, [hasMore, allData.length])


    useEffect(() => {
        let filterData = allData.filter(booking => booking.status === 2);
        console.log(filterData)

        if (selectedDate) {
            filterData = filterData.filter(booking => dayjs(booking.startTime).isSame(selectedDate, 'day'))
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setDisplayData(filterData.slice(0, endIndex))
        setHasMore(filterData.length > endIndex)
    }, [allData, selectedDate, page, pageSize])


    return (
        <div
            className='completed-booking'
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
                <List
                    dataSource={displayData}
                    renderItem={(item) => (
                        <List.Item key={item.id} className="list-item">
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.mentor.imgPath}
                                        alt='Mentor image'
                                        size={70}
                                    // onError={(e) => e.target.src = defaultAvatar}
                                    />}
                                title={<Link to={`/mentor/profile/${item.mentorId}`}>{item.mentor.fullName}</Link>}
                                description={item.mentor.email}
                            />
                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                {formatDate(new Date(item.startTime), true)}
                                {formatDate(new Date(item.endTime), false)}
                            </Flex>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

CompletedBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(dayjs),
    onBookingDatesChange: PropTypes.func.isRequired,
}

export default CompletedBooking;