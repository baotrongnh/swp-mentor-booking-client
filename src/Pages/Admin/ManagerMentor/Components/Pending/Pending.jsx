import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { getlistMentorPending, promoteMentor, rejectApplyMentor } from "../../../../../apis/admin"
import { loadAllSkills } from "../../../../../apis/mentor"
import { Loading } from "../../../../../Components"
import toast from "react-hot-toast"

function Pending() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const queryClient = useQueryClient()
    const { data: listSkills } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
    const { data: dataMentors, isLoading } = useQuery({ queryKey: ['list-pending-admin'], queryFn: getlistMentorPending })
    const [dataSource, setDataSource] = useState([])
    const mutationAccept = useMutation({
        mutationFn: (mentorId) => promoteMentor(mentorId)
    })

    const mutationReject = useMutation({
        mutationFn: (mentorId) => rejectApplyMentor(mentorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-pending-admin'] })
            toast.success('Reject success')
        },
        onError: () => {
            toast.error('Error')
        }
    })

    useEffect(() => {
        if (dataMentors) {
            setDataSource(
                dataMentors?.applyingMentors?.map((mentor) => ({
                    key: mentor.accountId,
                    id: mentor.accountId,
                    name: mentor.fullName,
                    email: mentor.email,
                    point: mentor.point || '0',
                    rating: mentor.averageRating || 'No data',
                    skills: mentor.skills.map(skill => skill.name),
                }))
            )
        }
    }, [dataMentors])

    const handleReject = async (mentor) => {
        mutationReject.mutateAsync(mentor.id)
    }

    const handleAccept = async (mentor) => {
        const data = await mutationAccept.mutateAsync(mentor.id)
        console.log(data)
        if (data.error_code === 0) {
            queryClient.invalidateQueries({ queryKey: ['list-pending-admin'] })
            toast.success('Successfully accepted')
        } else {
            toast.error('Something went wrong, please try again!')
        }
    }

    const getDropDownItems = (text, record) => ([
        {
            label: 'Accept',
            key: '0',
            icon: <Icon icon="mdi:tick" />,
            onClick: () => handleAccept(record)
        },
        {
            label: 'Reject',
            key: '3',
            danger: true,
            icon: <Icon icon="dashicons:no" />,
            onClick: () => handleReject(record)
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
        onSelect: (record, seleted) => console.log(record, seleted)
    }

    if (isLoading) return (<Loading />)

    return (
        <div className="all-mentors">
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

export default Pending