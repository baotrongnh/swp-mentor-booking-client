import { Menu } from "antd";
import { useState } from "react";
import './MentorProfile.scss';
import { AboutMentor, MentorInfor, Skills } from "./components";
import { StarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'

function MentorProfile() {

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
               <MentorInfor />

               <div className="container">
                    <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                    {renderContent()}
               </div>
          </div>

     );
}

export default MentorProfile;