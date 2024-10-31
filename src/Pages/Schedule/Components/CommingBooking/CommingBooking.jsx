import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Divider, Flex, Image, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './CommingBooking.scss';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { getListAllBooking } from '../../../../apis/booking';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../Contexts/AppContext';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';
import MentorButton from '../MentorButton/MentorButton';
import { ModalAddGroup } from '../../../../Components/Modal';
import FormatDate from '../FormatDate/FormatDate';
import { getToken } from '../../../../utils/storageUtils';
import axiosClient from '../../../../apis/axiosClient';
import toast from 'react-hot-toast';


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

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(role, currentUser?.accountId);
            if (res) {
                setAllData(res.data) // set Data ne
                // console.log('All data', res.data)
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

    console.log(role)

    const loadMore = useCallback(() => {
        setPage(prevPage => prevPage + 1)
    })

    useEffect(() => {
        hasMore ? console.log("Has more Data") : console.log("No more Data");
        if (allData.length <= 4) {
            setHasMore(false)
        }
    }, [hasMore, allData.length])


    useEffect(() => {
        let filterData = allData.filter(booking =>
            (booking.status === 1 || booking.status === 2) && dayjs(booking.startTime).isAfter(dayjs())
        );

        if (selectedDate) {
            filterData = filterData.filter(booking => dayjs(booking.startTime).isSame(selectedDate, 'day'))
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setDisplayData(filterData.slice(0, endIndex))
        setHasMore(filterData.length > endIndex)
    }, [allData, selectedDate, page, pageSize])


    const handleReload = useCallback((reload) => {
        if (reload) {
            loadData()
        }
    }, [loadData])

    console.log(displayData)

    const handleDeny = async (id) => {
        const token = getToken()
        const res = await axiosClient(token).post('/booking/deny', {
            bookingId: id
        })
        try {
            if (res) {
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
                                    description={<MentorButton bookingId={item.id} onReload={handleReload} />}
                                />

                                <Flex justify='center' align='center'>
                                    <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                        {FormatDate(new Date(item.startTime), true)}
                                        {FormatDate(new Date(item.endTime), false)}
                                        <Flex justify='center' align='center' gap={24} style={{ marginTop: '1rem' }}>
                                            <Button
                                                danger
                                                style={{ width: '12rem' }}
                                                onClick={() => {
                                                    handleDeny(item.id)
                                                }
                                                }
                                            >Cancel</Button>
                                        </Flex>
                                    </Flex>
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
                                <Flex vertical justify='center' align='center' style={{ paddingRight: '2rem' }}>
                                    <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                        {FormatDate(new Date(item.startTime), true)}
                                        {FormatDate(new Date(item.endTime), false)}
                                    </Flex>
                                    <Flex justify='center' align='center' gap={24} style={{ marginTop: '1rem' }}>
                                        <Button
                                            type="primary"
                                            variant="outlined"
                                            style={{ width: '12rem' }}
                                            onClick={() => {
                                                setModalOpen(true)
                                                setBookigId(item.id)
                                            }
                                            }
                                        >Add Member</Button>
                                        <Button
                                            danger
                                            style={{ width: '12rem' }}
                                            onClick={() => {
                                                handleDeny(item.id)
                                            }
                                            }
                                        >Cancel</Button>
                                    </Flex>
                                </Flex>
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
