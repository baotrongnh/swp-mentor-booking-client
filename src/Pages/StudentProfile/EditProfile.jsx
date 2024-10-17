import { useContext, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './EditProfile.scss'
import { AuthContext } from '../../Contexts/AuthContext';

function EditProfile({ visible, onClose }) {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState(currentUser.fullName);
    const [email, setEmail] = useState(currentUser.email);

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
                <h1 className="edit-profile-title">Edit Profile</h1>
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
                            onChange={handleUserNameChange}
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
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="edit-profile-btn">
                        <Button type="primary" className='btn save' onClick={onSave}>
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

EditProfile.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditProfile;