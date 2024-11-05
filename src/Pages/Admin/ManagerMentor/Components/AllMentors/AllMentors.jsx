import {Icon} from "@iconify/react/dist/iconify.js"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {Button, Dropdown, Table, Tag} from "antd"
import {useEffect, useState} from "react"
import {disableMentor, getListMentor} from "../../../../../apis/admin"
import {loadAllSkills} from "../../../../../apis/mentor"
import {Loading} from "../../../../../Components"

function AllMentor() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const queryClient = useQueryClient()
    const {data: listSkills} = useQuery({queryKey: ['list-skills'], queryFn: loadAllSkills})
    const {data: dataMentors, isLoading} = useQuery({queryKey: ['list-mentors-admin'], queryFn: getListMentor})
    const [dataSource, setDataSource] = useState([])
    const mutation = useMutation({mutationFn: (mentorId) => disableMentor(mentorId)})
    console.log(dataMentors)
    useEffect(() => {
        if (dataMentors) {
            setDataSource(
                dataMentors?.mentorList?.map((mentor) => ({
                    key: mentor.accountId,
                    id: mentor.accountId,
                    name: mentor.fullName,
                    email: mentor.email,
                    point: mentor.point || 'null',
                    rating: mentor.averageRating || '#',
                    skills: mentor.skills?.map(skill => skill.name)
                }))
            )
        }
    }, [dataMentors])

    const handleDisableMentor = async (mentor) => {
        const data = await mutation.mutateAsync(mentor.id)
        if (data?.error_code === 0) {
            queryClient.invalidateQueries({queryKey: ['list-mentors-admin']})
        }
    }

    const getDropDownItems = (text, record) => ([
        {
            label: 'Delete',
            key: '3',
            danger: true,
            icon: <Icon icon="weui:delete-outlined"/>,
            onClick: () => handleDisableMentor(record)
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
                    {skills.map((skill, index) => {
                        return <Tag color='cyan' key={index}>{skill}</Tag>;
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
                    menu={{items: getDropDownItems(text, record)}}
                    trigger={['click']}
                >
                    <Button type="text"><Icon icon="lsicon:more-outline"/></Button>
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

    if (isLoading) return (<Loading/>)

    return (
        <div className="all-mentors">
            <Table
                scroll={{y: '76vh'}}
                pagination={{position: ['bottomCenter']}}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    )
}

export default AllMentor