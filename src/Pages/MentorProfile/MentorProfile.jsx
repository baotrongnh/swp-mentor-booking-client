import { Menu } from "antd";
import { useEffect, useState } from "react";
import './MentorProfile.scss';
import { AboutMentor, MentorInfor, RatingView, Skills } from "./components";
import { StarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { BookMentorModal, ModalCenter } from "../../Components";
import { useParams } from "react-router-dom";
import { getProfileMentor } from "../../apis/mentor";

function MentorProfile() {

     const [modalOpen, setModalOpen] = useState(false);
     const [profileMentor, setProfileMentor] = useState({});
     const { id } = useParams('id');

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

     const [currentTab, setCurrentTab] = useState('about');
     const onClick = (e) => {
          setCurrentTab(e.key);
     };

     const renderContent = () => {
          switch (currentTab) {
               case 'about': return <AboutMentor />
               case 'skills': return <Skills />
               case 'rating': return <RatingView />
          }
     }

     useEffect(() => {
          const fetchProfileMentor = async (id) => {
               const { data } = await getProfileMentor(id);
               if (data.error_code == 0) {
                    setProfileMentor(data.mentor);
               }
          }

          if (id) {
               fetchProfileMentor(id);
          }
     }, [id]);

     return (
          <div className="mentor-profile">
               <MentorInfor
                    id={id}
                    setModalOpen={setModalOpen}
                    profile={profileMentor}
               />

               <div className="container">
                    <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                    {renderContent()}
               </div>

               <ModalCenter
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    ComponentRender={BookMentorModal}
                    okText='Book'
                    title='Book mentor'
               />
          </div>
     );
}

export default MentorProfile;