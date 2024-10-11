import { useContext, useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import { Icon } from '@iconify/react';
import { AuthContext } from "../../Contexts/AuthContext"
import avatarDefault from '../../assets/Photos/avatar/default_avatar_2.jpg'
import EditProfile from './EditProfile';
import './StudentProfile.scss';

function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <div className="user-profile">
            <div className="container">
                <h1 className='title'>User Profile</h1>
                <div className="content">
                    <Row align='center' className="top-information">
                        <Col flex={1} className='avatar' align='center'>
                            <Image
                                src={currentUser.imgPath || avatarDefault}
                                preview={{
                                    src: "https://i.pinimg.com/736x/36/9d/20/369d203e4ff156c303ec66e890b45364.jpg",
                                    mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                }}
                                className="avatar-image"
                                alt="User Avatar"
                            />
                        </Col>
                        <Col flex={8} className='student-information'>
                            <h2>{currentUser.fullName || 'Please login to get information...'}</h2>
                            <p><strong>Email:</strong>{currentUser.email || ' abc@fpt.edu.vn'}</p>
                            <p><strong>Point:</strong> {currentUser.point || 0} {/*<Icon icon="ri:typhoon-fill" style={{ width: '2rem', height: '2rem' }}  />*/}</p>
                            <Button className='edit-profile-btn' onClick={handleToggle} style={{ marginTop: '16px' }}>
                                <Icon icon="uil:edit" style={{ width: '1.8rem', height: '1.8rem' }} /> Edit Profile
                            </Button>
                        </Col>
                    </Row>

                    <EditProfile visible={isEditing} onClose={handleClose} />

                    <div className="bio-information">
                        <div className="top-bio-information">
                            <h1>Bio</h1>
                            <Button className='edit-bio-btn'>
                                <Icon icon="uil:edit" style={{ width: '1.8rem', height: '1.8rem' }} />Edit Bio
                            </Button>
                        </div>
                        <p>
                            Hi, I&apos;m Trinh Tran Phuong Tuan Cui, an IT student at FPT University. My journey into the world of technology has been driven by my passion for problem-solving and innovation. I enjoy diving into programming, exploring the latest in tech trends, and working on creative projects that push the boundaries of what&apos;s possible with technology. In addition to my studies, I&apos;m constantly looking for ways to grow both personally and professionally. I&apos;m involved in activities that help me build my communication and teamwork skills, which I know will be essential in my future career as a developer. I&apos;m also working on improving my English, particularly through the TOEIC Speaking and Writing tests, to expand my career opportunities globally. I&apos;m excited about the future and the possibilities in IT, and I&apos;m committed to learning and growing every step of the way.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;