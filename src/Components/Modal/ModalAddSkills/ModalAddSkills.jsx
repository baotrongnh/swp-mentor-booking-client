import { useMutation, useQuery } from "@tanstack/react-query"
import { Modal, Select } from "antd"
import PropTypes from "prop-types"
import { useContext, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { loadAllSkills } from "../../../apis/mentor"
import { addStudentToGroup } from "../../../apis/student"

export default function ModalAddSkills({ modalOpen, setModalOpen }) {
     const [listSkillSelect, setListSkillSelect] = useState([])
     const { currentUser } = useContext(AuthContext)
     const { data: listSkills } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })

     console.log(listSkillSelect)

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
          setListSkillSelect(value)
     }

     const handleAdd = () => {
          mutation.mutate({ studentId: currentUser?.accountId })
     }

     const options = listSkills?.skills?.map((skill) => ({
          label: skill.name,
          value: skill.id
     }))

     return (
          <div>
               <Modal
                    title="Add your member group"
                    centered
                    open={modalOpen}
                    okText='Add'
                    onOk={handleAdd}
                    onCancel={() => setModalOpen(false)}
               >
                    <h1>Select</h1>
                    <Select
                         mode="tags"
                         style={{
                              width: '100%',
                         }}
                         placeholder="Add your skills"
                         onChange={handleChange}
                         notFoundContent={null}
                         maxCount={5}
                         allowClear
                         options={options}
                    />
               </Modal>
          </div>
     )
}

ModalAddSkills.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
}
