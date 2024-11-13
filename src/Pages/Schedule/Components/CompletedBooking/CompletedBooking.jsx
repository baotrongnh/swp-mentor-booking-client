import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Col, Divider, Flex, Image, List, Row, Skeleton } from 'antd';
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
import FormatDate from '../FormatDate/FormatDate';
import ModalReport from '../ModalReport/ModalReport';
import './CompletedBooking.scss';
import ModalViewDetailGroup from '../../../../Components/Modal/ModalViewDetailGroup/ModalViewDetailGroup';
import { ModalRatingMentor } from '../../../../Components/Modal';



const CompletedBooking = ({ selectedDate, onBookingDatesChange }) => {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState(null);
    const [displayData, setDisplayData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 10;
    const { t } = useContext(AppContext)
    const role = currentUser?.isMentor === 0 ? 'student' : 'mentor'
    const [openRating, setOpenRating] = useState(false)
    const [fetchData, setFetchData] = useState(false)

    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getListAllBooking(role, currentUser?.accountId);
            if (res && Array.isArray(res.data)) {
                setAllData(res.data)

                const bookingDates = res.data
                    .filter(booking =>
                        booking.status === 1 && dayjs(booking.startTime).isBefore(dayjs())
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
    }, [hasMore, allData?.length])


    useEffect(() => {
        if (Array.isArray(allData)) {
            let filterData = allData?.filter(booking =>
                booking.status === 1 && dayjs(booking.startTime).isBefore(dayjs())
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


    // console.log(displayData)

    // console.log("Current user", currentUser)

    // const currentStudentGroup = displayData?.studentGroups?.find(item => item.studentId === currentUser.accountId);

    // console.log("Current Student Group", currentStudentGroup);

    useEffect(() => {
        if (fetchData) {
            loadData().then(() => setFetchData(false));
        }
    }, [fetchData])

    return (
        <div
            className='completed-booking'
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
                                key={item.id}
                                className="list-item"
                            >
                                <Row justify='center' align='middle'>
                                    <Col flex={6} justify='center'>
                                        <List.Item.Meta
                                            avatar={
                                                <AvatarGroup studentGroup={item.studentGroups} />
                                            }
                                            title={`${t('Group')} ${item.id}`}
                                            description={<ModalViewDetailGroup id={item?.id} />}

                                        />
                                    </Col>
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center' style={{ paddingRight: '2rem' }}>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                                {FormatDate(new Date(item.startTime), true)}
                                                {FormatDate(new Date(item.endTime), false)}
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
                                key={item.id}
                                className="list-item"
                            >
                                <Row justify='center' align='middle'>
                                    <Col flex={6} justify='center'>
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
                                            description={<>
                                                {item?.mentor.email}
                                                <br />
                                                <ModalViewDetailGroup id={item?.id} />
                                            </>}
                                        />
                                    </Col >
                                    <Col flex={1}>
                                        <Flex vertical justify='center' align='center' style={{ paddingRight: '2rem' }}>
                                            <Flex justify='center' align='center' gap={24} className="time-wrapper" >
                                                {FormatDate(new Date(item?.startTime), true)}
                                                {FormatDate(new Date(item?.endTime), false)}
                                            </Flex>

                                            <Flex justify='center' align='center' gap={24} style={{ marginTop: '1rem' }}>
                                                {item.isFeedback === false &&
                                                    <Button
                                                        type='primary'
                                                        onClick={() => setOpenRating(true)}
                                                        style={{ width: '12rem', fontSize: '1.5rem' }}
                                                    >
                                                        Rating
                                                    </Button>
                                                }
                                                <ModalReport mentorId={item?.mentorId} studentId={currentUser?.accountId} />
                                            </Flex>
                                            <ModalRatingMentor mentorId={item?.mentorId} modalOpen={openRating} setModalOpen={setOpenRating} fetchdata={setFetchData} />
                                        </Flex>
                                    </Col>
                                </Row>
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