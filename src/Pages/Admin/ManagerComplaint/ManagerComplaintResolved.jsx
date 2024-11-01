import { useQuery } from "@tanstack/react-query"
import { Button, Table } from "antd"
import { useEffect, useState } from "react"
import axiosClient from "../../../apis/axiosClient"
import { Loading } from "../../../Components"
import { getTokenAdmin } from "../../../utils/storageUtils"

function ManagerComplaintResolved() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dataSource, setDataSource] = useState([])

    const getListComplaintAccept = async () => {
        const token = getTokenAdmin()
        return axiosClient(token).get('/complaint/pending-by-status/1')
    }

    const getListComplaintDeny = async () => {
        const token = getTokenAdmin()
        return axiosClient(token).get('/complaint/pending-by-status/2')
    }

    const { data: listComplaintAccept, isAcceptLoading } = useQuery({ queryKey: ['list-complaint-accept'], queryFn: getListComplaintAccept })
    const { data: listComplaintDeny, isDenyLoading } = useQuery({ queryKey: ['list-complaint-deny'], queryFn: getListComplaintDeny })

    useEffect(() => {
        const dataArray = [];
        console.log('Accept', listComplaintAccept?.complaints)
        console.log('Deny', listComplaintDeny?.complaints)

        if (listComplaintAccept?.complaints) {
            dataArray.push(...listComplaintAccept.complaints);
        }
        if (listComplaintDeny?.complaints) {
            dataArray.push(...listComplaintDeny.complaints);
        }
        console.log('Data', dataArray)
        dataArray.sort((a, b) => b.id - a.id);
        setDataSource(
            dataArray.map((item) => ({
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
                status: getStatus(item.status)
            }))
        );
    }, [listComplaintAccept, listComplaintDeny]);

    const getStatus = (status) => {
        if (status === 1) {
            return 'Accept'
        } else if (status === 2) {
            return 'Denied'
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '80px',
            minWidth: '60px',
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
            title: 'Status',
            dataIndex: 'status',

        },
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

    if (isAcceptLoading || isDenyLoading) return (<Loading />)

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

export default ManagerComplaintResolved