import { useContext, useEffect, useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import { Icon } from '@iconify/react';
import { AuthContext } from "../../Contexts/AuthContext"
import avatarDefault from '../../assets/Photos/avatar/default_avatar.jpg'
import EditProfile from './EditProfile';
import Loading from '../../Components/Loading/Loading'
import { ModalBecomeMentor } from '../../Components/Modal';
import './StudentProfile.scss';
import { AppContext } from '../../Contexts/AppContext'
import { useNavigate } from 'react-router-dom';

function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser, isFetchUserData } = useContext(AuthContext);
    const [openModalBeMentor, setOpenModalBeMentor] = useState(false)
    const navigate = useNavigate()
    const { t } = useContext(AppContext)

    console.log(currentUser)

    useEffect(() => {
        if (currentUser?.isMentor !== 0) {
            navigate(`/mentor/profile/${currentUser?.accountId}`)
        }
    })

    useEffect(() => {
    }, [currentUser]);

    const handleClose = () => {
        setIsEditing(false);
    };

    if (isFetchUserData) {
        return <Loading />
    }

    return (
        <div className="user-profile">
            <div className="container">
                <h1 className='title'>{t('user profile')}</h1>
                <div className="content">
                    <Row align='center' className="top-information">
                        <Col flex={1} className='avatar' align='center'>
                            <Image
                                src={currentUser.imgPath || avatarDefault}
                                preview={{
                                    minScale: '10',
                                    src: currentUser.imgPath || avatarDefault,
                                    mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                }}
                                className="avatar-image"
                                alt="User Avatar"
                                onError={(e) => e.target.src = avatarDefault}
                            />
                        </Col>
                        <Col flex={8} className='student-information'>
                            <h2>{currentUser.fullName || 'Please login to get information...'}</h2>
                            <p><strong>Email:</strong> {currentUser.email || ' abc@fpt.edu.vn'}</p>
                            <p className='point'><strong>{t('point')}:</strong > {currentUser.point || 0} </p>

                            <div className="student-profile-btn">
                                <Button
                                    className='gradient-btn custom-btn link-item'
                                    type="primary"
                                    onClick={() => setOpenModalBeMentor(true)}
                                >
                                    <Icon icon="ep:avatar" style={{ marginRight: '8px' }} /> {t('become a mentor')}
                                </Button>

                            </div>
                        </Col>
                    </Row>

                    <EditProfile visible={isEditing} onClose={handleClose} />
                    <ModalBecomeMentor modalOpen={openModalBeMentor} setModalOpen={setOpenModalBeMentor} />

                </div>
            </div>


        </div>
    );
}

export default StudentProfile;
