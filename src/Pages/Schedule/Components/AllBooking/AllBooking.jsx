import { useContext, useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './AllBooking.scss';
import { getListBooking } from '../../../../apis/booking';
import { AuthContext } from '../../../../Contexts/AuthContext'
import { getProfileMentor } from '../../../../apis/mentor';
import avatarDefault from '../../../../assets/Photos/avatar/default_avatar_2.jpg'


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

const AllBooking = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const [mentorProfiles, setMentorProfiles] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const currentUserRole = (role) => {
        return role === 0 ? 'student' : 'mentor'
    }

    const loadData = async () => {
        if (loading) return;
        setLoading(true);

        const role = currentUserRole(currentUser.isMentor);
        const id = currentUser.accountId;


        try {
            const res = await getListBooking(role, id)
            if (res) {
                setData(res.data)
                setHasMore(false)
                const mentorId = res.data.map(data => data.mentorId)
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

    };

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


    console.log(mentorProfiles)
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div
            className='all-booking'
            id="scrollableDiv"
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more...</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
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

export default AllBooking;