import { useContext, useEffect, useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import { Icon } from '@iconify/react';
import { AuthContext } from "../../Contexts/AuthContext"
import avatarDefault from '../../assets/Photos/avatar/default_avatar_2.jpg'
import EditProfile from './EditProfile';
import Loading from '../../Components/Loading/Loading'
import './StudentProfile.scss';

function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser, isFetchUserData } = useContext(AuthContext);
    // const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setIsEditing(prev => !prev);
    };

    useEffect(() => {
        if (currentUser) {
            // const timeoutId = setTimeout(() => {
            //     setLoading(false);
            // }, 1500);
            // return () => clearTimeout(timeoutId);
            // setLoading(false);
        }
    }, [currentUser]);

    const handleClose = () => {
        setIsEditing(false);
    };

    if (isFetchUserData) {
        return <Loading />
    }

    // console.log(JSON.stringify(currentUser))
    // console.log(localStorage.getItem('token'))

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
                                    src: `${currentUser.imgPath}`,
                                    mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                }}
                                className="avatar-image"
                                alt="User Avatar"
                            />
                        </Col>
                        <Col flex={8} className='student-information'>
                            <h2>{currentUser.fullName || 'Please login to get information...'}</h2>
                            <p><strong>Email:</strong> {currentUser.email || ' abc@fpt.edu.vn'}</p>
                            <p><strong>Point:</strong> {currentUser.point || 0} {/*<Icon icon="ri:typhoon-fill" style={{ width: '2rem', height: '2rem' }}  />*/}</p>
                            <Button className='edit-profile-btn' onClick={handleToggle} style={{ marginTop: '16px' }}>
                                <Icon icon="uil:edit" style={{ width: '1.8rem', height: '1.8rem' }} /> Edit Profile
                            </Button>
                        </Col>
                    </Row>

                    <EditProfile visible={isEditing} onClose={handleClose} />

                    <div className="bio-information">
                        <div className="top-bio-information">
                            <h1 className='bio-h1'>Bio</h1>
                            <Button className='edit-bio-btn'>
                                <Icon icon="uil:edit" style={{ width: '1.8rem', height: '1.8rem' }} />Edit Bio
                            </Button>
                        </div>
                        <p>
                            Hi, My name is {currentUser.fullName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;