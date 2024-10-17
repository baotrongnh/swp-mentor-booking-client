import { Checkbox, Modal } from 'antd'
import './ModalBecomeMentor.scss'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext';

export default function ModalBecomeMentor({ modalOpen, setModalOpen }) {
     const [isValidate, setIsValidate] = useState(false);
     const { currentUser } = useContext(AuthContext);

     const onChangeCheckbox = (e) => {
          if (e.target.checked) {
               setIsValidate(true);
          } else {
               setIsValidate(false);
          }
     }

     const handleSend = () => {
          console.log(currentUser.id);
     }

     return (
          <Modal
               title="Become a Mentor"
               centered
               open={modalOpen}
               onOk={handleSend}
               onCancel={() => setModalOpen(false)}
               okText='Send'
               okButtonProps={{disabled: !isValidate}}
          >
               <Checkbox onChange={onChangeCheckbox}>Agree to our terms</Checkbox>
          </Modal>
     )
}

ModalBecomeMentor.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func
}
