import { Icon } from "@iconify/react/dist/iconify.js"
import { useQuery } from "@tanstack/react-query"
import { Button, Dropdown, Table } from "antd"
import { useEffect, useState } from "react"
import axiosClient from "../../../apis/axiosClient"
import { Loading } from "../../../Components"
import { getTokenAdmin } from "../../../utils/storageUtils"
import toast from "react-hot-toast"

function ManagerComplaintPending() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dataSource, setDataSource] = useState([])
    const token = getTokenAdmin()

    const getListComplaintPending = async () => {
        return axiosClient(token).get('/complaint/pending-by-status/0')
    }

    const { data: listComplaintPending, isLoading, refetch } = useQuery({ queryKey: ['list-complaint-pending'], queryFn: getListComplaintPending })

    console.log(listComplaintPending?.complaints)


    useEffect(() => {
        if (listComplaintPending) {
            setDataSource(
                listComplaintPending?.complaints.map((item) => ({
                    key: item.id,
                    id: item.id,
                    student: (
                        <>
                            Name: {item.student.fullName} <br />
                            Email: {item.student.email}
                        </>
                    ),
                    mentorName: (
                        <>
                            Name: {item.mentor.fullName} <br />
                            Email: {item.mentor.email}
                        </>
                    ),
                    content: item.content,
                }))
            )
        }
    }, [listComplaintPending])


    const handleAccept = async (record) => {
        console.log(record)
        try {
            const res = await axiosClient(token).post('/admin/update-complaint-status', {
                complaintId: record.id,
                status: 1
            })

            if (res) {
                toast.success('Accept success')
                console.log(res)
                refetch()
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    const handleDeny = async (record) => {
        console.log(record)
        try {
            const res = await axiosClient(token).post('/admin/update-complaint-status', {
                complaintId: record.id,
                status: 2
            })

            if (res) {
                toast.success('Deny success')
                console.log(res)
                refetch()
            }
        } catch (error) {
            console.log('Error', error)
        }
    }


    const getDropDownItems = (text, record) => ([
        {
            label: 'Accept',
            key: '0',
            icon: <Icon icon="heroicons:check-circle" />,
            onClick: () => handleAccept(record),
        },
        {
            label: 'Deny',
            key: '3',
            danger: true,
            icon: <Icon icon="codicon:error" />,
            onClick: () => handleDeny(record),
        },
    ])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '80px',
            minWidth: '60px'
        },
        {
            title: 'Student',
            dataIndex: 'student',

        },
        {
            title: 'Mentor',
            dataIndex: 'mentorName',

        },
        {
            title: 'Content',
            dataIndex: 'content',

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
                    <Button type="text" ><Icon icon="lsicon:more-outline" /></Button>
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
        <div className="all-complaint-pending">
            <Button>+ Add Item</Button>
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

export default ManagerComplaintPending