import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Table } from "antd"
import { useEffect, useState } from "react"
import { disableMentor } from "../../../apis/admin"
import { loadAllSkills } from "../../../apis/mentor"
import { Loading } from "../../../Components"

function ManagerSkills() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const queryClient = useQueryClient()
     const { data: listSkills, isLoading } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
     const [dataSource, setDataSource] = useState([])
     const mutation = useMutation({ mutationFn: (mentorId) => disableMentor(mentorId) })

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

     const handleDisableMentor = async (mentor) => {
          const data = await mutation.mutateAsync(mentor.id)
          if (data.error_code === 0) {
               queryClient.invalidateQueries({ queryKey: ['list-mentors-admin'] })
          }
     }

     const getDropDownItems = (text, record) => ([
          {
               label: 'Edit',
               key: '0',
               icon: <Icon icon="iconamoon:edit-bold" />,
               onClick: () => handleDisableMentor(record)
          },
          {
               label: 'Delete',
               key: '3',
               danger: true,
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => handleDisableMentor(record)
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
          },
          {
               title: 'Image',
               dataIndex: 'image',
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

     if (isLoading) return (<Loading />)

     return (
          <div className="all-mentors">
               <Button>+ Add skill</Button>
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