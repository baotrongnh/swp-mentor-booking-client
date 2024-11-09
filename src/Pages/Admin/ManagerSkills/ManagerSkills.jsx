import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Flex, Input, Modal, Table } from "antd"
import { useEffect, useState } from "react"
import { loadAllSkills } from "../../../apis/mentor"
import { Loading } from "../../../Components"
import { createSkillMentor } from "../../../apis/admin"
import toast from "react-hot-toast"

function ManagerSkills() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const [modalOpen, setModalOpen] = useState(false)
     const [newSkillName, setNewSkillName] = useState('')
     const queryClient = useQueryClient()

     const { data: listSkills, isLoading } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
     const [dataSource, setDataSource] = useState([])

     const mutationAdd = useMutation({
          mutationFn: (name) => createSkillMentor(name),
          onSuccess: () => {
               setModalOpen(false)
               queryClient.invalidateQueries({ queryKey: ['list-skills'] })
               toast.success('Add skill success!')
          },
          onError: (error) => {
               console.log(error)
          }
     })

     useEffect(() => {
          if (listSkills) {
               setDataSource(
                    listSkills?.skills.map((skill) => ({
                         key: skill.id,
                         id: skill.id,
                         name: skill.name,
                         image: skill.imgPath,
                         mentorCount: skill.mentorCount
                    }))
               )
          }
     }, [listSkills])

     const [editingKey, setEditingKey] = useState('')

     const isEditing = (record) => record.key === editingKey

     const handleNameChange = (value, record) => {
          if (value === null || value === '') {
               toast.error('Name cannot be empty!')
               return
          }

          if (value === record.name) {
               setEditingKey('')
               return
          }

          console.log('Skill ID:', record.id)
          console.log('New Value:', value)
          setEditingKey('')
     }

     const handleDeleteSkill = async (skill) => {
          console.log(skill)
     }

     const getDropDownItems = (text, record) => ([
          {
               label: 'Delete',
               key: '3',
               danger: true,
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => handleDeleteSkill(record)
          },
     ])

     const columns = [
          {
               title: 'ID',
               dataIndex: 'id',
          },
          {
               title: 'Name',
               dataIndex: 'name',
               sorter: (a, b) => a.name.length - b.name.length,
               render: (name, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                         <Input
                              defaultValue={name}
                              onPressEnter={(e) => handleNameChange(e.target.value, record)}
                              onBlur={(e) => handleNameChange(e.target.value, record)}
                              min={0}
                              autoFocus
                         />
                    ) : (
                         <div
                              style={{ cursor: 'text', padding: '5px' }}
                              onClick={() => setEditingKey(record.key)}
                         >
                              {name}
                         </div>
                    );
               }
          },
          {
               title: 'Number mentors',
               dataIndex: 'mentorCount',
               align: 'center',
               sorter: (a, b) => a.mentorCount - b.mentorCount,
          },
          {
               title: '',
               key: 'action',
               align: 'center',
               render: (text, record) => (
                    <Dropdown
                         menu={{ items: getDropDownItems(text, record) }}
                         trigger={['click']}
                    >
                         <Button type="text"><Icon icon="lsicon:more-outline" /></Button>
                    </Dropdown>
               )
          }
     ]

     const onSelectChange = (newSelectedRowKeys) => {
          setSelectedRowKeys(newSelectedRowKeys);
     }

     const rowSelection = {
          selectedRowKeys,
          onChange: onSelectChange,
          align: 'center',
          onSelect: (record, seleted) => console.log(seleted)
     }

     const handleAddSkill = () => {
          if (newSkillName.trim()) {
               mutationAdd.mutate(newSkillName.trim())
               setNewSkillName('')
          } else {
               toast.error('Skill name cannot be empty!')
          }
     }

     if (isLoading) return (<Loading />)

     return (
          <div className="all-mentors">
               <Flex justify="end">
                    <Button onClick={() => setModalOpen(true)} type="primary" style={{ margin: '10px 20px' }}>
                         + Add skill
                    </Button>
               </Flex>
               
               <Modal
                    title="Add New Skill"
                    open={modalOpen}
                    onOk={handleAddSkill}
                    onCancel={() => {
                         setModalOpen(false)
                         setNewSkillName('')
                    }}
                    okText="Add"
                    confirmLoading={mutationAdd.isPending}
                    centered
               >
                    <Input
                         placeholder="Enter skill name"
                         value={newSkillName}
                         onChange={(e) => setNewSkillName(e.target.value)}
                         style={{ marginTop: 16 }}
                    />
               </Modal>

               <Table
                    scroll={{ y: '76vh' }}
                    pagination={{ position: ['bottomCenter'] }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
               />
          </div>
     )
}

export default ManagerSkills