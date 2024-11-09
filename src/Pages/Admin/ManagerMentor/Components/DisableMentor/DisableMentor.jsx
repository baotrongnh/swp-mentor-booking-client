import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { activeMentor, getListDisableMentor } from "../../../../../apis/admin"
import { loadAllSkills } from "../../../../../apis/mentor"
import { Loading } from "../../../../../Components"
import Search from "antd/es/transfer/search"
import toast from "react-hot-toast"

function DisableMentor() {
     const queryClient = useQueryClient()
     const [dataSearch, setDataSearch] = useState('')
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const { data: listSkills } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
     const { data: dataMentors, isLoading } = useQuery({ queryKey: ['list-mentors-disable-admin'], queryFn: getListDisableMentor })
     const [dataSource, setDataSource] = useState([])
     const mutation = useMutation({
          mutationFn: (mentorId) => activeMentor(mentorId),
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['list-mentors-disable-admin'] })
               toast.success('Restore success!')
          }
     })

     useEffect(() => {
          if (dataMentors) {
               setDataSource(
                    dataMentors.mentors
                         ?.filter(mentor => mentor.fullName.toLowerCase().includes(dataSearch.toLowerCase()))
                         .map((mentor) => ({
                              key: mentor.accountId,
                              id: mentor.accountId,
                              name: mentor.fullName,
                              email: mentor.email,
                              point: mentor.point || 'null',
                              rating: mentor.averageRating || '#',
                              skills: ['ReactJS'],
                         }))
               );
          }
     }, [dataMentors])

     const handleActiveMentor = (mentor) => {
          mutation.mutateAsync(mentor.id)
     }

     const getDropDownItems = (text, record) => ([
          {
               label: 'Restore',
               key: '3',
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => handleActiveMentor(record)
          },
     ])

     const columns = [
          {
               title: 'Name',
               dataIndex: 'name',
          },
          {
               title: 'Email',
               dataIndex: 'email',
          },
          {
               title: 'Point',
               dataIndex: 'point',
               align: 'center',
               sorter: (a, b) => a.point - b.point,
          },
          {
               title: 'Rating',
               dataIndex: 'rating',
               align: 'center',
               sorter: (a, b) => a.point - b.point,
          },
          {
               title: 'Skills',
               key: 'tags',
               dataIndex: 'skills',
               align: 'center',
               render: (skills) => (
                    <>
                         {skills.map((skill) => {
                              return <Tag color='cyan' key={skill}>{skill}</Tag>;
                         })}
                    </>
               ),
               filters: listSkills?.skills?.map(skill => (
                    {
                         text: skill.name,
                         value: skill.name,
                    }
               )),
               onFilter: (value, record) => record.skills.some((skill) => skill.indexOf(value) === 0),
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
                         <Button type="text" loading={mutation.isPending}><Icon icon="lsicon:more-outline" /></Button>
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

     const onSearch = (e) => {
          setDataSearch(e.target.value)
     }

     if (isLoading) return (<Loading />)

     return (
          <div className="all-mentors">
               <div style={{ margin: '10px 0', padding: '0 20px' }}>
                    <Search
                         placeholder="Find mentors..."
                         allowClear
                         onSearch={onSearch}
                         className='search-input'
                         onChange={onSearch}
                    />
               </div>

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

export default DisableMentor