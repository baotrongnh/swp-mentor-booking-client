import { useMutation } from "@tanstack/react-query"
import { Modal, Select } from "antd"
import PropTypes from "prop-types"
import { useContext, useState } from "react"
import { addStudentToGroup } from "../../../apis/student"
import { AuthContext } from "../../../Contexts/AuthContext"

export default function ModalAddGroup({ modalOpen, setModalOpen, bookingId }) {

     const [memberMails, setMemberMails] = useState([])
     const { currentUser } = useContext(AuthContext)

     const mutation = useMutation({
          mutationFn: ({ bookingId, studentId, memberMails }) => addStudentToGroup(bookingId, studentId, memberMails),
          onSuccess: (value) => {
               console.log(value)
          },
          onError: (error) => {
               console.log(error)
          }
     })

     const handleChange = (value) => {
          setMemberMails(value)
     }

     const handleAdd = () => {
          mutation.mutate({ bookingId: bookingId, studentId: currentUser?.accountId, memberMails })
     }

     return (
          <div>
               <Modal
                    title="Add your member group"
                    centered
                    open={modalOpen}
                    okText='Add'
                    onOk={handleAdd}
                    onCancel={() => setModalOpen(false)}
                    confirmLoading={mutation.isPending}
               >
                    <h1>Select</h1>
                    <Select
                         mode="tags"
                         style={{
                              width: '100%',
                         }}
                         placeholder="Write email here"
                         onChange={handleChange}
                         notFoundContent={null}
                         maxCount={5}
                         allowClear
                    />
               </Modal>
          </div>
     )
}

ModalAddGroup.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
     bookingId: PropTypes.string,
}
