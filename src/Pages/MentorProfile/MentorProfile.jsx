import { Menu } from "antd";
import { useState } from "react";
import './MentorProfile.scss';
import { AboutMentor, MentorInfor, Skills } from "./components";
import { StarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { BookMentorModal, ModalCenter } from "../../Components";

function MentorProfile() {

     const [modalOpen, setModalOpen] = useState(false);

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
          }
     }

     return (
          <div className="mentor-profile">
               <MentorInfor setModalOpen={setModalOpen} />

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