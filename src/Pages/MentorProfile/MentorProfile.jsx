import { StarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Menu } from "antd";
import { useContext, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import { ModalBookMentor, ModalRatingMentor } from '../../Components/Modal';
import { AuthContext } from '../../Contexts/AuthContext';
import { getProfileMentor } from "../../apis/mentor";
import './MentorProfile.scss';
import { AboutMentor, MentorInfor, RatingView, Skills } from "./components";

function MentorProfile() {
     const { currentUser } = useContext(AuthContext);
     const [modalBookingOpen, setModalBookingOpen] = useState(false);
     const [modalRatingOpen, setModalRatingOpen] = useState(false);
     const { id } = useParams('id');
     const { data: mentorInfor, isLoading, isError, refetch } = useQuery({ queryKey: ['mentorProfile', id], queryFn: () => getProfileMentor(id) });
     const [isCurrentUser, setIsCurrentUser] = useState(false);

     useLayoutEffect(() => {
          if (id == currentUser?.id) {
               setIsCurrentUser(false);
          } else {
               setIsCurrentUser(false);
          }
     }, [currentUser, id]);

     const items = [
          {
               label: 'About mentor',
               key: 'about',
               icon: <UserOutlined />,
          },
          {
               label: 'Skills',
               key: 'skills',
               icon: <UnorderedListOutlined />,
          },
          {
               label: 'Rating',
               key: 'rating',
               icon: <StarOutlined />,
          },
     ];

     const [currentTab, setCurrentTab] = useState('rating');

     const onClick = (e) => {
          setCurrentTab(e.key);
     };

     const renderContent = () => {
          switch (currentTab) {
               case 'about': return <AboutMentor />
               case 'skills': return <Skills id={id} />
               case 'rating': return <RatingView id={id} setModalRatingOpen={setModalRatingOpen} isCurrentUser={isCurrentUser} />
          }
     }

     if (isLoading) {
          return <Loading />
     }

     if (isError) {
          return (
               <>
                    <h1>Đã xãy ra lỗi</h1>
                    <button onClick={() => refetch()}>try again</button>
               </>
          )
     }

     return (
          <div className="mentor-profile">
               <div className="container" style={{ padding: '20px 0' }}>
                    <Breadcrumb
                         items={[
                              { title: <Link to='/browser-mentors'>Browser mentors</Link>, },
                              { title: 'View Profile Mentor' },
                         ]}
                    />
               </div>

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
          </div>
     );
}

export default MentorProfile;