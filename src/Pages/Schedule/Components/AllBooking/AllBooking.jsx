import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './AllBooking.scss';
import { getListBooking } from '../../../../apis/booking';
import { AuthContext } from '../../../../Contexts/AuthContext'
import { getProfileMentor } from '../../../../apis/mentor';
import avatarDefault from '../../../../assets/Photos/avatar/default_avatar_2.jpg'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';


const formatDate = (date) => {
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
                <Icon icon="mingcute:time-line" style={{ fontSize: '1.6rem' }} />
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
    const [mentorProfiles, setMentorProfiles] = useState([])
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
                setAllData(res.data)
                const newBookingDates = res.data.map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'));
                onBookingDatesChange(newBookingDates);
                const mentorId = res.data.map(data => data.mentorId)
                console.log("loadData")

                try {
                    const mentorProfiles = await Promise.all(
                        mentorId.map(async mentorId => {
                            const profile = await getProfileMentor(mentorId);
                            return { mentorId, name: profile.mentor.fullName, email: profile.mentor.email, image: profile.mentor.imgPath }
                        })
                    )
                    setMentorProfiles(mentorProfiles)

                } catch (error) {
                    console.log(error.error_code + ": " + error.message)
                }
            }
        } catch (error) {
            console.log(error.error_code + ": " + error.message)
        } finally {
            setLoading(false)
        }

    }, [currentUser.isMentor, currentUser.accountId, onBookingDatesChange])

    const getMentorNameById = (id) => {
        const mentor = mentorProfiles.find(profile => profile.mentorId === id)
        return mentor ? mentor.name : 'Unknow Mentor'
    }

    const getMentorEmailById = (id) => {
        const mentor = mentorProfiles.find(profile => profile.mentorId === id)
        return mentor ? mentor.email : 'Unknow Email'
    }

    const getMentorImageById = (id) => {
        const mentor = mentorProfiles.find(profile => profile.mentorId === id)
        return mentor ? mentor.image : { avatarDefault }
    }

    // cai nay la load data
    useEffect(() => {
        console.log('UseEffect LoadData')
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
        setDisplayData(filterData.slice(0, page * pageSize))
        setHasMore(filterData.length > page * pageSize)
    }, [selectedDate, allData, page, pageSize])


    //cai nay de loc ra nhung ngay co Booking
    useEffect(() => {
        if (allData.length > 0) {
            const bookingDates = allData.map(booking => dayjs(booking.startTime).format('YYYY-MM-DD'))
            onBookingDatesChange(bookingDates);
        }
    }, [allData, onBookingDatesChange])

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
                endMessage={<Divider plain>It is all, nothing more...</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={displayData}
                    renderItem={(item) => (
                        <List.Item key={item.id} className="list-item">
                            <List.Item.Meta
                                avatar={<Avatar src={getMentorImageById(item.mentorId)} size={70} />}
                                title={<a href="https://ant.design">{getMentorNameById(item.mentorId)}</a>}
                                description={getMentorEmailById(item.mentorId)}
                            />
                            <div className="time-wrapper" >
                                {formatDate(new Date(item.startTime))}
                                <h1> - </h1>
                                {formatDate(new Date(item.endTime))}
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
