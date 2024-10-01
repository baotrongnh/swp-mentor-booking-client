import { Modal } from "antd";
import PropTypes from "prop-types";

function ModalCenter({ modalOpen, setModalOpen, ComponentRender, title, okText }) {
     return (
          <Modal
               title={title}
               centered
               open={modalOpen}
               onOk={() => setModalOpen(false)}
               onCancel={() => setModalOpen(false)}
               okText={okText}
          >
               <ComponentRender />
          </Modal>
     );
}

export default ModalCenter;

ModalCenter.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
     ComponentRender: PropTypes.any,
     title: PropTypes.string,
     okText: PropTypes.string
}

