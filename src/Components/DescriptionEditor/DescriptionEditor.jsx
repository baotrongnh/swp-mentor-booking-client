import { Button, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const DescriptionEditor = ({ defaultDescription }) => {
     const [description, setDescription] = useState(defaultDescription);
     const [isEditing, setIsEditing] = useState(false);

     useEffect(() => {
          setDescription(defaultDescription);
     }, [defaultDescription]);

     const handleEdit = () => {
          if (isEditing) {
               if (description === defaultDescription) {
                    toast.error('Nothing change!')
               } else {
                    console.log('New description:', description);
                    setIsEditing(false);
               }
          } else {
               setIsEditing(true);
          }
     };

     const handleCancel = () => {
          setDescription(defaultDescription);
          setIsEditing(false);
     };

     return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {isEditing ? (
                    <TextArea
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         autoSize={{ minRows: 3, maxRows: 6 }}
                    />
               ) : (
                    <div>
                         {description.split('\n').map((line, index) => (
                              <p key={index} style={{ margin: 0 }}>{line}</p>
                         ))}
                    </div>
               )}
               <Space>
                    <Button type="primary" onClick={handleEdit}>
                         {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    {isEditing && (
                         <Button onClick={handleCancel}>
                              Cancel
                         </Button>
                    )}
               </Space>
          </div>
     );
};

export default DescriptionEditor;

DescriptionEditor.propTypes = {
     defaultDescription: PropTypes.string
}