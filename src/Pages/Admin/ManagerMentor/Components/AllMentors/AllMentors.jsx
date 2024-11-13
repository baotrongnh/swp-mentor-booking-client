import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Image, InputNumber, Table, Tag } from "antd"
import Search from "antd/es/transfer/search"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { disableMentor, editPoint, getListMentor } from "../../../../../apis/admin"
import { loadAllSkills } from "../../../../../apis/mentor"
import { Loading } from "../../../../../Components"

function AllMentor() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dataSearch, setDataSearch] = useState('')
    const queryClient = useQueryClient()
    const { data: listSkills } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
    const { data: dataMentors, isLoading } = useQuery({ queryKey: ['list-mentors-admin'], queryFn: getListMentor })
    console.log(dataMentors);
    const [dataSource, setDataSource] = useState([])
    const mutation = useMutation({
        mutationFn: (mentorId) => disableMentor(mentorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-mentors-admin'] })
            toast.success('Delete success!')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const mutationEdit = useMutation({
        mutationFn: ({accountType, id, point}) => editPoint(accountType, id, point),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-mentors-admin'] })
            toast.success('Update point success!')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record) => record.key === editingKey

    const handlePointChange = (value, record) => {
        console.log(typeof value);
        if (value === null || value === '') {
            toast.error('Point cannot be empty!')
            return
        }

        if (value < 0) {
            toast.error('Point cannot be negative!')
            return
        }

        if (value === record.point) {
            setEditingKey('')
            toast.error('Nothing change')
            return
        }

        if (!Number.isInteger(value)) {
            toast.error('Point must be an integer!')
            return
        }

        setEditingKey('')
        mutationEdit.mutateAsync({accountType: 'mentor', id: record.id, point: value})
    }

    useEffect(() => {
        if (dataMentors) {
            setDataSource(
                dataMentors?.mentorList
                    ?.filter(mentor => mentor.fullName.toLowerCase().includes(dataSearch.toLowerCase()))
                    .map((mentor) => ({
                        key: mentor.accountId,
                        id: mentor.accountId,
                        name: mentor.fullName,
                        email: mentor.email,
                        point: mentor.point,
                        rating: mentor.averageRating || 'No data',
                        skills: mentor.skills?.map(skill => `${skill.name} (${skill.mentor_skill.level})`),
                        image: mentor.imgPath
                    }))
            )
        }
    }, [dataMentors, dataSearch])

    const handleDisableMentor = async (mentor) => {
        mutation.mutateAsync(mentor.id)
    }

    const getDropDownItems = (text, record) => ([
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
            title: 'Image',
            dataIndex: 'image',
            render: (image) => (
                <Image src={image} />
            )
        },
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
            editable: true,
            sorter: (a, b) => a.point - b.point,
            render: (point, record) => {
                const editable = isEditing(record)

                return editable ? (
                    <InputNumber
                        defaultValue={point}
                        onPressEnter={(e) => handlePointChange(Number.parseInt(e.target.value), record)}
                        onBlur={(e) => handlePointChange(Number.parseInt(e.target.value), record)}
                        min={0}
                        autoFocus
                    />
                ) : (
                    <div
                        style={{ cursor: 'text', padding: '5px' }}
                        onClick={() => setEditingKey(record.key)}
                    >
                        {point}
                    </div>
                )
            }
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

    const onSearch = (e) => {
        setDataSearch(e.target.value)
    }

    if (isLoading || mutationEdit.isPending) return (<Loading />)

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
                bordered
            />
        </div>
    )
}

export default AllMentor