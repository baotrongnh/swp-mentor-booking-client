import { Avatar, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import defaultAvatar from '../../../../assets/Photos/avatar/default_avatar.jpg';

function AvatarGroup({ studentGroup }) {


    return (
        <Avatar.Group max={3} size='large' >
            {studentGroup?.map((group, index) => (
                <Tooltip key={index} title={group.student.fullName} placement='top'>
                    <Avatar
                        src={group.student.imgPath || defaultAvatar}

                    />
                </Tooltip>
            ))}
        </Avatar.Group>
    );
}

AvatarGroup.propTypes = {
    studentGroup: PropTypes.any.isRequired
}

export default AvatarGroup;