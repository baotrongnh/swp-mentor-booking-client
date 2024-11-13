import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown, Image, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { editPoint, getListStudent } from "../../../../../apis/admin";
import { Loading } from "../../../../../Components";


function AllStudents() {
    const queryClient = useQueryClient()
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const { data: dataStudents, isLoading } = useQuery({ queryKey: ['list-student-admin'], queryFn: getListStudent })
    const [dataSource, setDataSource] = useState([])

    const mutationEdit = useMutation({
        mutationFn: ({ accountType, id, point }) => editPoint(accountType, id, point),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-student-admin'] })
            toast.success('Update point success!')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    useEffect(() => {
        if (dataStudents) {
            setDataSource(
                dataStudents?.studentList.map((student, index) => ({
                    key: index,
                    id: student.accountId,
                    name: student.fullName,
                    email: student.email,
                    point: student.point,
                    image: student.imgPath
                }))
            )
        }
    }, [dataStudents])

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
        mutationEdit.mutateAsync({ accountType: 'student', id: record.id, point: value })
    }


    const getDropDownItems = () => ([
        {
            label: 'Delete',
            key: '3',
            danger: true,
            icon: <Icon icon="weui:delete-outlined" />,
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
            title: 'Action',
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

export default AllStudents;