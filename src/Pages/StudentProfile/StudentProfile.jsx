import { useContext, useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { AuthContext } from "../../Contexts/AuthContext"
import './StudentProfile.scss';

function EditProfile({ visible, onClose }) {
    const [name, setName] = useState("Trịnh Trần Phương Tuấn (J97)");
    const [email, setEmail] = useState("jack97@gmail.com");

    const handleUserNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onSave = () => {
        const savedValues = { name, email }
        console.log('Saved values:', savedValues);
        onClose();
    };

    return (
        visible && (
            <div className="edit-profile">
                <h1 className="edit-profile-title" >Edit Profile</h1>
                <div className="edit-form">
                    <div className='input-block'>
                        <label htmlFor="name" className='label name'>
                            Name
                        </label>
                        <input
                            type="text"
                            className="input name"
                            id='name'
                            name='name'
                            placeholder={name}
                        />
                    </div>
                    <div className='input-block'>
                        <label htmlFor="email" className='label email'>
                            Email
                        </label>
                        <input
                            type="text"
                            className="input email"
                            id='email'
                            name='email'
                            placeholder={email}
                        />
                    </div>
                    <div className="edit-profile-btn">
                        <Button type="primary" className='btn save' onClick={{ handleUserNameChange, onSave, handleEmailChange }}>
                            Save
                        </Button>
                        <Button onClick={onClose} className='btn cancel' style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}

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
                <h1 className='title' >User Profile</h1>
                <div className="content">
                    <Row align='center' className="top-information">
                        <Col flex={1} className='avatar' align='center'>
                            <Image
                                src={currentUser.imgPath}
                                preview={{
                                    src: "https://i.pinimg.com/736x/36/9d/20/369d203e4ff156c303ec66e890b45364.jpg",
                                    mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                }}
                                className="avatar-image"
                            />
                        </Col>
                        <Col flex={8} className='student-information'>
                            <h2>Trịnh Trần Phương Tuấn (J97)</h2>
                            <p><strong>Email:</strong> jack97@gmail.com</p>
                            <p><strong>Coin:</strong> 97 <Icon icon="twemoji:coin" style={{ width: '2rem', height: '2rem' }} /></p>
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

EditProfile.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default StudentProfile;
