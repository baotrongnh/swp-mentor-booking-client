import { Icon } from '@iconify/react/dist/iconify.js';
import { Divider, Flex, Image, List, Skeleton } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { getListAllBooking } from '../../../../apis/booking';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';
import { AppContext } from '../../../../Contexts/AppContext';
import { AuthContext } from '../../../../Contexts/AuthContext';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import './CompletedBooking.scss';

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
    const role = currentUser?.isMentor === undefined ? 'mentor' : 'student'
    const currentTime = dayjs()

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(role, currentUser?.accountId);
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
        console.log(role)
        console.log(allData)
        let filterData = allData.filter(booking => booking.status === 2 && dayjs(booking.startTime).isBefore(currentTime));
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
                {role === 'mentor' ?
                    <List
                        dataSource={displayData}
                        renderItem={(item) => (
                            <List.Item key={item.id} className="list-item">
                                <List.Item.Meta
                                    avatar={
                                        <AvatarGroup studentGroup={item.studentGroups} />
                                    }
                                    title={`Group ${item.id}`}

                                />
                                <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                    {formatDate(new Date(item.startTime), true)}
                                    {formatDate(new Date(item.endTime), false)}
                                </Flex>

                            </List.Item>

                        )}
                    />
                    :
                    <List
                        dataSource={displayData}
                        renderItem={(item) => (
                            <List.Item key={item.id} className="list-item">
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
                                <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                    {formatDate(new Date(item.startTime), true)}
                                    {formatDate(new Date(item.endTime), false)}
                                </Flex>
                            </List.Item>
                        )}
                    />
                }
            </InfiniteScroll>
        </div>
    );
};

CompletedBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(dayjs),
    onBookingDatesChange: PropTypes.func.isRequired,
}

export default CompletedBooking;