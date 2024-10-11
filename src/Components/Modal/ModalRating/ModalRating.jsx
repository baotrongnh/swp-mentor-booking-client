import { Flex, Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import { useState } from "react";

function ModalRatingMentor({ id, modalOpen, setModalOpen }) {
     const [confirmLoading, setConfirmLoading] = useState(false);
     const [feedback, setFeedback] = useState({ id, rating: '', comment: '' });

     const handleOk = () => {
          setConfirmLoading(true);
          console.log(feedback);
          setTimeout(() => {
               setModalOpen(false);
               setConfirmLoading(false);
          }, 2000);
     };

     const onChangeFeedback = (e) => {
          setFeedback({ ...feedback, comment: e.target.value });
     }

     const onChangeRating = (value) => {
          setFeedback({ ...feedback, rating: value })
     }

     return (
          <div className="modal-rating">
               <Modal
                    title="Rating for mentor"
                    centered
                    okText='Send'
                    open={modalOpen}
                    onOk={handleOk}
                    onCancel={() => setModalOpen(false)}
                    confirmLoading={confirmLoading}
               >
                    <Flex vertical align="center" className="rating-block">
                         <Rate style={{ padding: '20px', fontSize: '3rem' }} allowClear onChange={onChangeRating} />

                         <TextArea
                              showCount
                              maxLength={100}
                              onChange={onChangeFeedback}
                              placeholder="Feedback for mentor...."
                              style={{
                                   height: 120,
                                   resize: 'none',
                                   marginBottom: '30px'
                              }}
                         />
                    </Flex>
               </Modal>
          </div>
     );
}

export default ModalRatingMentor;

ModalRatingMentor.propTypes = {
     id: PropTypes.any,
     modalOpen: PropTypes.any,
     setModalOpen: PropTypes.any
}