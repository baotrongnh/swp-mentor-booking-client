import { FieldTimeOutlined, StarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Menu } from "antd"
import { useContext, useLayoutEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { SkeletonLoading } from '../../Components'
import { ModalAddSlot, ModalBookMentor, ModalRatingMentor } from '../../Components/Modal'
import { AppContext } from '../../Contexts/AppContext'
import { AuthContext } from '../../Contexts/AuthContext'
import { getProfileMentor } from "../../apis/mentor"
import PageError from '../PageError'
import './MentorProfile.scss'
import { AboutMentor, MentorInfor, RatingView, Skills, Slots } from "./components"

function MentorProfile() {
    const { currentUser } = useContext(AuthContext)
    const { t } = useContext(AppContext)
    const [currentTab, setCurrentTab] = useState('slots')
    const [modalBookingOpen, setModalBookingOpen] = useState(false)
    const [modalRatingOpen, setModalRatingOpen] = useState(false)
    const [modalAddSlotsOpen, setModalAddSlotsOpen] = useState(false)
    const { id } = useParams('id')
    const { data: mentorInfor, isLoading, isError, refetch } = useQuery({
        queryKey: ['mentorProfile', id],
        queryFn: () => getProfileMentor(id)
    })

    const [isCurrentUser, setIsCurrentUser] = useState(false)

    useLayoutEffect(() => {
        if (id == currentUser?.accountId) {
            setIsCurrentUser(true)
        } else {
            setIsCurrentUser(false)
        }
    }, [currentUser, id])

    const items = [
        {
            label: t('Slots'),
            key: 'slots',
            icon: <FieldTimeOutlined />,
        },
        {
            label: t('About'),
            key: 'about',
            icon: <UserOutlined />,
        },
        {
            label: t('Skills'),
            key: 'skills',
            icon: <UnorderedListOutlined />,
        },
        {
            label: t('Rating'),
            key: 'rating',
            icon: <StarOutlined />,
        },
    ]


    const onClick = (e) => {
        setCurrentTab(e.key)
    }

    const renderContent = () => {
        switch (currentTab) {
            case 'about':
                return <AboutMentor mentorInfor={mentorInfor?.mentor} />
            case 'skills':
                return <Skills id={id} />
            case 'rating':
                return <RatingView id={id} setModalRatingOpen={setModalRatingOpen} isCurrentUser={isCurrentUser} />
            case 'slots':
                return <Slots isCurrentUser={isCurrentUser} mentorId={id} setModalAddSlotsOpen={setModalAddSlotsOpen} />
        }
    }

    if (isLoading) return <SkeletonLoading />

    if (isError) return <PageError action={refetch} />

    return (
        <div className="mentor-profile">
            {
                currentUser.isMentor === 0 &&
                <div className="container" style={{ padding: '20px 0' }}>
                    <Breadcrumb
                        items={[
                            { title: <Link to='/'>{t('home')}</Link>, },
                            { title: <Link to='/browser-mentors'>{t('browser mentors')}</Link>, },
                            { title: t('view profile mentor') },
                        ]}
                    />
                </div>
            }

            <MentorInfor
                id={id}
                setModalOpen={setModalBookingOpen}
                mentorInfor={mentorInfor?.mentor}
                setCurrentTab={setCurrentTab}
                isCurrentUser={isCurrentUser}
            />

            <div className="container">
                <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                {renderContent()}
            </div>

            <ModalBookMentor
                modalOpen={modalBookingOpen}
                setModalOpen={setModalBookingOpen}
                currentIdMentor={id}
            />

            <ModalRatingMentor
                modalOpen={modalRatingOpen}
                setModalOpen={setModalRatingOpen}
                mentorId={id}
            />

            <ModalAddSlot modalOpen={modalAddSlotsOpen} setModalOpen={setModalAddSlotsOpen} />
        </div>
    )
}

export default MentorProfile