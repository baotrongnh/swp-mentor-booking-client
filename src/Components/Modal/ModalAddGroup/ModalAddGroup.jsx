
import { useMutation } from "@tanstack/react-query"
import { Modal, Select } from "antd"
import PropTypes from "prop-types"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { addStudentToGroup } from "../../../apis/student"
import { AuthContext } from "../../../Contexts/AuthContext"

export default function ModalAddGroup({ modalOpen, setModalOpen, bookingId }) {

     const [memberMails, setMemberMails] = useState([])
     const { currentUser } = useContext(AuthContext)

     const mutation = useMutation({
          mutationFn: ({ bookingId, studentId, memberMails }) => addStudentToGroup(bookingId, studentId, memberMails),
          onSuccess: (data) => {
               console.log(data);
               toast.success('Add success!')
               setModalOpen(false)
          },
          onError: (error) => {
               toast.error(error.response.data.message)
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
                    title="Add member group"
                    centered
                    open={modalOpen}
                    okText='Add'
                    onOk={handleAdd}
                    onCancel={() => setModalOpen(false)}
                    confirmLoading={mutation.isPending}
                    okButtonProps={{ disabled: memberMails.length === 0 }}
                    destroyOnClose
               >
                    <h1 style={{fontWeight: '400', padding: '5px 0'}}>Import group member email list</h1>
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
     bookingId: PropTypes.any,
}
